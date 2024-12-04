import {
  AnotherPlaceError,
  AuthorizationError,
  EntityError,
  HttpError,
  LockerError,
  SamePasswordError,
} from "@/lib/http";
import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { toast } from "@/hooks/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>; // Sử dụng để gán lỗi vào form nếu cần
  duration?: number; // Thời gian hiển thị thông báo lỗi
}) => {
  // Trường hợp lỗi từ server trả về và có `errors` (dùng cho React Hook Form)
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
    return;
  }

  // Lỗi đăng nhập sai thông tin
  if (error instanceof AuthorizationError) {
    toast({
      title: "Lỗi đăng nhập",
      description:
        error.payload.errorDescription || "Thông tin đăng nhập không hợp lệ.",
      variant: "destructive",
      duration: duration ?? 5000,
    });
    return;
  }

  // Lỗi tài khoản bị khóa
  if (error instanceof LockerError) {
    toast({
      title: "Tài khoản bị khóa",
      description: "Tài khoản của bạn đã bị khóa do nhập sai quá nhiều lần.",
      variant: "destructive",
      duration: duration ?? 5000,
    });
    return;
  }

  // Lỗi đăng nhập từ nơi khác
  if (error instanceof AnotherPlaceError) {
    toast({
      title: "Tài khoản đang được sử dụng",
      description: "Tài khoản của bạn đã được đăng nhập ở một nơi khác.",
      variant: "destructive",
      duration: duration ?? 5000,
    });
    return;
  }

  // Lỗi HTTP khác
  if (error instanceof HttpError) {
    toast({
      title: "Lỗi hệ thống",
      description:
        error.payload.description || "Đã xảy ra lỗi, vui lòng thử lại.",
      variant: "destructive",
      duration: duration ?? 5000,
    });
    return;
  }

  // Trường hợp không xác định hoặc lỗi không xử lý được
  toast({
    title: "Lỗi không xác định",
    description: "Đã xảy ra lỗi không xác định, vui lòng thử lại.",
    variant: "destructive",
    duration: duration ?? 5000,
  });
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};
export const handleErrorSamePassApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>; // Sử dụng để gán lỗi vào form nếu cần
  duration?: number; // Thời gian hiển thị thông báo lỗi
}) => {
  // Lỗi mật khẩu mới trùng với mật khẩu cũ
  if (error instanceof SamePasswordError) {
    toast({
      title: "Lỗi mật khẩu",
      description: "Mật khẩu mới không được trùng với mật khẩu cũ.",
      variant: "destructive",
      duration: duration ?? 5000,
    });
    return;
  }

  // Trường hợp không xác định hoặc lỗi không xử lý được
  toast({
    title: "Lỗi không xác định",
    description: "Đã xảy ra lỗi không xác định, vui lòng thử lại.",
    variant: "destructive",
    duration: duration ?? 5000,
  });
};
