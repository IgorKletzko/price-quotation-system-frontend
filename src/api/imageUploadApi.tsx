import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const uploadPreset = import.meta.env.VITE_uploadPreset;
const cloudName = import.meta.env.VITE_cloudName;


const folderName = "Hotels"
  export const uploadImages = async (image: File)=> {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folderName); // specify the folder here

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      toast.error("Failed to upload image.");
      throw new Error("Failed to upload images");
    }

    const data = await response.json();
    toast.success("Image uploaded successfully!");
    return data.secure_url;
  }









export const useDeleteImage = () => {

  const {getAccessTokenSilently} = useAuth0()
  const deleteImageRequest = async (url: string) => {
    
    const accessToken = await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/delete-image`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url, folder: folderName }),
    });

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || "Failed to delete images")
    }

    return response.json()
  };
  const {
    mutate: deleteImage,
    isLoading,
    isSuccess,

  } = useMutation(deleteImageRequest);



  return {
    deleteImage,
    isLoading,
    isSuccess,
  };
};
