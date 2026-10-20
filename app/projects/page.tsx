import type { Metadata } from "next";

import { ProjectsIndex } from "@/components/projects/projects-index";

export const metadata: Metadata = {
  title: "Projects — Raghdkun",
  description:
    "Selected work by Raghdkun: ride-hailing platform, mobile apps, dashboards and marketing sites built end to end with Flutter, Laravel, Next.js and React.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
