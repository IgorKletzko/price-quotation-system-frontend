

import { Hotel, HotelFormData } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateHotel = () => {
  const {getAccessTokenSilently} = useAuth0()
  const createHotelRequest = async (hotelFormData: HotelFormData) => {
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(hotelFormData),
    });

    if (!response.ok) {
      throw Error("Failed to create hotel");
    }

    return response.json();
  };

  const {
    mutate: createHotel,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createHotelRequest);

  return {
    createHotel,
    isLoading,
    isSuccess,
    error,
  };
};





export const useGetHotels = () => {
  const {getAccessTokenSilently} = useAuth0()
  const getHotelsRequest = async (): Promise<Hotel[]> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get Hotels");
    }

    return response.json();
  };

  const {
    data: hotels,
    isLoading,
    isSuccess,
    error,
  } = useQuery("getHotels", getHotelsRequest);

  return {
    hotels,
    isLoading,
    isSuccess,
    error,
  };
};



const folderName = "Hotels";

export const useDeleteHotel = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteHotelRequest = async (hotelName: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ hotelName, folder: folderName }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete hotel");
    }

    return response.json();
  };

  const {
    mutate: deleteHotel,
    isLoading,
    isSuccess,
    error,
  } = useMutation(deleteHotelRequest);

  return {
    deleteHotel,
    isLoading,
    isSuccess,
    error,
  };
};



