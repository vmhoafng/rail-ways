"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookingInfoPage = () => {
  const [email, setEmail] = useState("");
  const [bookingCode, setBookingCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted", { email, bookingCode, phoneNumber });
  };

  return (
    <div className="container-custom p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Tra cứu thông tin đặt chỗ
      </h1>
      <h3 className="text-sm text-gray-600 mb-4 text-center">
        Để tra cứu thông tin, quý khách vui lòng nhập chính xác 3 thông tin bên
        dưới.
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@example.com"
          />
        </div>
        <div>
          <Label htmlFor="bookingCode">Mã đặt chỗ</Label>
          <Input
            type="text"
            id="bookingCode"
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value)}
            required
            placeholder="Nhập mã đặt chỗ"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Số điện thoại</Label>
          <Input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="0123456789"
          />
        </div>
        <Button type="submit" className="w-full">
          Tra cứu
        </Button>
      </form>
    </div>
  );
};

export default BookingInfoPage;
