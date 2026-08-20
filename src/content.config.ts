import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Shared building blocks
 */
const statusEnum = z.enum([
  "planned",
  "in-progress",
  "completed",
  "ongoing",
  "paused",
]);

const dateRange = {
  startDate: z.string().optional(), // "YYYY-MM" or "YYYY-MM-DD"
  endDate: z.string().optional(), // omit or "present" for ongoing
};

const linkBlock = z.object({
  label: z.string(),
  url: z.string().url(),
});

// Optional URL that also tolerates an empty string from CMS forms
// (Decap CMS/YAML frontmatter often writes "" rather than omitting the key).
const optionalUrl = z
  .union([z.string().url(), z.literal("")])
  .optional()
  .transform((v) => (v === "" ? undefined : v));

/**
 * RESEARCH INTERESTS / RESEARCH TOPICS
 * /research/[slug]
 */
const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(), // short description (Level 1/2)
    description: z.string().optional(), // detailed description (Level 3) — body is used if omitted
    motivation: z.string().optional(),
    researchQuestions: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    relatedProjects: z.array(z.string()).default([]), // slugs into projects collection
    relatedPublications: z.array(z.string()).default([]), // slugs into publications collection
    status: statusEnum.default("ongoing"),
    futureDirection: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

/**
 * RESEARCH PROJECTS + ENGINEERING PROJECTS
 * Single collection, distinguished by `type`.
 * /projects/[slug]
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["research", "engineering"]),
    summary: z.string(),
    problemStatement: z.string().optional(),
    approach: z.string().optional(),
    hardware: z.array(z.string()).default([]),
    software: z.array(z.string()).default([]),
    algorithms: z.array(z.string()).default([]),
    architectureNotes: z.string().optional(),
    architectureImage: z.string().optional(),
    results: z.string().optional(),
    myContribution: z.string().optional(),
    images: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    githubRepo: optionalUrl,
    demoUrl: optionalUrl,
    documentationUrl: optionalUrl,
    researchRelevance: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    categories: z
      .array(
        z.enum([
          "Embedded Systems",
          "IoT",
          "IIoT",
          "AIoT",
          "Edge AI",
          "Computer Vision",
          "PCB",
          "Firmware",
          "Industrial Automation",
          "Robotics",
        ])
      )
      .default([]),
    status: statusEnum.default("completed"),
    ...dateRange,
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

/**
 * PUBLICATIONS
 * /publications/[slug]
 */
const publications = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/publications",
  }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number().optional(),
    venue: z.string().optional(),
    type: z
      .enum([
        "journal",
        "conference",
        "preprint",
        "technical-report",
        "poster",
        "research-note",
      ])
      .default("conference"),
    doi: z.string().optional(),
    url: optionalUrl,
    pdfUrl: z.string().optional(),
    abstract: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    citation: z.string().optional(), // pre-formatted citation string
    status: z.enum(["published", "accepted", "submitted", "in-preparation"]).default("in-preparation"),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

/**
 * BLOG / TECHNICAL WRITING
 * /writing/[slug]
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("MD. Tanvir Shakil"),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    coverImage: z.string().optional(),
    relatedProjects: z.array(z.string()).default([]),
    relatedResearch: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

/**
 * EXPERIENCE
 * listed on /experience
 */
const experience = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    companyUrl: z.string().optional(),
    position: z.string(),
    location: z.string().optional(),
    ...dateRange,
    description: z.string().optional(),
    responsibilities: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    relatedProjects: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

/**
 * EDUCATION
 * listed on /education
 */
const education = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/education" }),
  schema: z.object({
    degree: z.string(),
    university: z.string(),
    department: z.string().optional(),
    startYear: z.string().optional(),
    endYear: z.string().optional(),
    cgpa: z.string().optional(),
    relevantCoursework: z.array(z.string()).default([]),
    thesis: z.string().optional(),
    achievements: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

export const collections = {
  research,
  projects,
  publications,
  blog,
  experience,
  education,
};

export { linkBlock };
