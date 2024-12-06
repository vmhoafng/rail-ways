type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};
const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;
const LOCKER_ERROR_STATUS = 423;
const ANOTHER_PLACE_ERROR_STATUS = 403;
const SAME_PASSWORD_ERROR_STATUS = 400;
type EntityErrorPayLoad = {
  message: string;
  errors: {
    field: string; // Sửa lỗi đánh máy từ 'feild' thành 'field'
    message: string;
  }[];
};
type LoginERROR = {
  errorDescription: string;
  code: number;
  error: string;
  validationErrors: null;
};

export class HttpError extends Error {
  status: number;
  payload: {
    description: string; // Sửa lỗi đánh máy từ 'desscription' thành 'description'
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("HTTP Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends Error {
  status: 422;
  payload: EntityErrorPayLoad;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayLoad;
  }) {
    super("Entity Error");
    this.status = status;
    this.payload = payload;
  }
}

export class AuthorizationError extends Error {
  status: 401;
  payload: LoginERROR;
  constructor({ status, payload }: { status: 401; payload: LoginERROR }) {
    super("Sai thông tin đăng nhập");
    this.status = status;
    this.payload = payload;
  }
}
export class SamePasswordError extends Error {
  status: 400;
  payload: LoginERROR;
  constructor({ status, payload }: { status: 400; payload: LoginERROR }) {
    super("Mật khẩu mới không được trùng với mật khẩu cũ");
    this.status = status;
    this.payload = payload;
  }
}
export class LockerError extends Error {
  status: 423;
  payload: LoginERROR;
  constructor({ status, payload }: { status: 423; payload: LoginERROR }) {
    super("Tài khoản bị khóa do đăng nhập sai quá nhiều lần");
    this.status = status;
    this.payload = payload;
  }
}

export class AnotherPlaceError extends Error {
  status: 403;
  payload: LoginERROR;
  constructor({ status, payload }: { status: 403; payload: LoginERROR }) {
    super("Tài khoản đang được đăng nhập ở một nơi khác");
    this.status = status;
    this.payload = payload;
  }
}

class AccessToken {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
}

export const clientAccessToken = new AccessToken();

export const isClient = () => typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: { [key: string]: string } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  // if (isClient()) {
  //   // Làm mới accessToken nếu cần
  //   const accessToken = await refreshAccessTokenIfNeeded();
  //   if (accessToken) {
  //     baseHeaders.Authorization = `Bearer ${accessToken}`;
  //   }
  // }

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
    credentials: "include", // Gửi cookie cùng yêu cầu
  });

  let payload: Response;
  try {
    payload = await res.json();
  } catch (error) {
    payload = {} as Response; // Xử lý khi không có JSON trả về
  }

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayLoad;
        }
      );
    } else if (res.status === LOCKER_ERROR_STATUS) {
      throw new LockerError(
        data as {
          status: 423;
          payload: LoginERROR;
        }
      );
    } else if (res.status === ANOTHER_PLACE_ERROR_STATUS) {
      throw new AnotherPlaceError(
        data as {
          status: 403;
          payload: LoginERROR;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      throw new AuthorizationError(
        data as {
          status: 401;
          payload: LoginERROR;
        }
      );
    } else if (res.status === SAME_PASSWORD_ERROR_STATUS) {
      throw new SamePasswordError(
        data as {
          status: 400;
          payload: LoginERROR;
        }
      );
    } else {
      throw new HttpError(data);
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
