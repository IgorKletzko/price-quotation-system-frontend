import { z } from "zod";

const headerFormSchema = z.object({
  formName: z.string().min(1, "formName is required"),
});

const hotelSchema = z.object({
  id: z.string(),
  type: z.literal("hotel"),
  hotelName: z.string().min(1, "Hotel name is required"),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  hotelDescription: z.string(),
  rooms: z.array(
    z.object({
      roomType: z.string(),
      images: z.array(z.string()),
    })
  ),
  sum: z.number(),
});
const transferSchema = z.object({
  id: z.string(),
  type: z.literal("transfer"),
  transferDescription: z.string(),
  transferDate: z.date(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  from: z.string(),
  to: z.string(),
  sum: z.number(),
  passengerComposition: z.string(),
  agentComments: z.string(),
});

export const flightSchema = z.object({
  id: z.string(),
  type: z.literal("flight"),
  description: z.string(),
  departureDate: z.date(),
  arrivalDate: z.date(),
  flightNumber: z.string(),
  airline: z.string(),
  departureAirport: z.string(),
  arrivalAirport: z.string(),
  stopsNumber: z.number(),
  stopoverAirport1: z.string(),
  stopoverAirport2: z.string(),
  stopoverAirport3: z.string(),
  stopover1Time: z.string(),
  stopover2Time: z.string(),
  stopover3Time: z.string(),
  flightTime: z.string(),
  landingTime: z.string(),

  numberOfAdults: z.number(),
  numberOfChildren: z.number(),
  numberOfBabies: z.number(),

  priceForAdult: z.number(),
  priceForChild: z.number(),
  priceForBaby: z.number(),
  currency: z.string(),
  agentComments: z.string().optional(),
});

const imageSchema = z.object({
  id: z.string(),
  type: z.literal("image"),
  imageUrl: z.string().url(),
  description: z.string(),
  start: z.date(),
  end: z.date(),
});

export const formSchema = z.object({
  items: z.array(
    z.union([
      hotelSchema,
      transferSchema,
      flightSchema,
      imageSchema,
      headerFormSchema,
    ])
  ),
});
