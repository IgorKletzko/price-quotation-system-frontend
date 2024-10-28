type FlightResponse = {
  flightDescription: string;
  airline: string;
  arrivalAirport: string;
  arrivalDate: string; // ISO date string
  departureAirport: string;
  departureDate: string; // ISO date string
  flightNumber: string;
  flightTime: string;
  landingTime: string;
  stopoverAirport1: string;
  stopoverAirport2: string;
  stopoverAirport3: string;
  stopover1Time: string;
  stopover2Time: string;
  stopover3Time: string;
  stopsNumber: number;
  agentComments: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfBabies: number;
  priceForAdult: number;
  priceForChild: number;
  priceForBaby: number;
  currency: string;
  type: string;
  id: string;
  _id: string;
  sum: number;
};

type HotelRoom = {
  roomType: string;
  roomDescription: string;
  images: string[];
  nightPrice: number;
  numberOfRooms: number;
  _id: string;
};

type HotelResponse = {
  id: string;
  type: "hotel";
  hotelName: string;
  checkInDate: string; // ISO date string
  checkOutDate: string; // ISO date string
  hotelDescription: string;
  stars: number;
  images: string[];
  rooms: HotelRoom[];
  sum: number;
  _id: string;
};

type TransferResponse = {
  id: string;
  type: "transfer";
  transferDescription: string;
  transferDate: string; // ISO date string
  departureTime: string;
  from: string;
  to: string;
  sum: number;
  passengerComposition: string;
  agentComments: string;
  _id: string;
};

type ImageResponse = {
  id: string;
  type: string;
  imageUrl: string;
  description: string;
  _id: string;
};

type MainBidServerResponse = {
  createDate: string;
  formName: string;
  holidayStartDate: string;
  isBidApproved: boolean;
  fakeCountNumber: number;
  totalSum: number;
  showSum: boolean;
  currency: string;

  flight: FlightResponse[];
  hotel: HotelResponse[];
  transfer: TransferResponse[];
  image: ImageResponse[];
  idArray: string[];
  __v: number;
  _id: string;
};

export type {
  FlightResponse,
  HotelResponse,
  TransferResponse,
  ImageResponse,
  MainBidServerResponse,
};
