import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PROJECTS, getProject, neighbours } from "@/lib/projects";
import { ProjectDetail } from "@/components/projects/project-detail";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} — Raghdkun`;
  const description = project.summary.en;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: project.cover.src, width: project.cover.w, height: project.cover.h, alt: project.cover.alt.en }],
    },
    twitter: { card: "summary_large_image", title, description, images: [project.cover.src] },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = neighbours(project.slug);
  return <ProjectDetail project={project} prev={prev} next={next} />;
}
