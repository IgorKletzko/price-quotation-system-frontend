import { useState } from "react";
import { FlightResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import FlightDetails from "./FlightDetails";
import PasangersDetails from "./PasangersDetails";
import { Separator } from "@/components/ui/separator";
import { dateFormat } from "@/config/utils";
// import flight_icon from "../../../assets/flight-icon.png"


interface ReadyFlightCardProps {
  data: FlightResponse;
}

const ReadyFlightCard: React.FC<ReadyFlightCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div dir="rtl">
      <Accordion type="single" collapsible>
        <AccordionItem key={data.id} value={data.id} className="group">
          <AccordionTrigger
            className={`flex flex-col sm:flex-row bg-customGreen1 text-sm sm:text-lg text-white md:font-normal font-semibold p-1 sm:p-3 hover:no-underline border-2 hover:border-green-300 ${
              isOpen ? "rounded-t-full" : "rounded-full"
            }`}
            onClick={handleToggle}
          >
            <div className="flex justify-start md:w-[400px] sm:mr-4">
              {/* <span className="hidden md:block w-[30px]">  */}
              {/* <span className=" w-[30px]">
                <img src={flight_icon} />
              </span> */}
              <h3 className="md:mr-2">{data.flightDescription}</h3>
            </div>

            <div className="flex justify-center gap-1">
              <p>תאריך טיסה</p>
              <p>:</p>
              <p>{dateFormat(data.departureDate)}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-green-100 rounded-b-lg py-4">
              <FlightDetails data={data} />
              <Separator className="bg-green-400" />
              <PasangersDetails data={data} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReadyFlightCard;
