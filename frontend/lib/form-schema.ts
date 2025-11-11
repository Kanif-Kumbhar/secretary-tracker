import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(8, {
      message: "Email must contain at least 8 character(s)",
    })
    .max(40, {
      message: "Email must contain up to 40 character(s) only",
    })
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 character(s)",
    })
    .max(35, {
      message: "Password must contain up to 35 character(s) only",
    }),
  role: z.enum(["teacher", "secretary", "warrior"]).or(z.literal("")),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(4, "Full name must contain at least 4 character(s)")
    .max(40, "Full name must contain up to 40 character(s) only"),
  email: z
    .string()
    .min(8, {
      message: "Email must contain at least 8 character(s)",
    })
    .max(40, {
      message: "Email must contain up to 40 character(s) only",
    })
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 character(s)",
    })
    .max(35, {
      message: "Password must contain up to 35 character(s) only",
    }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }),
  role: z.enum(["teacher", "secretary", "warrior"]),
  college: z
    .string()
    .min(1, "College is required")
    .max(150, "College must contain up to 150 character(s) only"),
});
