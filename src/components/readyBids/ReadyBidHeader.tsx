
import Hero from "./Hero";
import Countdown from "./Countdown";
// import BeforeApproved from "./BeforeApproved";

interface Props {
  createDate: string;
  holidayStartDate: string;
  formName: string | undefined;
  isBidApproved: boolean | undefined;
  fakeCountNumber: number | undefined;
}

const ReadyBidHeader: React.FC<Props> = ({
  createDate,
  holidayStartDate,
  formName,
  // isBidApproved,
  fakeCountNumber,
}) => {
  return (
    <>
      <Hero />
      {/* {isBidApproved ? (
        <Countdown
          createDate={createDate}
          holidayStartDate={holidayStartDate}
          formName={formName}
          randomNumber={fakeCountNumber}
        />
      ) : (
        <BeforeApproved formName={formName} randomNumber={fakeCountNumber} />
      )} */}
      <Countdown
        createDate={createDate}
        holidayStartDate={holidayStartDate}
        formName={formName}
        randomNumber={fakeCountNumber}
      />
    </>
  );
};

export default ReadyBidHeader;
