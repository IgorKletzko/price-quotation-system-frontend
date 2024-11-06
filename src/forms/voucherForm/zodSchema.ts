import { z } from "zod";

export const voucherSchema = z.object({
  bookingDate: z.string().min(1, "Booking date is required"),
  reservationNo: z.string().min(1, "Reservation number is required"),
  customerName: z.string().min(1, "Customer name is required"),
  destination: z.string().min(1, "Destination is required"),
  supplierName: z.string().min(1, "Supplier name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
});

export type VoucherData = z.infer<typeof voucherSchema>;
