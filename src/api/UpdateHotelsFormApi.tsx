import { HotelFormData } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateHotel = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateHotelRequest = async (
    id: string,
    updatedHotelData: HotelFormData
  ) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/hotels-update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedHotelData),
    });

    if (!response.ok) {
      throw new Error("Failed to update hotel");
    }

    return response.json();
  };

  const {
    mutate: updateHotel,
    isLoading,
    isSuccess,
    error,
  } = useMutation(
    (data: { hotelId: string; updatedHotelData: HotelFormData }) =>
      updateHotelRequest(data.hotelId, data.updatedHotelData)
  );

  return {
    updateHotel,
    isLoading,
    isSuccess,
    error,
  };
};

type Props = {
  id: string;
  roomImageUrls?: string[];
  hotelImageUrls?: string[];
};

export const useDeleteSelectedHotelImages = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteSelectedHotelImagesRequest = async ({
    id,
    roomImageUrls,
    hotelImageUrls,
  }: Props) => {
    const accessToken = await getAccessTokenSilently();

    const requestBody = {
      id,
      roomImageUrls,
      hotelImageUrls,
    };

    const response = await fetch(`${API_BASE_URL}/api/hotels-update`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete selected images");
    }

    return response.json();
  };

  const {
    mutate: deleteSelectedHotelImages,
    isLoading,
    isSuccess,
    error,
  } = useMutation(deleteSelectedHotelImagesRequest);

  return {
    deleteSelectedHotelImages,
    isLoading,
    isSuccess,
    error,
  };
};
