import { MainBidServerResponse } from "@/types/mainBidFormResponse";
import { useMutation, useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMainBidForm = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMainBidFormRequest = async (formData: any): Promise<MainBidServerResponse> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/main-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update the mainForm");
    }
    return response.json();
  };

  const {
    mutateAsync: createForm,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMainBidFormRequest);

  return {
    createForm,
    isLoading,
    isSuccess,
    error,
  };
};

export const useGetMainBidForms = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMainBidFormsRequest = async (): Promise<MainBidServerResponse[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/main-form`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get forms");
    }

    return response.json();
  };

  const { data, isLoading, isSuccess, error, refetch} = useQuery(
    "getMainBidForms",
    getMainBidFormsRequest
  );

  return {
    data,
    isLoading,
    isSuccess,
    error,
    refetch
  };
};

export const useDeleteForm = () => {
  const { getAccessTokenSilently } = useAuth0();

  // Function to make the API request
  const deleteFormRequest = async (formId: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/main-form`, {
      method: "DELETE", // Use DELETE method
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ formId }), // Send formId in the body
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete form");
    }

    return response.json();
  };

  // Use React Query's useMutation hook for managing the request state
  const {
    mutate: deleteForm,
    isLoading,
    isSuccess,
    error,
  } = useMutation(deleteFormRequest);

  return {
    deleteForm,
    isLoading,
    isSuccess,
    error,
  };
};

export const useUpdateMainForm = () => {
  const updateMainFormRequest = async (
    id: string,
    updatedFormData: any
  ) => {

    const response = await fetch(`${API_BASE_URL}/api/main-form-update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to update form");
    }

    return response.json();
  };

  const {
    mutate: updateMainForm,
    isLoading,
    isSuccess,
    error,
  } = useMutation(
    ({ id, updateFormData }: { id: string; updateFormData: any }) =>
      updateMainFormRequest(id, updateFormData)
  );
  
  return {
    updateMainForm, 
    isLoading, 
    isSuccess, 
    error,
  }
};
