import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ImageCarousel from "@/components/ImageCarousel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { v4 as uuidv4 } from "uuid";

import { Separator } from "@/components/ui/separator";
import { uploadImages, useDeleteImage } from "@/api/imageUploadApi";
import { HotelFormData, RoomFormData } from "@/types/types";
import UploadImagesInput from "@/components/UploadImagesInput";
import UpdateHotelsRoom from "./UpdateHotelsRoom";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateHotel } from "@/api/UpdateHotelsFormApi";

const hotelSchema = z.object({
  hotelName: z.string().min(1, "Hotel name is required"),
  hotelDescription: z.string().min(1, "Hotel description is required"),
  images: z.array(z.string()).optional(),

  rooms: z.array(
    z.object({
      roomType: z.string().min(1),
      images: z.array(z.string()).optional(),
    })
  ),
});

const UpdateHotelsForm = () => {
  const methods = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {},
  });

  const navigate = useNavigate();
  const location = useLocation();
  const hotel = location.state?.hotel;

  const [hotelUrls, setHotelUrls] = useState<string[]>([]);
  // console.log("hotelUrls===>>>", hotelUrls.length);
  const [rooms, setRooms] = useState<RoomFormData[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // console.log("UpdateHotelForm---rooms", rooms)
  // console.log("UpdateHotelUrls",hotelUrls)

  const { deleteImage } = useDeleteImage();

  useEffect(() => {
    setHotelUrls(hotel.images);
    setRooms(hotel.rooms);
  }, [hotel]);

  const handleAddRoom = () => {
    setRooms((rooms) => [...rooms, { id: uuidv4(), roomType: "", roomDescription: "", images: [] }]);
  };

  const handleRemoveRoom = async (id: string) => {
    const roomToRemove = rooms.find((room) => room.id === id);

    if (
      roomToRemove &&
      Array.isArray(roomToRemove.images) &&
      roomToRemove.images.length > 0
    ) {
      await Promise.all(roomToRemove.images.map((url) => deleteImage(url)));
    }
    setRooms((rooms) => rooms.filter((room) => room.id !== id));
  };

  const handleRemoveImage = async (index: number) => {
    const urlToRemove = hotelUrls[index];
    deleteImage(urlToRemove);
    setHotelUrls((prevUrls) => {
      const updatedUrls = prevUrls.filter((_, i) => i !== index);
      return updatedUrls;
    });
  };

  const handleRoomDataChange = (index: number, newRoomData: RoomFormData) => {
    setRooms((currentRooms) =>
      currentRooms.map((room, idx) => (idx === index ? newRoomData : room))
    );
  };

  const { updateHotel, isLoading, isSuccess, error } = useUpdateHotel();

  const uploadImagesToCloudinary = async (
    imageUrls: string[]
  ): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    setIsUploading(true);

    for (const imageUrl of imageUrls) {
      // Check if the URL is already a Cloudinary URL
      if (imageUrl.startsWith("https://res.cloudinary.com/")) {
        uploadedUrls.push(imageUrl);
        continue;
      }

      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });

        const url = await uploadImages(file);
        uploadedUrls.push(url);
      } catch (err) {
        toast.error("Image upload failed. Please try again.");
        throw err;
      }
    }

    setIsUploading(false);

    return uploadedUrls;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsUploading(true);
      // Only upload images that aren't already Cloudinary URLs
      const cloudinaryHotelUrls = await uploadImagesToCloudinary(hotelUrls);

      const cloudinaryRoomUrls = await Promise.all(
        rooms.map(async (room) => {
          const uploadedRoomImages = await uploadImagesToCloudinary(
            room.images
          );
          return { ...room, images: uploadedRoomImages };
        })
      );

      const formData = methods.getValues();

      const fullFormData = {
        hotelName: formData.hotelName,
        hotelDescription: formData.hotelDescription,
        stars: formData.stars,
        images: cloudinaryHotelUrls,
        rooms: cloudinaryRoomUrls,
      };

      if (fullFormData.hotelName && fullFormData.hotelDescription) {
        const updateData = {
          hotelId: hotel._id,
          updatedHotelData: fullFormData,
        };

        updateHotel(updateData);
        setHotelUrls([]);
        setRooms([]);
        setShowForm(!showForm);
        localStorage.removeItem("images");
       
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("הבית מלון עודכן במערכת");
       setTimeout(() => {
         navigate("/hotels");
       }, 1000);
    }
    if (error) {
      toast.error("עדכון הבית מלון נכשל");
    }
  }, [isSuccess, error]);

  // console.log("isUploading=======>>>", isUploading);

  return (
    <>
      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
          <LoadingButton />
        </div>
      )}
      <FormProvider {...methods}>
        <div
          className={`sm:container bg-gray-100 rounded-lg ${
            isUploading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <div className="flex justify-center">
            {hotelUrls.length > 0 && (
              <ImageCarousel
                handleRemoveImage={handleRemoveImage}
                images={hotelUrls}
                showDeleteButtons
              />
            )}
          </div>

          <form dir="rtl" onSubmit={handleSubmit}>
            <div className="flex justify-center mt-8 mb-4">
              <UploadImagesInput
                imageUrls={hotelUrls}
                setImageUrls={setHotelUrls}
                showImages={false}
              />
            </div>

            <div className="flex flex-col gap-4 bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <h2 className="sm:text-2xl">שם הבית מלון:</h2>
                <input
                  {...methods.register("hotelName")}
                  className="border text-sm sm:text-xl"
                  defaultValue={hotel.hotelName}
                  disabled={isUploading}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-4">
                <h2 className="sm:text-2xl">כוכבים:</h2>
                <input
                  {...methods.register("stars")}
                  className="border text-sm sm:text-xl"
                  defaultValue={hotel.stars}
                  type="number"
                  min="0"
                  max="6"
                />
              </div>

              <div className="">
                <h3 className="sm:text-xl">תיאור הבית מלון:</h3>
                <textarea
                  {...methods.register("hotelDescription")}
                  className="border h-[100px] w-full text-sm sm:text-xl"
                  defaultValue={hotel.hotelDescription}
                  disabled={isUploading}
                />
              </div>
            </div>

            <Separator className="mt-8" />

            <div>
              {rooms.map((room, index) => (
                <UpdateHotelsRoom
                  key={room.id}
                  index={index}
                  id={room.id}
                  onRemove={() => handleRemoveRoom(room.id)}
                  onUpdate={(newRoomData) =>
                    handleRoomDataChange(index, newRoomData)
                  }
                  room={room}
                />
              ))}
              <Button
                type="button"
                onClick={handleAddRoom}
                className="mt-4 text-xs p-1 h-5"
                disabled={isUploading}
              >
                להוסיף חדר
              </Button>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              {isLoading || isUploading ? (
                <LoadingButton />
              ) : (
                <Button
                  type="submit"
                  className="bg-purple-400 rounded p-2 hover:bg-purple-500 text-black hover:text-white"
                  disabled={isUploading}
                >
                  עדכן בית מלון
                </Button>
              )}
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
};

export default UpdateHotelsForm;
