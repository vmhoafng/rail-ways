// app/error.tsx

"use client"; // Đảm bảo rằng file này chạy trên client

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error; // Tham số lỗi
  reset: () => void; // Hàm để làm mới
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error); // Log lỗi để theo dõi
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center p-8">
      <h1 className="text-6xl font-bold text-slate-900 mb-4">Oops!</h1>
      <p className="text-lg text-slate-700 mb-6">
        Sorry, something went wrong. Please try again later.
      </p>
      <button
        onClick={reset} // Thử lại
        className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition">
        Retry
      </button>
      <Link href="/" className="mt-4 px-8 py-3 text-blue-600 underline">
        Go back to Home
      </Link>
    </div>
  );
}
