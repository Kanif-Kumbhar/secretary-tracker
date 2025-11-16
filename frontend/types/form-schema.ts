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



export const registerInstitute = z.object({
  name: z
    .string()
    .min(5, "Name should be minimum 5 characters")
    .max(40, "Name Should be maximum 40 characters"),
  address: z
    .string()
    .min(10, "Address should be minimum 10 characters long")
    .max(50, "Address should be maximum 50 characters long"),
  district: z
    .string()
    .min(5, "Name should be minimum 5 characters")
    .max(40, "Name Should be maximum 40 characters"),
  state: z.string().min(1, "State field is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be exactly 6 digits"),
  email: z
    .string()
    .email()
    .min(5, "Name should be minimum 5 characters")
    .max(40, "Name Should be maximum 40 characters"),
  contactNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Contact number must be exactly 10 digits"),

  type: z.string().min(1, "Institute type is required"),
});
