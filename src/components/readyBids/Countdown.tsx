import React, { useEffect, useState } from "react";

interface CountdownProps {
  createDate: string;
  holidayStartDate: string;
  formName: string | undefined;
  randomNumber: number | undefined;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({
  createDate,
  holidayStartDate,
  formName,
  randomNumber,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // console.log(timeLeft)
  // const [proposalNumber, setProposalNumber] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    // const randomProposalNumber =
    //   Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    // setProposalNumber(randomProposalNumber);


    return () => clearInterval(interval);
  }, [createDate, holidayStartDate]);

  
  // console.log(createDate, flightDate)

  const updateCountdown = () => {
    const now = new Date().getTime();
    const startDateTime = new Date(createDate).getTime();
 
    // const futureDateTime = new Date(holidayStartDate).getTime();
      const futureDateTime =
        new Date(holidayStartDate).getTime() - 4 * 60 * 60 * 1000;


    if (isNaN(futureDateTime)) {
      console.error("Invalid holidayStartDate:", holidayStartDate);
      return;
    }

    // Ensure the countdown only runs if the start date is before the future date
    if (futureDateTime > now && startDateTime <= now) {
      const distance = futureDateTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    } else {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  const isTimeUp =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div dir="rtl" className="flex justify-center -my-36 mb-8 px-4">
      <div className=" bg-blue-50 gap-2 p-4 rounded-md w-[500px] shadow-md">
        <h2 className="text-center mb-2 text-lg font-semibold">{formName},</h2>

        {!isTimeUp ? (
          <div>
            <h2 className="text-center sm:text-lg mb-2 font-semibold">
              איזו התרגשות! אתם תיכף בחופי תאילנד 🏝️ נשארו רק עוד...
            </h2>
            <div className="flex justify-center text-sky-600 ">
              <div className="flex justify-center bg-blue-100 gap-1 sm:gap-2 text-sky-600 text-md sm:text-xl">
                {timeLeft.minutes > 0 ? (
                  <div className="bg-sky-200 p-4 py-8 rounded-md">
                    <p className="text-center"> {timeLeft.minutes}</p>
                    <p> דקות</p>
                  </div>
                ) : (
                  <div className="bg-sky-200 p-4 py-8 rounded-md">
                    <p className="text-center"> 0</p>
                    <p> דקות</p>
                  </div>
                )}
                {timeLeft.hours > 0 ? (
                  <div className="bg-sky-200 p-4 py-8 rounded-md">
                    <p className="text-center"> {timeLeft.hours}</p>
                    <p> שעות</p>
                  </div>
                ) : (
                  <div className="bg-sky-200 p-4 py-8 rounded-md">
                    <p className="text-center"> 0 </p>
                    <p> שעות</p>
                  </div>
                )}

                {timeLeft.days > 0 ? (
                  <div className="bg-sky-200 p-4 py-8 rounded-md">
                    <p className="text-center"> {timeLeft.days}</p>
                    <p> ימים</p>
                  </div>
                ) : (
                  <div className="bg-sky-200 p-4 py-8 rounded-md">
                    <p className="text-center">0</p>
                    <p> ימים</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-center text-lg mb-2">שתהיה לכם חופשה מהנה</h2>
        )}

        <div className="flex justify-center gap-2 mt-4 text-sm sm:text-lg">
          <p>מספר הצעה:</p>
          <p>{randomNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;




