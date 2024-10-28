import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import SmallCarousel from "./SmallCarousel";
import RemoveButton from "./RemoveButton";
import { useDeleteImage } from "@/api/imageUploadApi";

interface Props {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  showImages?: boolean;
}

const UploadImagesInput: React.FC<Props> = ({
  showImages,
  imageUrls,
  setImageUrls,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputKey, setInputKey] = useState(Date.now());
  const { deleteImage } = useDeleteImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const updatedImages = [...imageUrls];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;
          updatedImages.push(base64String);

          // Update the state and localStorage after all files are processed
          if (updatedImages.length === imageUrls.length + files.length) {
            setImageUrls(updatedImages);
            localStorage.setItem("images", JSON.stringify(updatedImages));
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImages = () => {
    setInputKey(Date.now());

    const cloudinaryUrls = imageUrls.filter((url) =>
      url.includes("cloudinary.com")
    );

    Promise.all(cloudinaryUrls.map((url) => deleteImage(url)))
      .then(() => {
        setImageUrls([]);
        setInputKey(Date.now());
      })
      .catch((error) => {
        console.error("Error deleting images:", error);
      });
  };

  return (
    <div className="mt-4">
      {showImages && (
        <div className="flex justify-center">
          <div className="w-[280px] sm:w-[400px] md:w-[550px] lg:w-[800px] xl:w-[1100px] mb-8">
            <SmallCarousel
              images={imageUrls}
              slidesToShow={imageUrls.length > 2 ? 3 : 1}
              responsive={[
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ]}
            />
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <p>({imageUrls.length} תמונות)</p>
      </div>
      <div className="flex justify-center">
        <Input
          type="file"
          ref={fileInputRef}
          key={inputKey}
          multiple
          onChange={handleFileChange}
          className="flex justify-center w-[150px] sm:w-full"
        />
      </div>
      <div className="flex justify-center mt-4">
        <RemoveButton onRemove={handleDeleteImages} text="מחק תמונות" />
      </div>
    </div>
  );
};

export default UploadImagesInput;
