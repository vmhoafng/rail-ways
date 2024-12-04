import z from "zod";
export const LoginBody = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});
export type LoginBodyType = z.TypeOf<typeof LoginBody>;
export const LoginRes = z.object({
  status: z.number(),
  result: z.object({
    accessToken: z.string(),
    refreshToken: z.object({
      name: z.string(),
      value: z.string(),
    }),
    profile: z.object({
      id: z.number().optional(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phone: z.string(),
      address: z.string().optional(),
      password: z.string().optional(),
    }),
  }),
  message: z.string(),
});

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const LogoutRes = z.object({
  message: z.string(),
  status: z.number(),
});
export type LogoutResType = z.TypeOf<typeof LogoutRes>;
