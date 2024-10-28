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
  ImageComponent,
  FormFields,
} from "../../../types/types";

import { useUpdateMainForm } from "@/api/MainFormApi";
import { formSchema } from "../../mainBidForm/ZodSchema";
import { SeparatorUrls } from "@/config/separatorUrls";
import SortableList_Update from "./SortableList_update";
import FormActions_Update from "./FormActions_update";
import { MainBidServerResponse } from "@/types/mainBidFormResponse";
import DatePicker from "react-datepicker";

interface MainBidForm_UpdateProps {
  formToUpdate: MainBidServerResponse[];
}

const MainBidForm_Update: React.FC<MainBidForm_UpdateProps> = ({
  formToUpdate,
}) => {
  const transformFormToUpdate = (data: MainBidServerResponse[]): FormFields => {
    const firstResponse = data[0];

    // Step 1: Create a map of items by their IDs
    const itemMap: { [key: string]: FormFields["items"][0] } = {};

    firstResponse.hotel.forEach((hotel) => {
      itemMap[hotel.id] = {
        ...hotel,
        type: "hotel",
        checkInDate: new Date(hotel.checkInDate),
        checkOutDate: new Date(hotel.checkOutDate),
        rooms: hotel.rooms.map((room) => ({
          ...room,
          id: room._id || uuidv4(),
        })),
      } as HotelCardFields;
    });

    firstResponse.transfer.forEach((transfer) => {
      itemMap[transfer.id] = {
        ...transfer,
        type: "transfer",
        transferDate: new Date(transfer.transferDate),
      } as TransferCardFields;
    });

    firstResponse.flight.forEach((flight) => {
      itemMap[flight.id] = {
        ...flight,
        type: "flight",
        departureDate: new Date(flight.departureDate),
        arrivalDate: new Date(flight.arrivalDate),
      } as FlightCardFields;
    });

    firstResponse.image.forEach((image) => {
      itemMap[image.id] = {
        ...image,
        type: "image",
      } as ImageComponent;
    });

    // Step 2: Sort items according to the idArray
    const sortedItems = firstResponse.idArray.map((id) => itemMap[id]);

    // Step 3: Return the sorted items in the form structure
    return {
      idArray: data[0].idArray,
      formName: firstResponse.formName,
      holidayStartDate: new Date(firstResponse.holidayStartDate),
      isBidApproved: firstResponse.isBidApproved,
      fakeCountNumber: firstResponse.fakeCountNumber,
      totalSum: firstResponse.totalSum,
      showSum: firstResponse.showSum,
      currency: firstResponse.currency,
      items: sortedItems,
    };
  };

  const sortedFormToUpdate = transformFormToUpdate(formToUpdate);

  // console.log("sortedFormToUpdate", sortedFormToUpdate.items);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: sortedFormToUpdate,
  });

  const { control } = form;

  const [selectedImageUrl, setSelectedImageUrl] = useState(
    SeparatorUrls[0].url
  );

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const initialHotelData = sortedFormToUpdate.items.map((item) => {
    if (item.type === "hotel") {
      return {
        selectedHotel: {
          id: item.id,
          type: item.type,
          hotelName: item.hotelName,
          hotelDescription: item.hotelDescription,
          stars: item.stars,
          images: item.images,
          rooms: item.rooms,
        },
        selectedRooms: item.rooms,
      };
    }
    return {
      selectedHotel: null,
      selectedRooms: [],
    };
  });

  const [hotelData, setHotelData] =
    useState<{ selectedHotel: Hotel | null; selectedRooms: Room[] }[]>(
      initialHotelData
    );
  // console.log("hotelData---mainForm_update", hotelData);

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

  const { updateMainForm, isLoading, isSuccess, error } = useUpdateMainForm();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = form.getValues();

    const totalSum = calculateTotalSum();

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

    const updateData = {
      id: formToUpdate[0]._id,
      updateFormData: payload,
    };
    updateMainForm(updateData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Form updated");
    }
    if (error) {
      toast.error("Failed to update form");
    }
  }, [isSuccess, error]);

  // console.log("items", form.getValues().items);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
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

        <SortableList_Update
          fields={fields}
          move={move}
          handleHotelRemove={handleHotelRemove}
          handleHotelDataChange={handleHotelDataChange}
          remove={remove}
          sortedFormToUpdate={sortedFormToUpdate}
          control={control}
        />

        <FormActions_Update
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

export default MainBidForm_Update;
