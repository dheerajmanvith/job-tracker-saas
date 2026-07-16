import { z } from "zod";

export const applicationSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company is required"),

  role: z
    .string()
    .trim()
    .min(1, "Role is required"),

  status: z
    .string()
    .min(1, "Status is required"),

  appliedDate: z
    .string()
    .min(1, "Applied date is required"),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});