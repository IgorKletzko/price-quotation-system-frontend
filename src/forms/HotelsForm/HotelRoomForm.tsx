import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import RemoveButton from "@/components/RemoveButton";
import { RoomFormData } from "@/types/types";
import UploadImagesInput from "@/components/UploadImagesInput";

interface HotelRoomProps {
  index: number;
  id: string;
  onRemove: () => void;
  onUpdate: (newRoomData: RoomFormData) => void;
}

interface RoomData extends RoomFormData {
  index: number;
}

const HotelRoomForm: React.FC<HotelRoomProps> = ({
  index,
  id,
  onRemove,
  onUpdate,
}) => {
  const { control } = useFormContext();
  const [roomUrls, setRoomUrls] = useState<string[]>([]);
  const [roomData, setRoomData] = useState<RoomData>({
    id,
    index,
    roomType: "",
    roomDescription: "",
    images: [],
  });

  const handleRoomTypeChange = (roomType: string) => {
    setRoomData((prevData) => ({
      ...prevData,
      roomType: roomType,
    }));
  };
  const handleRoomDescriptionChange = (roomDescription: string) => {
    setRoomData((prevData) => ({
      ...prevData,
      roomDescription,
    }));
  };

  useEffect(() => {
    setRoomData((prevData) => ({
      ...prevData,
      images: roomUrls,
    }));
  }, [roomUrls]);

  useEffect(() => {
    onUpdate(roomData);
  }, [roomData]);

  return (
    <div className="bg-amber-100 rounded-lg mt-2 p-2">
      <div className="flex justify-center sm:mt-4 mt-[-24px]">
        <UploadImagesInput
          imageUrls={roomUrls}
          setImageUrls={setRoomUrls}
          showImages
        />
      </div>
      <div className="flex gap-2 items-center">
        <h3 className="sm:text-xl">סוג החדר:</h3>

        <Controller
          control={control}
          name={`rooms[${index}].roomType`}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="סוג החדר"
              value={roomData.roomType}
              onChange={(e) => handleRoomTypeChange(e.target.value)}
              className="w-[250px]"
            />
          )}
        />
      </div>

      <div className="mt-4">
        <h3 className="sm:text-xl">תיאור החדר:</h3>

        <Controller
          control={control}
          name={`rooms[${index}].roomDescription`}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="תיאור החדר"
              value={roomData.roomDescription}
              onChange={(e) => handleRoomDescriptionChange(e.target.value)}
              className="border h-[100px] w-full text-sm  sm:text-xl"
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

export default HotelRoomForm;
