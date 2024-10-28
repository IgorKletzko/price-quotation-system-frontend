// import { Images } from "@/types/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useUploadImages = () => {
//   const { getAccessTokenSilently } = useAuth0();
//   const createUploadImagesRequest = async (
//     imagesFormData: FormData
//   ): Promise<Images> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/images`, {
//       method: "POST",
//       body: imagesFormData,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw Error("Failed to upload images");
//     }

//     return response.json();
//   };

//   const {
//     mutate: uploadImages,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(createUploadImagesRequest);

//   return {
//     uploadImages,
//     isLoading,
//     isSuccess,
//     error,
//   };
// };

// export const useGetImages = (id: string) => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getImageRequest = async (): Promise<Images> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/images${id}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response) {
//       throw new Error("Failed to get images");
//     }
//     return response.json();
//   };

//   const { data: images, isLoading } = useQuery(
//     "fetchMyImages",
//     getImageRequest
//   );

//   return {
//     images,
//     isLoading,
//   };
// };

// export const useDeleteImages = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const deleteImagesRequest = async (id: string) => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/images`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({ id }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText || "Failed to delete images");
//     }

//     return response.json();
//   };

//   const {
//     mutate: deleteImages,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(deleteImagesRequest);

//   return {
//     deleteImages,
//     isLoading,
//     isSuccess,
//     error,
//   };
// };
