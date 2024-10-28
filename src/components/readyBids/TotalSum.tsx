import { MainBidServerResponse } from "@/types/mainBidFormResponse";

interface Props {
  bidForm: MainBidServerResponse[] | undefined;
}

const TotalSum: React.FC<Props> = ({ bidForm }) => {
  // Add a fallback or check for undefined bidForm
  if (!bidForm || bidForm.length === 0) {
    return (
      <div className="flex justify-center md:justify-start lg:px-36 mt-16 md:ml-28">
        <div className="flex flex-col-reverse sm:flex-row justify-center bg-orange-400 rounded-full p-4 lg:p-6 sm:gap-2 font-semibold text-white md:text-lg w-64 md:w-80">
          <p className="text-center">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {bidForm[0]?.showSum && (
        <div className="flex justify-center md:justify-start lg:px-36 mt-16 md:ml-28">
          <div className="flex flex-col-reverse sm:flex-row justify-center bg-orange-400 rounded-full p-4 lg:p-6 sm:gap-2 font-semibold text-white md:text-lg w-64 md:w-80">
            <div className="flex justify-center gap-1">
              <p>{bidForm[0]?.currency}</p>
              <p>{bidForm[0]?.totalSum}</p>
            </div>
            <p className="text-center">:סך הכל לתשלום</p>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalSum;
