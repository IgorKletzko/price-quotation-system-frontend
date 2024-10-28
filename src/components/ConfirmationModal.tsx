import React from "react";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div dir="rtl" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-8">
        <h2 className="text-center text-xl mb-4">למחוק?</h2>
        <div className="flex gap-4">
          <Button
            onClick={onCancel}
            className="bg-red-400 hover:bg-red-600 rounded  px-5"
          >
            No
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-green-400 hover:bg-green-600 rounded px-4"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
