import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  formName: string; // Pass the name of the form being deleted
}

const ConfirmationModalForMainFormDelete: React.FC<ConfirmationModalProps> = ({
  show,
  onConfirm,
  onCancel,
  formName,
}) => {
  const [typedFormName, setTypedFormName] = useState(""); // Track the typed form name

  if (!show) return null;

  // Check if the typed form name matches the actual form name
  const isFormNameValid = typedFormName === formName;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded p-8">
        <h2 className="text-center text-xl mb-4">למחוק {formName}?</h2>
        <p className="mb-4 text-center">
          אנא הקלד את שם ההצעה למחיקה כדי לאשר:
          <strong> {formName} </strong>
        </p>
        <input
          type="text"
          value={typedFormName}
          onChange={(e) => setTypedFormName(e.target.value)}
          placeholder="הקלד שם הצעה"
          className="border w-full p-2 mb-4"
        />
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onCancel}
            className="bg-red-400 hover:bg-red-600 rounded px-5"
          >
            No
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!isFormNameValid} // Disable confirm button if form name doesn't match
            className={`${
              isFormNameValid
                ? "bg-green-400 hover:bg-green-600"
                : "bg-gray-400"
            } rounded px-4`}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModalForMainFormDelete;
