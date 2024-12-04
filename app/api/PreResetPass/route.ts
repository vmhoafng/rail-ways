import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { message: "Email không hợp lệ" },
      { status: 400 }
    );
  }

  // Giả lập gửi email
  const resetLink = `http://localhost:3000/auth/reset-password?id=566223645`; // Giả định ID là cố định
  console.log(`Gửi link đặt lại mật khẩu tới: ${email}`);
  console.log(`Link đặt lại mật khẩu: ${resetLink}`);

  return NextResponse.json({
    message: "Đã gửi email đặt lại mật khẩu.",
  });
}
