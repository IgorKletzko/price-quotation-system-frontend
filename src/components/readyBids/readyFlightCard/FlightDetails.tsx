import { calculateNights, dateFormat } from "@/config/utils";
import { FlightResponse } from "@/types/mainBidFormResponse";
import { MoveLeft, PlaneLanding, PlaneTakeoff } from "lucide-react";

type Props = {
  data: FlightResponse;
};

const FlightDetails = ({ data }: Props) => {
  const nights = calculateNights(data.departureDate, data.arrivalDate);

  return (
    <>
      <div className="flex flex-col items-center gap-1 mb-4 sm:items-start sm:flex-row sm:justify-between sm:mx-8">
        <div className="">
          <div className="flex justify-center sm:justify-start gap-1 mb-4">
            <p className="font-semibold">חברת תעופה:</p>
            <p className="text-center">{data.airline}</p>
          </div>
          <div className="flex justify-center sm:justify-start gap-1 mb-4">
            <p className="font-semibold">מספר טיסה:</p>
            <p className="text-center">{data.flightNumber}</p>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-8 lg:w-4/5">
          <div className="flex flex-col items-center sm:items-center lg:mr-36">
            <PlaneTakeoff className="-scale-x-100" />
            <p>{data.departureAirport}</p>
            <p className="text-center">{data.flightTime}</p>
          </div>

          <div className="flex flex-col items-center mt-4">
            {data.stopsNumber > 0 ? (
              <>
                <div className="flex gap-1">
                  <p>מספר עצירות:</p>
                  <span className="text-center">
                    <p>{data.stopsNumber}</p>
                  </span>
                </div>
                <MoveLeft />
              </>
            ) : (
              <div className="flex flex-col items-center">
                <p>טיסה ישירה</p>
                <MoveLeft />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center sm:items-center lg:ml-36">
            <div className="flex">
              <PlaneLanding className="-scale-x-100" />
            </div>
            <p>{data.arrivalAirport}</p>
            {nights > 0 && <p>{dateFormat(data.arrivalDate)}</p>}
            <p className="text-center">{data.landingTime}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 sm:mr-8 flex flex-col items-center sm:items-start mb-4">
        {data.stopoverAirport1 && (
          <div className="flex flex-col items-center text-center sm:flex-row sm:gap-4">
            <span className="flex gap-2">
              <p>עצירה 1:</p>
              <p>{data.stopoverAirport1}</p>
            </span>
            <span className="flex gap-2">
              <p>זמן העצירה:</p>
              <p>{data.stopover1Time}</p>
            </span>
          </div>
        )}
        {data.stopoverAirport2 && (
          <div className="flex flex-col items-center text-center sm:flex-row sm:gap-4">
            <span className="flex gap-2">
              <p>עצירה 2:</p>
              <p>{data.stopoverAirport2}</p>
            </span>
            <span className="flex gap-2">
              <p>זמן העצירה:</p>
              <p>{data.stopover2Time}</p>
            </span>
          </div>
        )}
        {data.stopoverAirport3 && (
          <div className="flex flex-col items-center text-center sm:flex-row sm:gap-4">
            <span className="flex gap-2">
              <p>עצירה 3:</p>
              <p>{data.stopoverAirport3}</p>
            </span>
            <span className="flex gap-2">
              <p>זמן העצירה:</p>
              <p>{data.stopover3Time}</p>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightDetails;
