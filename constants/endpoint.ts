export const PARAMS = {
  SEARCH: ":slug",
  BILLING: ":id",
  SHOW: ":id",
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "",
    REGISTER: "",
    PROFILE: "",
  },
  TRAIN: {
    LIST: "/train/anonymous/get-all",
    DETAIL: `/train/${PARAMS.SEARCH}`,
  },
  SCHEDULE: {
    GET_BY_INFO: "schedule/anonymous/get-by-departure-and-arrival",
  },
  STATION: {
    LIST: "/station/anonymous/get-all",
    DETAIL: "",
  },
  SHOW: {
    SEAT: `/showtimes/${PARAMS.SHOW}/seats`,
  },
};

export const endpoint = (url: string, ids: any) => {
  let endpoint = url;

  for (const key in ids) {
    endpoint = url.replace(
      `${PARAMS[key as keyof typeof PARAMS]}`,
      ids[key as keyof typeof ids]
    );
  }

  return endpoint;
};
