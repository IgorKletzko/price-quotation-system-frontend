import ConfirmationModal from "@/components/ConfirmationModal";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ImageSeparatorCard {
  id: string;
  index: number;
  imageUrl: string;
  imageText: string;
  onRemove: (index: number) => void;
}

const ImageSeparatorCard: React.FC<ImageSeparatorCard> = ({
  id,
  index,
  imageUrl,
  imageText,
  onRemove,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = () => {
    onRemove(index);
    setShowModal(false);
  };

  return (
    <div
      key={id}
      className="relative"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onPointerDown={(e) => {
        if (
          e.target instanceof HTMLElement &&
          (e.target.tagName === "BUTTON" ||
            e.target.tagName === "INPUT" ||
            e.target.tagName === "SELECT" ||
            e.target.tagName === "TEXTAREA" ||
            e.target.tagName === "DIV" ||
            e.target.tagName === "H2" ||
            e.target.tagName === "SPAN")
        ) {
          e.stopPropagation();
        }
      }}
    >
      <img src={imageUrl} alt="Selected" className="relative h-36" />

      <div
        dir="rtl"
        ext-white
        text-xl
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30"
      >
        <p className="flex justify-center text-white font-semibold text-4xl">
          {imageText}
        </p>
        {/* <div>
          <p className="flex justify-center text-white font-semibold text-4xl">
            {imageText}
          </p>

          <div className="flex flex-col-reverse md:flex-row">
            <div className="flex flex-row-reverse justify-start items-center gap-2">
              <Controller
                // name="start"
                name={`items.${index}.start`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date);
                    }}

                    dateFormat="dd/MM/yyyy"
                    placeholderText="מהתאריך"
                    className="border border-black p-1 text-center w-full"
                  />
                )}
              />
            </div>
            <p>_</p>

            <div className="flex flex-row-reverse justify-start items-center gap-2">
              <Controller
                // name="end"
                name={`items.${index}.end`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
      
                    dateFormat="dd/MM/yyyy"
                    placeholderText="עד התאריך"
                    className="border border-black p-1 text-center w-full"
                  />
                )}
              />
            </div>
          </div>
        </div> */}
      </div>

      <button
        className="bg-red-400 hover:bg-red-500 p-1 rounded-md absolute sm:top-4 sm:left-12 top-2 left-8 sm:text-md text-xs"
        type="button"
        onClick={handleDelete}
      >
        Remove
      </button>
      <ConfirmationModal
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default ImageSeparatorCard;
