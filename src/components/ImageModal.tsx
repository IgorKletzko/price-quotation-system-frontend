import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose(); // close modal if the overlay (current target) was clicked
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white p-2 rounded-lg shadow-lg max-w-full max-h-full sm:max-w-4xl w-full sm:h-auto overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
        >
          X
        </button>

        {imageSrc && (
          <img
            src={imageSrc}
            alt=""
            className="object-cover max-h-[80vh] max-w-full h-auto w-auto"
          />
        )}
      </div>
    </div>
  );
};

export default ImageModal;
