import RemoveButton from "@/components/RemoveButton";
import SmallCarousel from "@/components/SmallCarousel";
import { Room } from "../../types/types";
import { Controller, useFormContext } from "react-hook-form";

interface HotelRoomCardProps {
  onRemove: () => void;
  rooms: Room[] | undefined;
  onRoomDataChange: (roomData: Room) => void;
  index: number;
  roomIndex: number;
}

const HotelsRoomCard: React.FC<HotelRoomCardProps> = ({
  onRemove,
  rooms,
  onRoomDataChange,
  index,
  roomIndex,
}) => {
  const { control, watch, setValue } = useFormContext();

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const room = rooms?.find((room) => room.id === selectedId) || null;
    if (room) {
      setValue(`items.${index}.rooms.${roomIndex}.selectedRoom`, room);
      onRoomDataChange({
        ...room,
        nightPrice: watch(`items.${index}.rooms.${roomIndex}.nightPrice`) || 0,
        numberOfRooms:
          watch(`items.${index}.rooms.${roomIndex}.numberOfRooms`) || 1,
      });
    }
  };

  const handleNightPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nightPrice = Number(event.target.value);
    setValue(`items.${index}.rooms.${roomIndex}.nightPrice`, nightPrice);
    onRoomDataChange({
      ...watch(`items.${index}.rooms.${roomIndex}.selectedRoom`),
      nightPrice,
      numberOfRooms:
        watch(`items.${index}.rooms.${roomIndex}.numberOfRooms`) || 1,
    });
  };

  const handleNumberOfRoomsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numberOfRooms = Number(event.target.value);
    setValue(`items.${index}.rooms.${roomIndex}.numberOfRooms`, numberOfRooms);
    onRoomDataChange({
      ...watch(`items.${index}.rooms.${roomIndex}.selectedRoom`),
      nightPrice: watch(`items.${index}.rooms.${roomIndex}.nightPrice`) || 0,
      numberOfRooms,
    });
  };

    const selectedRoom = watch(
      `items.${index}.rooms.${roomIndex}.selectedRoom`
    );


  return (
    <div className="bg-amber-100 rounded-lg mt-4 p-2">
      <SmallCarousel
        images={watch(`items.${index}.rooms.${roomIndex}.selectedRoom`)?.images}
        slidesToShow={3}
      />
      <div className="mb-2">
        <label htmlFor={`room-select-${roomIndex}`}>בחירת סוג חדר:</label>
        <Controller
          name={`items.${index}.rooms.${roomIndex}.selectedRoom`}
          control={control}
          render={({ field }) => (
            <select
              className="border"
              id={`room-select-${roomIndex}`}
              onChange={handleRoomChange}
              value={field.value?.id || ""}
            >
              <option value="">--Please choose an option--</option>
              {rooms &&
                rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.roomType}
                  </option>
                ))}
            </select>
          )}
        />
      </div>
      {selectedRoom?.roomDescription && (
        <div className="text-gray-700 text-lg mb-4">
          <strong>תיאור החדר:</strong> <br /> {selectedRoom.roomDescription}
        </div>
      )}
      <div className="flex flex-col sm:flex-row">
        <label htmlFor={`night-price-${roomIndex}`}>מחיר ללילה :</label>
        <Controller
          name={`items.${index}.rooms.${roomIndex}.nightPrice`}
          control={control}
          render={({ field }) => (
            <input
              id={`night-price-${roomIndex}`}
              type="number"
              value={field.value || ""}
              onChange={handleNightPriceChange}
              className="border"
            />
          )}
        />

        <label htmlFor={`number-of-rooms-${roomIndex}`}>כמות חדרים:</label>
        <Controller
          name={`items.${index}.rooms.${roomIndex}.numberOfRooms`}
          control={control}
          render={({ field }) => (
            <input
              id={`number-of-rooms-${roomIndex}`}
              type="number"
              value={field.value || 1}
              onChange={handleNumberOfRoomsChange}
              className="border"
            />
          )}
        />
      </div>
      <div className="flex justify-end mt-4">
        <RemoveButton onRemove={onRemove} text="מחק חדר" />
      </div>
    </div>
  );
};

export default HotelsRoomCard;
