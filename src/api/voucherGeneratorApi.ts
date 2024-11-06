// pdfService.ts
import { VoucherData } from "../forms/voucherForm/zodSchema";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const generateVoucher = async (data: VoucherData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/voucher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to generate voucher PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "voucher.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error generating voucher PDF:", error);
  }
};
