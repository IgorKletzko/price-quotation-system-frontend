
interface BeforeApprovedProps {
  formName: string | undefined;
    randomNumber: number | undefined;
}

const BeforeApproved: React.FC<BeforeApprovedProps> = ({formName, randomNumber}) => {
    return (
      <div dir="rtl" className="flex justify-center mb-8 -mt-12 h-[150px] px-2">
        <div className=" bg-blue-50 gap-2 p-4 rounded-md w-[500px] shadow-md">
          <h2 className="text-center mb-4 text-lg">{formName}</h2>
          <p className="text-center md:text-xl">ההצעה שלכם כבר מוכנה</p>

          <div className="flex justify-center gap-2 mt-4">
            <p>מספר הצעה:</p>
            <p>{randomNumber}</p>
          </div>
        </div>
      </div>
    );
}

export default BeforeApproved;