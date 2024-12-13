"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import ClientOnlyButtonLogout from "../ClientOnlyButtonLogout";
import { useUser } from "@/contexts/UserContext";

export function Header() {
  const { isLoggedIn, profile, isAdministrator } = useUser();

  return (
    <header className="bg-white shadow-md">
      <div className="container-custom mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          klook
        </Link>
        <nav>
          {isAdministrator ? (
            <ul className="flex items-center justify-center gap-4">
              <li>
                <ClientOnlyButtonLogout />
              </li>
            </ul>
          ) : (
            <ul className="flex items-center justify-center gap-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-gray-900">
                  Tìm kiếm
                </Link>
              </li>
              <li>
                <Link href="/Booking" className="text-gray-600 hover:text-gray-900">
                  Đặt vé
                </Link>
              </li>
              {isLoggedIn && profile ? (
                <>
                  <li>
                    <Link href="/auth/Profile" className="text-gray-600">
                      Xin chào, {profile.firstName}!
                    </Link>
                  </li>
                  <li>
                    <Link href="/Booking/ticket-confirmed" className="text-gray-600 hover:text-gray-900">
                      Vé đã đặt
                    </Link>
                  </li>
                  <li>
                    <ClientOnlyButtonLogout />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/Booking/search-ticket"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Tìm kiếm vé
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FaUser size={"22px"} />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
