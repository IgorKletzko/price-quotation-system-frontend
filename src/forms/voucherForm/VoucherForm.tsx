// VoucherForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { voucherSchema, VoucherData } from "./zodSchema";
import { generateVoucher } from "../../api/voucherGeneratorApi";

const VoucherForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VoucherData>({
    resolver: zodResolver(voucherSchema),
  });

  const onSubmit = async (data: VoucherData) => {
    await generateVoucher(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Generate Booking Voucher
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Booking Date
        </label>
        <input
          type="date"
          {...register("bookingDate")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.bookingDate && (
          <p className="text-red-600 text-sm">{errors.bookingDate.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Reservation No
        </label>
        <input
          type="text"
          {...register("reservationNo")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.reservationNo && (
          <p className="text-red-600 text-sm">{errors.reservationNo.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          type="text"
          {...register("customerName")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.customerName && (
          <p className="text-red-600 text-sm">{errors.customerName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Destination
        </label>
        <input
          type="text"
          {...register("destination")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.destination && (
          <p className="text-red-600 text-sm">{errors.destination.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Supplier Name
        </label>
        <input
          type="text"
          {...register("supplierName")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.supplierName && (
          <p className="text-red-600 text-sm">{errors.supplierName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          {...register("address")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          {...register("phone")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Download Voucher PDF
      </button>
    </form>
  );
};

export default VoucherForm;
