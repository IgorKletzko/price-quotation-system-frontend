import { TransferResponse } from "@/types/mainBidFormResponse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { dateFormat } from "@/config/utils";
import { useState } from "react";
// import transfer_icon from "../../assets/transfer-icon.png"

interface ReadyTransferCardProps {
  data: TransferResponse;
}

const ReadyTransferCard: React.FC<ReadyTransferCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div dir="rtl" className="">
      <Accordion type="single" collapsible>
        <AccordionItem key={data.id} value={data.id}>
          <AccordionTrigger
            className={`bg-blueSky text-white font-semibold md:font-normal hover:no-underline flex flex-col text-sm sm:text-lg sm:flex-row p-3 border-2 hover:border-blue-300 ${
              isOpen ? "rounded-t-full" : "rounded-full"
            }`}
            onClick={handleToggle}
          >
            <div className="flex items-center justify-start md:w-[400px] sm:mr-4">
              {/* <span className="hidden md:block w-[30px]"> */}
              {/* <span className=" w-[30px]">
                <img src={transfer_icon} />
              </span> */}
              <h3 className="md:mr-2">{data.transferDescription}</h3>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="bg-sky-100 p-4 flex flex-col sm:flex-row items-center sm:justify-between px-2 lg:px-16">
              {/* First Section: Travel Path and Date */}

              <div className="mb-4 sm:mb-0 text-center">
                <p className="font-semibold text-center">מסלול הנסיעה:</p>
                <div className="">
                  <p>מ{data.from}</p>
                  <p>ל{data.to}</p>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="flex justify-center gap-1">
                  <p className="font-semibold">תאריך הנסיעה:</p>
                  <p>{dateFormat(data.transferDate)}</p>
                </div>
                <div className="flex justify-center gap-1 ">
                  <p className="font-semibold">שעת איסוף:</p>
                  <p>{data.departureTime}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-semibold">הרכב הנוסעים:</p>
                  <p>{data.passengerComposition}</p>
                </div>
              </div>

              {/* Second Section: Passenger Composition and Price */}
              <div className="space-y-2 mt-4 sm:mt-0">
                <div className="flex flex-col gap-1">
                  {data.agentComments && (
                    <p className="font-semibold text-center">הערות סוכן:</p>
                  )}

                  <p className="text-center">{data.agentComments}</p>
                </div>
                <div className="flex justify-center gap-1 font-semibold text-lg">
                  <p>מחיר:</p>
                  <p>฿{data.sum}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReadyTransferCard;
