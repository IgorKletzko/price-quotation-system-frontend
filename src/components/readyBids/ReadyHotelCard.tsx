import { HotelResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ImageCarousel from "../ImageCarousel";
import SmallCarousel from "../SmallCarousel";
import { calculateNights, dateFormat } from "@/config/utils";
import { useEffect, useRef, useState } from "react";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import StarRating from "../StarRaiting";
// import hotel_icon from "../../assets/hotle-icon.png"

interface ReadyHotelCardProps {
  data: HotelResponse;
}

const ReadyHotelCard: React.FC<ReadyHotelCardProps> = ({ data }) => {
  const nights = calculateNights(data.checkInDate, data.checkOutDate);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  
    const descriptionRef = useRef<HTMLParagraphElement>(null);


   useEffect(() => {
     const observerCallback = () => {
       if (descriptionRef.current) {
         const descriptionHeight = descriptionRef.current.scrollHeight;
         const lineHeight = parseInt(
           window.getComputedStyle(descriptionRef.current).lineHeight || "0",
           10
         );

         // Check if the content exceeds two lines
         setIsTruncated(descriptionHeight > lineHeight * 2);
       }
     };

     // Run the observer callback immediately
     observerCallback();

     // Create a MutationObserver to monitor changes to the description text
     const observer = new MutationObserver(observerCallback);

     if (descriptionRef.current) {
       observer.observe(descriptionRef.current, {
         childList: true,
         subtree: true,
       });
     }

     return () => {
       observer.disconnect();
     };
   }, [isOpen1,data.hotelDescription]);
  
  
  
  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
  };
  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };

   const toggleDescription = () => {
     setShowFullDescription(!showFullDescription);
   };

  return (
    <div dir="rtl" className="">
      <Accordion type="single" collapsible className="">
        <AccordionItem key={data._id} value={data._id}>
          <AccordionTrigger
            className={`flex flex-col md:flex-row bg-red-500  text-white p-1 sm:p-3 hover:no-underline md:font-normal text-sm sm:text-lg border-2 hover:border-customHotelCard2 ${
              isOpen1 ? "rounded-t-full" : "rounded-full"
            }`}
            onClick={handleToggle1}
          >
            <div className="flex justify-start items-center md:w-[400px] sm:mr-4">
              {/* <span className="hidden md:block w-[35px]"> */}
              {/* <span className=" w-[30px]">
                <img src={hotel_icon} />
              </span> */}
              <h3 className="md:mr-2"> {data.hotelName}</h3>
            </div>

            <div className="flex gap-2">
              <span className="flex gap-1">
                <p>{dateFormat(data.checkInDate)}</p>
                <p>-</p>
                <p>{dateFormat(data.checkOutDate)}</p>
              </span>
              <p>({nights} לילות)</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-yellow-50 border p-2 sm:p-4">
            <div className="flex justify-center">
              <ImageCarousel images={data.images} />
            </div>
            <h2 className="text-xl mt-8 text-center">{data.hotelName}</h2>
            <span className="flex justify-center mb-4">
              <StarRating star={data.stars} />
            </span>

            <div className="bg-yellow-100 p-6 rounded-md">
              <div className="flex justify-center">
                <p
                  ref={descriptionRef}
                  className={`mt-4 text-center ${
                    showFullDescription ? "" : "line-clamp-2 overflow-hidden"
                  }`}
                >
                  {data.hotelDescription}
                </p>
              </div>
              {isTruncated && (
                <div className="text-center mt-2">
                  <button
                    onClick={toggleDescription}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    {showFullDescription ? "הסתר" : "קרא עוד"}
                  </button>
                </div>
              )}
            </div>

            <Accordion type="single" collapsible className="space-y-2 mt-4">
              {data.rooms.map((room) => (
                <AccordionItem key={room._id} value={room._id}>
                  <AccordionTrigger
                    onClick={handleToggle2}
                    className="bg-yellow-300 rounded-2xl p-4 hover:no-underline hover:bg-yellow-400"
                  >
                    <div className="flex gap-2">
                      <div className="flex flex-col sm:flex-row sm:gap-2 sm:w-[400px] w-[150px]">
                        <p>סוג החדר:</p>
                        <p className="ml-2"> {room.roomType}</p>
                      </div>

                      <div className="flex hover:underline items-center">
                        <p className="mr-8">לחצו כאן לפרטי החדר</p>
                        {isOpen2 ? (
                          <ArrowBigUpDash className="mt-1  hidden sm:block" />
                        ) : (
                          <ArrowBigDownDash className="mt-1 hidden sm:block" />
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="rounded pb-0">
                    <SmallCarousel
                      images={room.images}
                      slidesToShow={room.images.length > 2 ? 3 : 1}
                      responsive={[
                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 1,
                          },
                        },
                      ]}
                    />

                    <div className="flex justify-center items-center mt-8">
                      <p className="w-2/3 text-center">
                        {room.roomDescription}
                      </p>
                    </div>

                    <div className="bg-yellow-100 flex flex-col xl:flex-row justify-between rounded-lg mt-8">
                      <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 2xl:gap-16 m-2">
                        <div className="2xl:border border-yellow-300"></div>

                        <div className="flex flex-row sm:flex-col gap-2">
                          <p className="text-center font-semibold ">סוג חדר</p>
                          <p className="text-center">{room.roomType}</p>
                        </div>
                        <div className="border border-yellow-300"></div>
                        <div className="flex flex-row sm:flex-col gap-2">
                          <p className="text-center font-semibold">
                            כמות חדרים
                          </p>
                          <p className="text-center">{room.numberOfRooms}</p>
                        </div>
                        <div className="border border-yellow-300"></div>

                        <div className="flex sm:flex-col gap-2">
                          <p className="text-center font-semibold ">תאריכים</p>
                          <div className="flex justify-center gap-1">
                            <div className="flex justify-center">
                              <p>{dateFormat(data.checkInDate)}</p>
                              <p>-</p>
                              <p>{dateFormat(data.checkOutDate)}</p>
                            </div>

                            <p className="text-center">({nights} לילות)</p>
                          </div>
                        </div>
                        <div className="border border-yellow-300"></div>

                        <div className="flex flex-row sm:flex-col gap-2 text-center">
                          <p className="font-semibold text-center">מחיר לילה</p>
                          <p className="text-center">฿{room.nightPrice}</p>
                        </div>
                        <div className="border border-yellow-300"></div>
                      </div>

                      <div className="bg-yellow-200 p-4 md:px-16 lg:px-24 xl:36 text-center rounded">
                        <p>סה׳׳כ</p>
                        <p className="text-lg font-bold">
                          ฿{room.numberOfRooms * room.nightPrice * nights}
                        </p>
                      </div>
                    </div>
                    <p className="text-center my-4">{room.agentNotes}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReadyHotelCard;







