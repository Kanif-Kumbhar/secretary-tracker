import { z } from "zod";

export const impactSchema = z.object({
  cyberWarriors: z.string().min(1, "Please select Cyber Warriors team"),
  organization: z.string().min(1, "Organization name is required"),
  leaderName: z.string().min(1, "Leader name is required"),
  messagePropagated: z.string().min(1, "Message is required"),
  date: z.string().min(1, "Date is required"),
  activityDuration: z.string().min(1, "Duration is required"),
  location: z.string().min(1, "Location is required"),
  participants: z.string().min(1, "Number of participants is required"),
  resourceInvolved: z.string().optional(),
  socialLinks: z.string().optional(),
  mediaLinks: z.string().optional(),
  remarks: z.string().min(1, "Please select activity remarks"),
});