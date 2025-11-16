import z from "zod";

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
