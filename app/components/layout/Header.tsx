'use client'
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import ClientOnlyButtonLogout from "./ClientOnlyButtonLogout";
import { useUser } from "@/contexts/UserContext";

export function Header() {
  const { isLoggedIn, profile } = useUser();
  console.log("Header isLoggedIn", isLoggedIn);
  console.log("Header profile", profile);

  return (
    <header className="bg-white shadow-md">
      <div className="container-custom mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          klook
        </Link>
        <nav>
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="text-gray-600 hover:text-gray-900">
                Tìm kiếm
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="text-gray-600 hover:text-gray-900">
                Đặt vé
              </Link>
            </li>
            <li>

              {isLoggedIn && profile ? (
                <Link href="/auth/Profile" className="text-gray-600">Xin chào, {profile.firstName}!</Link>
              ) : (
                <Link
                  href="/auth"
                  className="text-gray-600 hover:text-gray-900 ">
                  <FaUser size={"22px"} className="" />
                </Link>
              )}

            </li>
            <li>
              <ClientOnlyButtonLogout />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
