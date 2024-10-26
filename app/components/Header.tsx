import Link from "next/link";

export function Header() {
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
                href="/booking"
                className="text-gray-600 hover:text-gray-900">
                Đặt vé
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
