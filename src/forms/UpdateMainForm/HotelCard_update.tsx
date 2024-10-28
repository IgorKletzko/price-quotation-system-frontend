import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Hotel, HotelCardFields, Room } from "../../types/types";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/ConfirmationModal";
import RemoveButton from "@/components/RemoveButton";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HotelsRoomCard_Update from "./HotelsRoomCard_update";
import SelectHotelElement_update from "./SelectHotelElement_update";
import StarRating from "@/components/StarRaiting";

interface HotelCardProps {
  id: string;
  index: number;
  onRemove: () => void;
  onDataChange: (
    index: number,
    data: { selectedHotel: Hotel | null; selectedRooms: Room[] }
  ) => void;
  // sortedFormToUpdate: FormFields;
  initialSelectedHotel: Hotel | null;
  initialSelectedRooms: Room[];
}
type HotelCardFieldPath = `items.${number}.${keyof HotelCardFields}`;

function getFieldPath(
  index: number,
  field: keyof HotelCardFields
): HotelCardFieldPath {
  return `items.${index}.${field}`;
}

const HotelCard_Update: React.FC<HotelCardProps> = ({
  id,
  index,
  onRemove,
  onDataChange,
  initialSelectedHotel,
  initialSelectedRooms,
}) => {

  const [rooms, setRooms] = useState<Room[]>(initialSelectedRooms);
  // console.log("rooms", rooms);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(initialSelectedHotel);

  // console.log("selectedHotel------", selectedHotel);

  const [selectedRooms, setSelectedRooms] =
    useState<Room[]>(initialSelectedRooms);
  // console.log("selectedRooms------", selectedRooms);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { register, control, watch, setValue } = useFormContext<{
    items: HotelCardFields[];
  }>();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    const checkInDate = watch(`items.${index}.checkInDate`);
    const checkOutDate = watch(`items.${index}.checkOutDate`);
    const nights = calculateNights(checkInDate, checkOutDate);

    if (selectedRooms.length > 0) {
      const totalSum = selectedRooms.reduce((acc, room) => {
        return (
          acc + (room.nightPrice || 0) * (room.numberOfRooms || 1) * nights
        );
      }, 0);

      setValue(getFieldPath(index, "sum" as keyof HotelCardFields), totalSum);
    } else {
      setValue(getFieldPath(index, "sum" as keyof HotelCardFields), 0);
    }

    onDataChange(index, { selectedHotel, selectedRooms });
  }, [
    selectedHotel,
    selectedRooms,
    watch(`items.${index}.checkInDate`),
    watch(`items.${index}.checkOutDate`),
    index,
  ]);

  const receiveDataFromSelectHotelElement = (hotelData: Hotel) => {
    setSelectedHotel(hotelData);
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString() : "N/A";
  };

  const calculateNights = (checkIn: Date | null, checkOut: Date | null) => {
    if (checkIn && checkOut) {
      const diff = Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
          (1000 * 3600 * 24)
      );
      return diff;
    }
    return 0;
  };

  const handleAddRoom = () => {
    setRooms((rooms) => [...rooms, { roomType: "", roomDescription: "", images: [], id: "" }]);
  };

  const handleRemoveRoom = (roomIndex: number) => {
    setRooms((rooms) => rooms.filter((_, i) => i !== roomIndex));
    setSelectedRooms((selectedRooms) =>
      selectedRooms.filter((_, i) => i !== roomIndex)
    );
  };

  const handleRoomDataChange = (index: number, roomData: Room) => {
    setSelectedRooms((currentRooms) => {
      const newRooms = [...currentRooms];
      newRooms[index] = {
        ...newRooms[index],
        ...roomData,
      };
      return newRooms;
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = () => {
    onRemove();
    setShowModal(false);
  };

  return (
    <div
      dir="rtl"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerDown={(e) => {
        if (
          e.target instanceof HTMLElement &&
          (e.target.tagName === "BUTTON" ||
            e.target.tagName === "INPUT" ||
            e.target.tagName === "SELECT" ||
            e.target.tagName === "TEXTAREA" ||
            e.target.tagName === "DIV" ||
            e.target.tagName === "H2" ||
            e.target.tagName === "IMG")
        ) {
          e.stopPropagation();
        }
      }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${id}`}>
          <AccordionTrigger className="relative flex flex-col md:flex-row justify-between bg-gradient-to-r from-sky-400 to-blue-600 rounded-md p-1 sm:p-4 hover:no-underline border-2 hover:border-sky-500">
            <h3 className="mr-4">{selectedHotel?.hotelName}</h3>
            <div className="flex flex-col lg:flex-row md:gap-2">
              <div className="flex items-center">
                <p className="ml-2">תאריך צ׳ק אין:</p>
                {formatDate(watch(`items.${index}.checkInDate`) || null)}
              </div>
              <div className="flex items-center">
                <p className="ml-2">תאריך צ׳ק אאוט:</p>
                {formatDate(watch(`items.${index}.checkOutDate`) || null)}
              </div>
              <div className="mr-2">
                {`(${calculateNights(
                  watch(`items.${index}.checkInDate`),
                  watch(`items.${index}.checkOutDate`)
                )} לילות)`}
              </div>
            </div>
            <button
              type="button"
              className="bg-red-400 hover:bg-red-500 p-1 rounded-md absolute sm:top-4 sm:left-12 top-10 left-8 sm:text-md text-xs"
              onClick={handleDelete}
            >
              remove
            </button>
          </AccordionTrigger>
          <AccordionContent className="border p-2 sm:p-4">
            <div className="flex justify-center">
              <ImageCarousel images={selectedHotel?.images || []} />
            </div>

            <div className="space-y-2 p-4">
              <SelectHotelElement_update
                data={receiveDataFromSelectHotelElement}
                hotelName={selectedHotel?.hotelName}
                hotelsToUpdate={selectedHotel}
              />

              <div className="flex md:flex-row flex-col justify-between items-center">
                <div className="flex flex-col sm:flex-row">
                  <p>תאריכים:</p>
                  <Controller
                    name={getFieldPath(index, "checkInDate")}
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={
                          field.value ? new Date(field.value as Date) : null
                        }
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="הזן תאריך"
                        className="border text-center"
                      />
                    )}
                  />
                  -
                  <Controller
                    name={getFieldPath(index, "checkOutDate")}
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={
                          field.value ? new Date(field.value as Date) : null
                        }
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="הזן תאריך"
                        className="border text-center"
                      />
                    )}
                  />
                </div>

                <span className="md:ml-8">
                  <StarRating star={selectedHotel?.stars as number} />
                </span>
              </div>

              <h3 className="text-xl">תיאור הבית מלון:</h3>
              <p>{selectedHotel?.hotelDescription}</p>

              <div>
                <p>מחיר:</p>
                <input
                  id={`input-${id}-sum`}
                  {...register(
                    getFieldPath(index, "sum" as keyof HotelCardFields)
                  )}
                  className="border"
                  readOnly
                />
              </div>
            </div>

            <div>
              {rooms.map((_, roomIndex) => (
                <HotelsRoomCard_Update
                  key={roomIndex}
                  index={index}
                  roomIndex={roomIndex}
                  onRemove={() => handleRemoveRoom(roomIndex)}
                  rooms={selectedHotel?.rooms || []}
                  onRoomDataChange={(roomData) =>
                    handleRoomDataChange(roomIndex, roomData)
                  }
                  initialSelectedRooms={initialSelectedRooms}
                />
              ))}
              <Button type="button" onClick={handleAddRoom} className="mt-4">
                Add Room
              </Button>
            </div>

            <div className="flex justify-end">
              <RemoveButton onRemove={handleDelete} text="מחק בית מלון" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ConfirmationModal
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default HotelCard_Update;
