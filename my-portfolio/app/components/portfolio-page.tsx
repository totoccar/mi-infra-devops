import Link from "next/link";
import type { ComponentType } from "react";
import { FaAws, FaJava } from "react-icons/fa";
import {
    SiCplusplus,
    SiDocker,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiKotlin,
    SiLinux,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiOpencv,
    SiPandas,
    SiPostgresql,
    SiPrisma,
    SiPython,
    SiQt,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiWireshark,
} from "react-icons/si";
import content from "../data/content.json";
import projects from "../data/projects.json";
import skills from "../data/skills.json";

export type Locale = "en" | "es";

type Project = {
    title: string;
    summary: string;
    stack: string[];
    year: string;
    status: string;
};

type LocaleText = {
    navProjects: string;
    navContact: string;
    navSkills: string;
    heroKicker: string;
    heroTitle: string;
    heroDescription: string;
    stats: Array<{ label: string; value: string }>;
    projectsKicker: string;
    projectsTitle: string;
    projectsDescription: string;
    skillsKicker: string;
    skillsTitle: string;
    skillsDescription: string;
    contactDescription: string;
};

type SkillItem = {
    name: string;
    icon: string;
};

type SkillSection = {
    title: string;
    items: SkillItem[];
};

type SkillsDictionary = Record<Locale, { sections: SkillSection[] }>;

type ContentDictionary = Record<Locale, LocaleText>;
type ProjectsDictionary = Record<Locale, Project[]>;

const localizedContent = content as ContentDictionary;
const localizedProjects = projects as ProjectsDictionary;
const localizedSkills = skills as SkillsDictionary;

const defaultLocale: Locale = "en";

const skillIcons: Record<string, ComponentType<{ className?: string; size?: number; title?: string }>> = {
    FaAws,
    SiCplusplus,
    SiDocker,
    SiGit,
    SiGithub,
    SiGithubactions,
    FaJava,
    SiKotlin,
    SiLinux,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiOpencv,
    SiPandas,
    SiPostgresql,
    SiPrisma,
    SiPython,
    SiQt,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiWireshark,
};

export function PortfolioPage({ locale }: { locale: Locale }) {
    const text = localizedContent[locale] ?? localizedContent[defaultLocale];
    const projectItems = localizedProjects[locale] ?? localizedProjects[defaultLocale];
    const skillSections = localizedSkills[locale]?.sections ?? localizedSkills[defaultLocale].sections;
    const activeLanguageLabel = locale === "en" ? "English" : "Espa\u00f1ol";
    const alternateHref = locale === "en" ? "/es" : "/";
    const alternateLabel = locale === "en" ? "Espa\u00f1ol" : "English";

    return (
        <main className="relative min-h-screen overflow-hidden text-[#f0ebd8]">
            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-16">
                <header className="flex items-center justify-between border-b border-[#d1d0c9]/36 pb-5 text-sm text-[#f0ebd8]">
                    <span className="tracking-[0.24em] uppercase">Antonio Carlos</span>
                    <nav className="flex items-center gap-5">
                        <a className="transition-colors hover:text-[#dad7cd]" href="#skills">
                            {text.navSkills}
                        </a>
                        <a className="transition-colors hover:text-[#dad7cd]" href="#projects">
                            {text.navProjects}
                        </a>
                        <a className="transition-colors hover:text-[#dad7cd]" href="#contact">
                            {text.navContact}
                        </a>
                        <Link className="transition-colors hover:text-[#dad7cd]" href={alternateHref} aria-label={alternateLabel}>
                            {alternateLabel}
                        </Link>
                        <span className="text-[#dad7cd]/56">{activeLanguageLabel}</span>
                    </nav>
                </header>

                <section className="relative grid min-h-screen place-items-center -translate-y-4 py-10 lg:-translate-y-25 lg:py-20">
                    <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-center">
                        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
                            <p className="mb-auto text-sm uppercase tracking-[0.28em] text-[#dad7cd]/82">{text.heroKicker}</p>
                            <h1 className="font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight text-[#f2f2ef] sm:text-7xl">
                                {text.heroTitle}
                            </h1>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-[#e4e3dd]/88 sm:text-lg">
                                {text.heroDescription}
                            </p>
                        </div>

                        <aside className="mx-auto grid w-full max-w-md gap-4 rounded-3xl border border-[#d0cfc8]/36 bg-[#f4f4f1]/9 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm lg:mx-0 lg:max-w-none">
                            {text.stats.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-start justify-between gap-6 border-b border-[#d0cfc8]/28 pb-4 last:border-b-0 last:pb-0"
                                >
                                    <span className="text-xs uppercase tracking-[0.24em] text-[#dad7cd]/84">{item.label}</span>
                                    <span className="max-w-[14rem] text-right text-sm leading-6 text-[#f0efea]/90">{item.value}</span>
                                </div>
                            ))}
                        </aside>
                    </div>
                </section>

                <section id="skills" className="flex min-h-screen flex-col items-center justify-center pb-16">
                    <div className="w-full max-w-6xl">
                        <div className="mb-6 pt-20 flex flex-col items-center gap-4 border-t border-[#d0cfc8]/34 pt-6 text-center">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-[#dad7cd]/82">{text.skillsKicker}</p>
                                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#f2f2ef] sm:text-4xl">
                                    {text.skillsTitle}
                                </h2>
                            </div>
                            <p className="max-w-md text-sm leading-6 text-[#e2e1db]/82">{text.skillsDescription}</p>
                        </div>

                        <div className="grid gap-4">
                            {skillSections.map((section) => (
                                <article
                                    key={section.title}
                                    className="rounded-3xl border border-[#d0cfc8]/34 bg-[#f6f6f3]/8 p-6"
                                >
                                    <h3 className="font-[family-name:var(--font-display)] text-xl text-[#f2f2ef]">
                                        {section.title}
                                    </h3>
                                    <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                                        {section.items.map((item) => {
                                            const Icon = skillIcons[item.icon] ?? SiTypescript;

                                            return (
                                                <div
                                                    key={item.name}
                                                    className="group relative flex h-28 items-center justify-center text-[#f2f2ef]/90 outline-none"
                                                    aria-label={item.name}
                                                    tabIndex={0}
                                                    title={item.name}
                                                >
                                                    <Icon className="h-14 w-14 shrink-0 text-[#f2f2ef]/92 transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(242,242,239,0.24)] sm:h-16 sm:w-16" aria-hidden="true" />
                                                    <span className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-full rounded-full bg-[#f0efea] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#344e41] opacity-0 shadow-[0_14px_30px_rgba(0,0,0,0.28)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="projects" className="pb-16">
                    <div className="mb-6 flex items-end justify-between gap-6 border-t border-[#d0cfc8]/34 pt-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-[#dad7cd]/82">{text.projectsKicker}</p>
                            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#f2f2ef] sm:text-4xl">
                                {text.projectsTitle}
                            </h2>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-[#e2e1db]/82">{text.projectsDescription}</p>
                    </div>

                    <div className="grid gap-4">
                        {projectItems.map((project, index) => (
                            <article
                                key={`${locale}-${project.title}`}
                                className="group rounded-3xl border border-[#d0cfc8]/34 bg-[#f6f6f3]/8 p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#f6f6f3]/12"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                                    <div className="max-w-2xl">
                                        <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#dad7cd]/84">
                                            <span>{String(index + 1).padStart(2, "0")}</span>
                                            <span>{project.status}</span>
                                            <span>{project.year}</span>
                                        </div>
                                        <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#f2f2ef]">{project.title}</h3>
                                        <p className="mt-3 text-base leading-7 text-[#e4e3de]/84">{project.summary}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                                        {project.stack.map((item) => (
                                            <span
                                                key={item}
                                                className="rounded-full border border-[#cfcfc8]/40 bg-[#f6f6f3]/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#f0efea]/90"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    id="contact"
                    className="grid gap-4 border-t border-[#d0cfc8]/34 py-8 text-sm text-[#e4e3de]/84 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                    <p>{text.contactDescription}</p>
                    <a className="text-[#dad7cd] transition-colors hover:text-[#f2f2ef]" href="mailto:hello@antoniocarlos.dev">
                        antoniocarlos00@outlook.com.ar
                    </a>
                </section>
            </div>
        </main>
    );
}

export default PortfolioPage;