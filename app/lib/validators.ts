import { z } from "zod";

export const ValuationRequestSchema = z.object({
    address: z.string().min(5, "Address must be at least 5 characters"),
    propertyType: z.enum(["single-family", "condo", "multi-family"]),
    beds: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    baths: z.union([z.string(), z.number()]).transform((val) => Number(val)),
    sqft: z.union([z.string(), z.number()]).transform((val) => Number(val)).optional(),
});

export type ValuationRequest = z.infer<typeof ValuationRequestSchema>;

export const LeadSubmissionSchema = z.object({
    name: z.string().optional(), // Often split, but simple is fine
    email: z.string().email(),
    phone: z.string().min(10, "Phone number is too short"),
    timeframe: z.string().optional(),
    propertyDetails: ValuationRequestSchema,
});

export type LeadSubmission = z.infer<typeof LeadSubmissionSchema>;
