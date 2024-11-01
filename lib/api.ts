import { resolve } from "path";
import { env } from "../env.mjs";
import { notFound } from "next/navigation";

const ContentType = {
  json: "application/json",
  stream: "text/event-stream",
  audio: "audio/mpeg",
  form: "application/x-www-form-urlencoded; charset=UTF-8",
  download: "application/octet-stream", // for download
  upload: "multipart/form-data", // for upload
};

const baseOptions = {
  method: "GET",
  mode: "cors",
  // credentials: 'include',
  headers: new Headers({
    "Content-type": ContentType.json,
  }),
  redirect: "follow",
};

type FetchOptionType = Omit<RequestInit, "body"> & {
  params?: Record<string, any>;
  body?: BodyInit | Record<string, any> | any;
};

type IOtherOptions = {
  isPublicApi?: boolean;
};

const TIME_OUT = 100000;

const baseFetch = <T>(
  url: string,
  fetchOptions: FetchOptionType,
  { isPublicApi = false }: IOtherOptions
): Promise<T> => {
  const options: typeof baseOptions & FetchOptionType = Object.assign(
    {},
    baseOptions,
    fetchOptions
  );
  const urlPrefix = env.NEXT_PUBLIC_RAILWAYS_API_URL;
  let urlWithPrefix = `${urlPrefix}${url.startsWith("/") ? url : `/${url}`}`;

  const { method, params, body } = options;

  if (method === "GET" && params) {
    const paramArray: string[] = [];
    Object.keys(params).forEach((key) => {
      paramArray.push(`${key}=${encodeURIComponent(params[key])}`);
    });

    if (urlWithPrefix.search(/\?/) === -1)
      urlWithPrefix += `?${paramArray.join("&")}`;
    else urlWithPrefix += `&${paramArray.join("&")}`;

    delete options.params;
  }
  console.log(urlWithPrefix);

  if (body) options.body = JSON.stringify(body);

  return Promise.race([
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("request timeout"));
      }, TIME_OUT);
    }),
    new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(urlWithPrefix, {
          cache: "no-cache",
          ...options,
        } as RequestInit);
        switch (response.status) {
          case 404:
            notFound();
        }

        if (response.status === 204) {
          resolve({ result: "success" });
          return;
        }

        resolve(response.json());
      } catch (error) {
        reject(error);
      }
    }),
  ]) as Promise<T>;
};

const request = <T>(
  url: string,
  fetchOptions: FetchOptionType = {},
  otherOptions?: IOtherOptions
) => {
  return baseFetch<T>(url, fetchOptions, otherOptions || {});
};

export const get = <T>(
  url: string,
  options?: FetchOptionType,
  others?: IOtherOptions
) => {
  return request<T>(url, options, others);
};

export const getPublic = <T>(
  url: string,
  options?: FetchOptionType,
  others?: IOtherOptions
) => {
  return get<T>(url, options, { isPublicApi: true, ...others });
};

export const post = <T>(
  url: string,
  options?: FetchOptionType,
  others?: IOtherOptions
) => {
  return request<T>(url, { method: "POST", ...options }, others);
};

export const put = <T>(
  url: string,
  options?: FetchOptionType,
  others?: IOtherOptions
) => {
  return request<T>(url, { method: "PUT", ...options }, others);
};

export const patch = <T>(
  url: string,
  options?: FetchOptionType,
  others?: IOtherOptions
) => {
  return request<T>(url, { method: "PATCH", ...options }, others);
};

export const del = <T>(
  url: string,
  options?: FetchOptionType,
  others?: IOtherOptions
) => {
  return request<T>(url, { method: "DELETE", ...options }, others);
};
