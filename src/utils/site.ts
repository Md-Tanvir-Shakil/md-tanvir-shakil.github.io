import profileData from "@/data/profile.json";
import skillsData from "@/data/skills.json";
import siteData from "@/data/site.json";

export const profile = profileData;
export const skills = skillsData;
export const site = siteData;

export type Profile = typeof profileData;
export type SiteConfig = typeof siteData;

/** Format a "YYYY-MM" / "YYYY-MM-DD" / "present" date string for display. */
export function formatDate(value?: string): string {
  if (!value) return "Present";
  if (value.toLowerCase() === "present") return "Present";
  const parts = value.split("-");
  const year = parts[0];
  const month = parts[1];
  if (!month) return year;
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const idx = parseInt(month, 10) - 1;
  return `${monthNames[idx] ?? month} ${year}`;
}

export function formatDateRange(start?: string, end?: string): string {
  if (!start) return "";
  return `${formatDate(start)} — ${end ? formatDate(end) : "Present"}`;
}

/** Estimate reading time from Markdown/plain body text. */
export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
