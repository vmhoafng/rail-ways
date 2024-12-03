// src/utils/handleApiError.ts
export const handleApiError = (error: any): string => {
    if (error.status) {
      switch (error.status) {
        case 400:
          return 'Yêu cầu không hợp lệ.';
        case 401:
          return 'Bạn không có quyền truy cập.';
        case 404:
          return 'Không tìm thấy tài nguyên.';
        case 500:
          return 'Lỗi hệ thống. Vui lòng thử lại sau.';
        default:
          return 'Đã xảy ra lỗi không xác định.';
      }
    }
    return 'Không thể kết nối tới server.';
  };
  