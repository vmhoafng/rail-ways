export interface LoginResponse {
  status?: number;
  message?: string;
  result?: {
    accessToken?: string;
    refreshToken: {
      name: string;
      value: string;
    };
    profile: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password?: string;
    };
  };
}
export interface CookieType extends LoginResponse {
  super(accessToken: string, refreshToken: string): void;
  token: string;
  expiresAt: string;
}
export interface RegisterResponse {
  error?: string;
  message?: string;
  result?: {
    id: number;
    email: string;
    phone: string;
    address?: string;
  };
}
export interface LoginBodyType {
  email: string;
  password: string;
}
export interface RegisterBodyType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
export interface AuthBodyType {
  accessToken?: string;
  refreshToken?: {
    name: string;
    value: string;
  };
  profile?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    password?: string;
  };
}
export interface AuthResponse {
  error?: string;
  message?: string;
  result?: {
    accessToken: string;
    refreshToken: {
      name: string;
      value: string;
    };
    profile: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address?: string;
      password?: string;
    };
  };
}
export interface AccessToken {
  accessToken: string;
}
export interface AuthHeaderRefreshToken {
  accessToken: string;
}
export interface AuthResponseRefreshToken {
  accessToken: string;
  refreshToken: {
    name: string;
    value: string;
  };
}
export interface VerifyTokenBodyType {
  email: string;
  token: number;
}
export interface VerifyTokenResponse {
  error?: string;
  message?: string;
  result?: {
    email: string;
    token: number;
  };
}
export interface UpdateProfileBodyType {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  oldPassword?: string;
}

export interface UpdateProfileResponse {
  errorDescription: string;
  code: number;
  error: string;
  validationErrors: null;
}
export interface AuthProfileResponse {
  result: {
    accessToken: string;
    profile: {
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      password: string;
    };
  };
}

// Interface cho một chỗ ngồi (Seat)
export interface Seat {
  id: number;
  seatNumber: string;
  isAvailable: boolean;
  price: number;
}

// Interface cho toa tàu (Railcar)
export interface Railcar {
  railcarName: string;
  totalSeat: number;
  totalSeatAvailable: number;
  railcarType: string;
  seats: Seat[];
}

// Interface cho một chuyến tàu (Train)
export interface Train {
  id: number;
  departureStationId: number;
  arrivalStationId: number;
  departureStationName: string;
  arrivalStationName: string;
  departureTime: string;
  arrivalTime: string;
  trainName: string;
  railcars: Railcar[];
}

// Interface tổng quát cho phản hồi API
export interface GetScheduleResponse {
  message: string[];
  status: number;
  result: any;
}

export interface createTrainBodyType {
  trainName: string;
  trainNumber: string;
  trainType: string;
  currentStationId: number;
}
export interface createTrainResponse {
  message: string[];
  status: number;
  result: {
    trainName: string;
    trainNumber: string;
    trainType: string;
    currentStationId: number;
  };
}
export interface createRouteBodyType {
  name: string;
  stationIds: number[];
}
export interface createRouteResponse {
  message: string[];
  status: number;
  result: {
    name: string;
    stationIds: number[];
  };
}
export interface createStationBodyType {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
}
export interface createStationResponse {
  message: string[];
  status: number;
  result: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
    };
  };
}
export interface getAllTicketsResponse {
  message: string[];
  status: number;
  result: {
    departureStationName: string;
    arrivalStationName: string;
    departureTime: string;
    seatNumber: string[];
    price: number;
    trainName: string;
  }[];
}
export interface updateUserBodyType {
  email: string;
  password: string;
  oldPassword: string;
}
export interface deleteUserBodyType {
  username: string;
  password: string;
  deleeteUserId: number;
}
export interface createRailCarBodyType {
  name: string;
  railcarType: string;
  capacity: number;
  seatPerRow: number;
  isHaveFloor: boolean;
}
export interface createRailCarResponse {
  message: string[];
  status: number;
  result: {
    name: string;
    railcarType: string;
    capacity: number;
    seatPerRow: number;
    isHaveFloor: boolean;
  };
}
export interface Station {
  id: number;
  name: string;
  address: string;
}
[];

export interface getAllResponse {
  message: string[];
  status: number;
  result: Station[];
}

export interface TrainBasicInfo {
  trainName: string;
  trainNumber: string;
  trainType: string;
  currentStationId: number;
}

export interface GetAllTrainBasicResponse {
  message: string[];
  status: number;
  result: TrainBasicInfo[];
}
export interface GetAllRailCarResponse {
  message: string[];
  status: number;
  result: {
    name: string;
    railcarType: string;
    capacity: number;
    seatPerRow: number;
    isHaveFloor: boolean;
  }[];
}
export interface getAllStationsResponse {
  message: string[];
  status: number;
  result: Station[];
}
export interface getAllUsersResponse {
  message: string[];
  status: number;
  result: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    createdDate: string;
    roleName: string[];
  }[];
}
export interface getUserByIdResponse {
  message: string[];
  status: number;
  result: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    createdDate: string;
    roleName: string[];
  };
}
export interface deleteUserResponse {
  message: string[];
  status: number;
  result: {};
}
