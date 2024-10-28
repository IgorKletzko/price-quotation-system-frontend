
import { FlightResponse } from "@/types/mainBidFormResponse";


type Props = {
  data: FlightResponse;
};

const PasangersDetails = ({ data }: Props) => {
 
  return (
    <div className="flex flex-col sm:flex-row sm:gap-36 mx-2 sm:mx-8 mt-4">
      <div>
        <h2 className="font-bold mb-2">הרכב הנוסעים</h2>
        <div className="flex gap-8">
          <div className="flex flex-col">
            {data.numberOfAdults > 0 && (
              <div className="flex gap-24">
                <span className="flex gap-2">
                  <p>מבוגרים:</p>
                  <p>{data.numberOfAdults}</p>
                </span>
              </div>
            )}
            {data.numberOfChildren > 0 && (
              <div className="flex gap-24">
                <span className="flex gap-2">
                  <p>ילדים:</p>
                  <p>{data.numberOfChildren}</p>
                </span>
              </div>
            )}
            {data.numberOfBabies > 0 && (
              <div className="flex gap-24">
                <span className="flex gap-2">
                  <p>תינוקות:</p>
                  <p>{data.numberOfBabies}</p>
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {data.priceForAdult > 0 && (
              <div className="flex gap-1">
                <p>{data.priceForAdult}</p>
                <p>{data.currency}</p>
              </div>
            )}
            {data.priceForChild > 0 && (
              <div className="flex gap-1">
                <p>{data.priceForChild}</p>
                <p>{data.currency}</p>
              </div>
            )}
            {data.priceForBaby > 0 && (
              <div className="flex gap-1">
                <p>{data.priceForBaby}</p>
                <p>{data.currency}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 font-bold">
          <p>סה׳׳כ לתשלום</p>
          <div className="flex gap-1">
            <p>{data.sum}</p>
            <p>{data.currency}</p>
          </div>
        </div>
      </div>

      <div className=" mt-2">
        <p className="font-bold mb-1">הערות סוכן</p>
        <p>{data.agentComments}</p>
      </div>
    </div>
  );
};

export default PasangersDetails;
