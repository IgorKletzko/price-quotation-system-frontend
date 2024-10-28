import React, { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  TransferCardFields,
  Hotel,
  Room,
  HotelCardFields,
  FlightCardFields,
  FormFields,
} from "../../../types/types";
import SortableList from "./SortableList";
import FormActions from "./FormActions";
import { useCreateMainBidForm, useGetMainBidForms } from "@/api/MainFormApi";
import { formSchema } from "../../mainBidForm/ZodSchema";
import { SeparatorUrls } from "@/config/separatorUrls";
import DatePicker from "react-datepicker";



const MainBidForm: React.FC = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
    },
  });

  const { control } = form;

  const [selectedImageUrl, setSelectedImageUrl] = useState(
    SeparatorUrls[0].url
  );

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [hotelData, setHotelData] = useState<
    { selectedHotel: Hotel | null; selectedRooms: Room[] }[]
  >([]);

  const handleHotelDataChange = (
    index: number,
    data: { selectedHotel: Hotel | null; selectedRooms: Room[] }
  ) => {
    setHotelData((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };

  const handleHotelRemove = (index: number) => {
    setHotelData((prevData) => prevData.filter((_, i) => i !== index));
    remove(index);
  };

  const addHotel = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    append({
      id: uuidv4(),
      type: "hotel",
      hotelName: "",
      checkInDate: today,
      checkOutDate: tomorrow,
      hotelDescription: "",
      stars: 0,
      images: [],
      rooms: [],
      sum: 0,
    } as HotelCardFields);
  };

  const addTransfer = () => {
    append({
      id: uuidv4(),
      type: "transfer",
      transferDescription: "",
      transferDate: new Date(),
      departureTime: "00:00",
      from: "",
      to: "",
      passengerComposition: "",
      agentComments: "",
      sum: 0,
    } as TransferCardFields);
  };

  const addFlight = () => {
    append({
      id: uuidv4(),
      type: "flight",
      flightDescription: "",
      departureDate: new Date(),
      arrivalDate: new Date(),
      flightNumber: "",
      airline: "",
      departureAirport: "",
      arrivalAirport: "",
      stopsNumber: 0,
      stopoverAirport1: "",
      stopoverAirport2: "",
      stopoverAirport3: "",
      stopover1Time: "00:00",
      stopover2Time: "00:00",
      stopover3Time: "00:00",
      flightTime: "00:00",
      landingTime: "00:00",

      numberOfAdults: 0,
      numberOfChildren: 0,
      numberOfBabies: 0,
      priceForAdult: 0,
      priceForChild: 0,
      priceForBaby: 0,
      currency: "",
      agentComments: "",
      sum: 0,
    } as FlightCardFields);
  };

  const addImageComponent = () => {
    const selectedImage = SeparatorUrls.find(
      (image) => image.url === selectedImageUrl
    );
    append({
      id: uuidv4(),
      type: "image",
      imageUrl: selectedImageUrl,
      description: selectedImage ? selectedImage.description : "",
    });
  };

 const calculateTotalSum = () => {
   const formData = form.getValues();

   // Accumulate the total sum only from items that have the sum property
   const totalSum = formData.items.reduce((acc, item) => {
     // Check if the item has the "sum" property
     if ("sum" in item && typeof item.sum === "number") {
       return acc + item.sum;
     }
     return acc;
   }, 0);

   return totalSum;
 };


  const { createForm, isLoading, isSuccess, error } = useCreateMainBidForm();
  const { data } = useGetMainBidForms();

  const handleSumbmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = form.getValues();

     const totalSum = calculateTotalSum();

    const formExist = data?.some((form) => form.formName === formData.formName);

    if (formExist) {
      console.error(
        `A form with the name ${formData.formName} is already exist`
      );
      toast.error(`כבר קיימת במערכת "${formData.formName}" הצאה עם השם`);
      return;
    }

    const { holidayStartDate, formName } = formData;
    if (!holidayStartDate || !formName) {
      console.error(`Need to choose holiday start date`);
      toast.error("חייב לבחור שם ההצעה ותאריך תחילת החופשה");
      return;
    }

    // Generate a random number between 100 and 1000
    // const randomNumber = Math.floor(Math.random() * 999) + 2001;

    const hotelDataArray = formData.items.map((item, index) => {
      if (item.type === "hotel") {
        const hotelDataEntry = hotelData[index];
        if (hotelDataEntry) {
          return {
            ...item,
            hotelName: hotelDataEntry.selectedHotel?.hotelName,
            hotelDescription: hotelDataEntry.selectedHotel?.hotelDescription,
            stars: hotelDataEntry.selectedHotel?.stars,
            images: hotelDataEntry.selectedHotel?.images,

            rooms: hotelDataEntry.selectedRooms.map((room) => ({
              roomType: room.roomType,
              roomDescription: room.roomDescription,
              images: room.images,
              nightPrice: room.nightPrice,
              numberOfRooms: room.numberOfRooms,
            })),
          };
        }
      }
      return item;
    });

    const idArray = formData.items.map((item) => item.id);

    const payload = {
      formName: formData.formName,
      holidayStartDate: formData.holidayStartDate,
      isBidApproved: formData.isBidApproved,
      totalSum: totalSum,
      showSum: formData.showSum,
      currency: formData.currency,

      hotel: hotelDataArray.filter((item) => item.type === "hotel") || [],
      transfer: formData.items.filter((item) => item.type === "transfer") || [],
      flight: formData.items.filter((item) => item.type === "flight") || [],
      image: formData.items.filter((item) => item.type === "image") || [],
      idArray,
    };
    // console.log("payload", payload);
    createForm(payload); 
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Form updated");
    }
    if (error) {
      toast.error("Failed to update form");
    }
  }, [isSuccess, error]);

  // console.log("items",form.getValues());

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSumbmit}>
        <div dir="rtl" className="flex flex-col gap-4 mb-4">
          <div className="flex justify-start gap-2">
            <label htmlFor="formName">שם ההצעה:</label>
            <input
              dir="rtl"
              id={"formName"}
              className="border text-center border-black w-64"
              {...form.register("formName")}
            />
          </div>

          <div className="flex justify-start items-center gap-2">
            <label className="mb-2">תאריך תחילת החופשה:</label>
            <Controller
              name="holidayStartDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="בחרו תאריך"
                  className="border border-black p-1 text-center w-full"
                />
              )}
            />
          </div>

          <div className="flex justify-start items-center gap-2 ">
            <label>האם ההצעה מאושרת?</label>
            <select
              {...form.register("isBidApproved")}
              className="border border-black p-1"
            >
              <option value="false">לא</option>
              <option value="true">כן</option>
            </select>
          </div>
          <div className="flex justify-start items-center gap-2 ">
            <label>להציג מחיר סופי?</label>
            <select
              {...form.register("showSum")}
              className="border border-black p-1"
            >
              <option value="false">לא</option>
              <option value="true">כן</option>
            </select>
          </div>
          <div className="flex justify-start gap-2">
            <label htmlFor="formName">מטבע</label>
            <input
              dir="rtl"
              id={"currency"}
              className="border text-center border-black w-20"
              {...form.register("currency")}
            />
          </div>
        </div>

        <SortableList
          fields={fields}
          move={move}
          handleHotelRemove={handleHotelRemove}
          handleHotelDataChange={handleHotelDataChange}
          remove={remove}
        />

        <FormActions
          addHotel={addHotel}
          addTransfer={addTransfer}
          addFlight={addFlight}
          addImageComponent={addImageComponent}
          selectedImageUrl={selectedImageUrl}
          setSelectedImageUrl={setSelectedImageUrl}
        />

        <div className="space-x-8 mt-10">
          <button
            type="submit"
            className="bg-green-300 rounded hover:bg-green-500 p-2"
          >
            {isLoading ? "Submitting..." : "שמור"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MainBidForm;
