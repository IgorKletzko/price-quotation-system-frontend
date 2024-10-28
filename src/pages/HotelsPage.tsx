import { useDeleteHotel, useGetHotels } from "@/api/HotelsFormApi";
import HotelsForm from "@/forms/HotelsForm/HotelsForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import SmallCarousel from "@/components/SmallCarousel";
import { Hotel, Room } from "@/types/types";
import { useNavigate } from "react-router-dom";
import StarRating from "@/components/StarRaiting";

const HotelsPage = () => {
  const { hotels } = useGetHotels();

  const { deleteHotel, isSuccess } = useDeleteHotel();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      window.location.reload();
    }
  }, [isSuccess, deleteHotel]);

  if (!hotels) {
    return (
      <div className="container mx-auto">
        <HotelsForm />
        <p>Loading hotels...</p>
      </div>
    );
  }

  const sortedHotels = [...hotels].sort((a, b) =>
    a.hotelName.localeCompare(b.hotelName)
  );

  const handleDeleteHotel = (hotelName: string) => {
    setSelectedHotel(hotelName);
    setShowModal(true);
  };
  const confirmDeleteHotel = () => {
    if (selectedHotel) {
      deleteHotel(selectedHotel);
    }
    setShowModal(false);
  };

  const handleUpdateHotel = (hotel: Hotel) => {
    navigate(`/update-hotel`, { state: { hotel } });
  };

  return (
    <div className="sm:container mx-auto" dir="rtl">
      <HotelsForm />

      <Accordion type="single" collapsible className="space-y-2 mt-12">
        {sortedHotels.map((hotel) => (
          <AccordionItem key={hotel.hotelName} value={hotel.hotelName}>
            <AccordionTrigger className="flex flex-col md:flex-row justify-between bg-blue-500 rounded-md p-2 sm:p-4 hover:no-underline">
              <p> {hotel.hotelName}</p>
            </AccordionTrigger>
            <AccordionContent className="border p-2 sm:p-4">
              <div className="flex justify-center">
                <ImageCarousel images={hotel.images} />
              </div>

              <p className="mt-8">{hotel.hotelDescription}</p>

              <StarRating star={hotel.stars}/>

              <Accordion type="single" collapsible className="space-y-2 mt-4">
                {hotel.rooms.map((room: Room) => (
                  <AccordionItem key={room.id} value={room.id}>
                    <AccordionTrigger className="bg-amber-200 rounded p-4 ">
                      <div className="flex space-x-2">
                        <p className="ml-2"> {room.roomType}</p>

                        <p>({room.images.length}תמונות)</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border bg-amber-100">
                      <SmallCarousel
                        images={room.images}
                        slidesToShow={room.images.length > 3 ? 3 : 1}
                        responsive={[
                          {
                            breakpoint: 768,
                            settings: {
                              slidesToShow: 1,
                            },
                          },
                        ]}
                      />

                      <div className="flex justify-center">
                        <p className="mt-8"> {room.roomDescription}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="flex justify-center mt-8">
                <Button
                  type="button"
                  onClick={() => handleDeleteHotel(hotel.hotelName)}
                  className="bg-red-400 rounded p-2 hover:bg-red-500 text-black hover:text-white"
                >
                  למחוק בית מלון
                </Button>
              </div>
              <div>
                <Button
                  type="button"
                  onClick={() => handleUpdateHotel(hotel)}
                  className="bg-purple-400 rounded p-2 hover:bg-purple-500 text-black hover:text-white"
                >
                  עריכה
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <ConfirmationModal
        show={showModal}
        onConfirm={confirmDeleteHotel}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default HotelsPage;
