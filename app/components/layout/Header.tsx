import Link from "next/link";

export function Header() {
  const { name } = { name: "cost" };
  return (
    <header className="bg-white shadow-md">
      <div className="container-custom mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          klook
        </Link>
        <nav>
          <ul className="flex space-x-4">
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
                href="/booking-information"
                className="text-gray-600 hover:text-gray-900">
                Tìm vé
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="text-gray-600 hover:text-gray-900">
                Đặt vé
              </Link>
            </li>
            <li className="text-gray-600 flex gap-1">
              <Link
                href="/booking"
                className="text-gray-600 hover:text-gray-900">
                Đăng ký
              </Link>
              /
              <Link
                href="/booking"
                className="text-gray-600 hover:text-gray-900">
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900">
                {name}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
