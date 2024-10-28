import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";
import { FlightCardFields } from "../../types/types";
import ConfirmationModal from "@/components/ConfirmationModal";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface FlightCardProps {
  id: string;
  index: number;
  onRemove: () => void;
}

type FlightCardFieldPath = `items.${number}.${keyof FlightCardFields}`;

const FlightCard_Update: React.FC<FlightCardProps> = ({
  id,
  index,
  onRemove,
}) => {
  const { register, control, watch, setValue } = useFormContext<{
    items: FlightCardFields[];
  }>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getFieldPath = (
    index: number,
    field: keyof FlightCardFields
  ): FlightCardFieldPath => `items.${index}.${field}`;

  const renderInput = (label: string, field: keyof FlightCardFields) => (
    <div className="flex flex-1 flex-col">
      <label>{label}:</label>
      <input
        {...register(getFieldPath(index, field))}
        className="border sm:p-1"
      />
    </div>
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = () => {
    onRemove();
    setShowModal(false);
  };

  const FlightDescription = watch(getFieldPath(index, "flightDescription"));

  const numberOfAdults = Number(
    watch(getFieldPath(index, "numberOfAdults")) || 0
  );
  const priceForAdult = Number(
    watch(getFieldPath(index, "priceForAdult")) || 0
  );
  const numberOfChildren = Number(
    watch(getFieldPath(index, "numberOfChildren")) || 0
  );
  const priceForChild = Number(
    watch(getFieldPath(index, "priceForChild")) || 0
  );
  const numberOfBabies = Number(
    watch(getFieldPath(index, "numberOfBabies")) || 0
  );
  const priceForBaby = Number(watch(getFieldPath(index, "priceForBaby")) || 0);

  const totalPrice =
    numberOfAdults * priceForAdult +
    numberOfChildren * priceForChild +
    numberOfBabies * priceForBaby;
  
  useEffect(() => {
    setValue(getFieldPath(index, "sum"), totalPrice);
  }, [totalPrice]);
  

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
            e.target.tagName === "SPAN")
        ) {
          e.stopPropagation();
        }
      }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${id}`}>
          <AccordionTrigger className="flex relative justify-between bg-gradient-to-r from-yellow-500 to-green-500 rounded-md p-2 sm:p-4 hover:no-underline border-2 hover:border-green-500">
            <h3 className="p-8 sm:p-1 mr-4">
              {FlightDescription === "" ? (
                <p> Flight Information</p>
              ) : (
                (FlightDescription as string)
              )}
            </h3>
            <button
              type="button"
              className="bg-red-400 hover:bg-red-500 p-1 rounded-md absolute sm:top-4 sm:left-12 top-2 left-8 sm:text-md text-xs"
              onClick={handleDelete}
            >
              remove
            </button>
          </AccordionTrigger>
          <AccordionContent className="bg-gray-100 rounded-md border p-2 sm:p-4 text-md">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/2 sm:p-2">
                  <div className="flex flex-col">
                    {renderInput("תיאור הטיסה", "flightDescription")}

                    <label className="mb-2">תאריך טיסה המראה:</label>
                    <Controller
                      name={getFieldPath(index, "departureDate")}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select date"
                          className="border p-1"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">תאריך טיסה נחיתה:</label>
                    <Controller
                      name={getFieldPath(index, "arrivalDate")}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select date"
                          className="border p-1"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="">שעת המראה</label>
                    <input
                      type="time"
                      {...register(getFieldPath(index, "flightTime"))}
                      className="border sm:p-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="">שעת נחיתה</label>
                    <input
                      type="time"
                      {...register(getFieldPath(index, "landingTime"))}
                      className="border sm:p-1"
                    />
                  </div>

                  {renderInput("מספר טיסה ", "flightNumber")}
                  {renderInput("חברת תעופה ", "airline")}
                  {renderInput("שדה תעופה יציאה", "departureAirport")}
                  {renderInput("שדה תעופה הגעה", "arrivalAirport")}
                </div>

                <div className="sm:w-1/2 sm:p-2">
                  <div className="flex flex-col">
                    <label className="">מספר עצירות</label>
                    <input
                      type="number"
                      {...register(getFieldPath(index, "stopsNumber"))}
                      className="border sm:p-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="flex flex-col w-3/5">
                      <label className="">שדה תעופה עצירה1:</label>
                      <input
                        {...register(getFieldPath(index, "stopoverAirport1"))}
                        className="border sm:p-1"
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="">זמן העצירה</label>
                      <input
                        type="time"
                        {...register(getFieldPath(index, "stopover1Time"))}
                        className="border sm:p-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-2">
                    <div className="flex flex-col w-3/5">
                      <label className="">שדה תעופה עצירה2:</label>
                      <input
                        {...register(getFieldPath(index, "stopoverAirport2"))}
                        className="border sm:p-1"
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="">זמן העצירה</label>
                      <input
                        type="time"
                        {...register(getFieldPath(index, "stopover2Time"))}
                        className="border sm:p-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-2">
                    <div className="flex flex-col w-3/5">
                      <label className="">שדה תעופה עצירה3:</label>
                      <input
                        {...register(getFieldPath(index, "stopoverAirport3"))}
                        className="border sm:p-1"
                      />
                    </div>
                    <div className="flex flex-col w-2/5">
                      <label className="">זמן העצירה</label>
                      <input
                        type="time"
                        {...register(getFieldPath(index, "stopover3Time"))}
                        className="border sm:p-1"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col flex-1">
                      <label className="">מספר מבוגרים</label>
                      <input
                        type="number"
                        {...register(getFieldPath(index, "numberOfAdults"))}
                        className="border sm:p-1"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="">מספר ילדים</label>
                      <input
                        type="number"
                        {...register(getFieldPath(index, "numberOfChildren"))}
                        className="border sm:p-1"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="">מספר תינוקות</label>
                      <input
                        type="number"
                        {...register(getFieldPath(index, "numberOfBabies"))}
                        className="border sm:p-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col flex-1">
                      <label className="">מחיר למבוגר</label>
                      <input
                        type="number"
                        {...register(getFieldPath(index, "priceForAdult"))}
                        className="border sm:p-1"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="">מחיר לילד</label>
                      <input
                        type="number"
                        {...register(getFieldPath(index, "priceForChild"))}
                        className="border sm:p-1"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="">מחיר לתינוק</label>
                      <input
                        type="number"
                        {...register(getFieldPath(index, "priceForBaby"))}
                        className="border sm:p-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <label className="">מטבע:</label>
                    <input
                      {...register(getFieldPath(index, "currency"))}
                      className="border sm:p-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-2">הערות הסוכן:</label>
                <textarea
                  {...register(getFieldPath(index, "agentComments"))}
                  className="border p-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white py-1 px-2 mr-4 rounded hover:bg-red-700 mt-8"
                  onClick={handleDelete}
                >
                  Remove Flight
                </button>
              </div>
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

export default FlightCard_Update;
