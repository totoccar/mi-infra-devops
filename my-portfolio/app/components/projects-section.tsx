"use client";

import { useEffect, useRef } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import type { Locale } from "./portfolio-page";

export type Project = {
    title: string;
    summary: string;
    stack: string[];
    year: string;
    status: string;
    repoUrl?: string;
    liveUrl?: string;
};

type ProjectsSectionProps = {
    locale: Locale;
    projectsKicker: string;
    projectsTitle: string;
    projectsDescription: string;
    projectItems: Project[];
    onProjectLinkClick: (projectName: string, url: string, linkType: "repo" | "live") => void;
};

function ProjectsHoverHint({ locale }: { locale: Locale }) {
    const carouselHint =
        locale === "en"
            ? "Hover \nto pause\nauto-roll"
            : "Para pausar\nel auto-roll\npasa el cursor";

    return (
        <div className="pointer-events-none absolute left-0 top-35 hidden -translate-x-[110%] -rotate-6 xl:block">
            <div className="relative max-w-44 rounded-[1.1rem] border border-[#d0cfc8]/48 bg-[linear-gradient(145deg,rgba(246,246,243,0.18),rgba(246,246,243,0.08))] px-4 py-3 text-left shadow-[0_14px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                <span className="block whitespace-pre-line text-[11px] font-semibold uppercase leading-4 tracking-[0.18em] text-[#f2f2ef]/88">
                    {carouselHint}
                </span>
                <svg
                    className="absolute -right-7 top-1/2 h-10 w-10 -translate-y-1/2 rotate-12 text-[#f2f2ef]/84"
                    viewBox="0 0 48 48"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M9 24c7.5-8 18.5-12 30-12"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M28 9l11 2.5-7.5 8.2"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}

function ProjectCard({
    locale,
    project,
    index,
    onProjectLinkClick,
}: {
    locale: Locale;
    project: Project;
    index: number;
    onProjectLinkClick: (projectName: string, url: string, linkType: "repo" | "live") => void;
}) {
    const projectRepoLabel = locale === "en" ? "GitHub repo" : "Repositorio";
    const projectLiveLabel = locale === "en" ? "Live site" : "Sitio en vivo";

    return (
        <article
            className="group relative min-h-[calc((78vh-2rem)/3)] snap-start rounded-sm border border-[#d0cfc8]/34 bg-[#f6f6f3]/8 p-6 pb-14 transition-transform duration-200 hover:bg-[#f6f6f3]/12"
        >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                <div className="max-w-2xl">
                    <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#dad7cd]/84">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{project.status}</span>
                        <span>{project.year}</span>
                    </div>
                    <h3 className="font-(family-name:--font-display) text-2xl text-[#f2f2ef]">{project.title}</h3>
                    <p className="mt-3 text-base leading-7 text-[#e4e3de]/84">{project.summary}</p>
                </div>

                <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                    {project.stack.map((item) => (
                        <span
                            key={item}
                            className="rounded-sm border border-[#cfcfc8]/40 bg-[#f6f6f3]/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#f0efea]/90"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {project.repoUrl || project.liveUrl ? (
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    {project.liveUrl ? (
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-sm border border-[#d0cfc8]/34 bg-[#243b30]/36 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f0efea]/82 transition-colors hover:bg-[#243b30]/52 hover:text-[#f2f2ef]"
                            onClick={() => onProjectLinkClick(project.title, project.liveUrl!, "live")}
                            aria-label={`${projectLiveLabel}: ${project.title}`}
                        >
                            <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
                            Live
                        </button>
                    ) : null}
                    {project.repoUrl ? (
                        <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-sm border border-[#d0cfc8]/34 bg-[#243b30]/36 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f0efea]/82 transition-colors hover:bg-[#243b30]/52 hover:text-[#f2f2ef]"
                            onClick={() => onProjectLinkClick(project.title, project.repoUrl!, "repo")}
                            aria-label={`${projectRepoLabel}: ${project.title}`}
                        >
                            <FaGithub className="text-sm" aria-hidden="true" />
                            GitHub
                        </button>
                    ) : null}
                </div>
            ) : null}
        </article>
    );
}

export function ProjectsSection({
    locale,
    projectsKicker,
    projectsTitle,
    projectsDescription,
    projectItems,
    onProjectLinkClick,
}: ProjectsSectionProps) {
    const projectsCarouselRef = useRef<HTMLDivElement | null>(null);
    const isProjectsCarouselHoveredRef = useRef(false);

    const previousLabel = locale === "en" ? "Previous" : "Anterior";
    const nextLabel = locale === "en" ? "Next" : "Siguiente";

    const scrollProjectsByPage = (direction: "prev" | "next") => {
        const container = projectsCarouselRef.current;
        if (!container) return;

        const firstCard = container.querySelector("article");
        const firstCardHeight = firstCard instanceof HTMLElement ? firstCard.offsetHeight : 0;
        const scrollAmount = firstCardHeight > 0 ? firstCardHeight + 16 : Math.max(container.clientHeight / 3, 220);
        container.scrollBy({
            top: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const container = projectsCarouselRef.current;
        if (!container) return;

        const intervalId = window.setInterval(() => {
            if (isProjectsCarouselHoveredRef.current) {
                return;
            }

            const firstCard = container.querySelector("article");
            const firstCardHeight = firstCard instanceof HTMLElement ? firstCard.offsetHeight : 0;
            const scrollAmount = firstCardHeight > 0 ? firstCardHeight + 16 : Math.max(container.clientHeight / 3, 220);
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            const nextScrollTop = container.scrollTop + scrollAmount;

            if (nextScrollTop >= maxScrollTop - 2) {
                container.scrollTo({ top: 0, behavior: "auto" });
                return;
            }

            container.scrollBy({ top: scrollAmount, behavior: "smooth" });
        }, 3600);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [projectItems.length]);

    return (
        <section id="projects" className="scroll-mt-20 relative flex min-h-screen flex-col justify-center pb-16">
            <ProjectsHoverHint locale={locale} />

            <div className="relative mb-6 flex items-end justify-between gap-6">
                <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#dad7cd]/82">{projectsKicker}</p>
                    <h2 className="mt-2 font-(family-name:--font-display) text-3xl text-[#f2f2ef] sm:text-4xl">
                        {projectsTitle}
                    </h2>
                </div>
                <div className="flex items-end gap-3">
                    <p className="max-w-md text-sm leading-6 text-[#e2e1db]/82">{projectsDescription}</p>
                    <div className="hidden items-center gap-2 sm:flex">
                        <button
                            type="button"
                            onClick={() => scrollProjectsByPage("prev")}
                            aria-label={previousLabel}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#d0cfc8]/34 bg-[#243b30]/36 text-[#f0efea]/82 transition-colors hover:bg-[#243b30]/52 hover:text-[#f2f2ef]"
                        >
                            <span aria-hidden="true">&uarr;</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollProjectsByPage("next")}
                            aria-label={nextLabel}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#d0cfc8]/34 bg-[#243b30]/36 text-[#f0efea]/82 transition-colors hover:bg-[#243b30]/52 hover:text-[#f2f2ef]"
                        >
                            <span aria-hidden="true">&darr;</span>
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={projectsCarouselRef}
                onMouseEnter={() => {
                    isProjectsCarouselHoveredRef.current = true;
                }}
                onMouseLeave={() => {
                    isProjectsCarouselHoveredRef.current = false;
                }}
                className="flex h-[78vh] snap-y snap-mandatory flex-col gap-4 overflow-y-auto pr-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {projectItems.map((project, index) => (
                    <ProjectCard
                        key={`${locale}-${project.title}`}
                        locale={locale}
                        project={project}
                        index={index}
                        onProjectLinkClick={onProjectLinkClick}
                    />
                ))}
            </div>
        </section>
    );
}