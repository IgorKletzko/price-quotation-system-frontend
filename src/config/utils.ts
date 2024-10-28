export const dateFormat = (dateValue: string) => {
    let dateObj = new Date(dateValue)

    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getUTCFullYear()).slice(-2);

    const formattedDate = `${day}/${month}/${year}`

    return formattedDate
}

export const calculateNights = (checkInDate: string, checkOutDate: string): number => {

  const checkIn: Date = new Date(checkInDate);
  const checkOut: Date = new Date(checkOutDate);

  const checkInTime: number = checkIn.getTime();
  const checkOutTime: number = checkOut.getTime();

  const timeDifference: number = checkOutTime - checkInTime;

  const numberOfNights: number = timeDifference / (1000 * 60 * 60 * 24);

  return Math.round(numberOfNights);
}




