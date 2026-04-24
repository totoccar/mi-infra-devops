"use client";

import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { trackProjectClick } from "@/lib/analytics";
import content from "../data/content.json";
import skills from "../data/skills.json";
import projects from "../data/projects.json";
import { ProjectsSection, type Project } from "./projects-section";
import { SkillsScroller } from "./skills-scroller";

export type Locale = "en" | "es";

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

type ContentDictionary = Record<Locale, LocaleText>;
type SkillItem = {
    name: string;
    icon: string;
};

type SkillSection = {
    title: string;
    items: SkillItem[];
};

type SkillsDictionary = Record<Locale, { sections: SkillSection[] }>;

const localizedContent = content as ContentDictionary;
const localizedSkills = skills as SkillsDictionary;
const localizedProjects = projects as Record<Locale, Project[]>;

const defaultLocale: Locale = "en";

function LanguageSwitcher({ locale }: { locale: Locale }) {
    const isEnglish = locale === "en";
    const englishHref = "/";
    const spanishHref = "/es";

    return (
        <div className="relative inline-flex items-center rounded-full border border-[#d0cfc8]/34 bg-[#f6f6f3]/8 p-1 text-[11px] uppercase tracking-[0.18em] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
            <span
                aria-hidden="true"
                className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[#f2f2ef] shadow-[0_8px_18px_rgba(0,0,0,0.16)] transition-transform duration-300 ease-out motion-reduce:transition-none ${isEnglish ? "translate-x-0" : "translate-x-full"
                    }`}
            />
            <Link
                href={englishHref}
                aria-current={isEnglish ? "page" : undefined}
                className={`relative z-10 rounded-full px-3 py-1.5 transition-colors duration-200 ${isEnglish ? "text-[#243b30]" : "text-[#e4e3de]/70 hover:text-[#f2f2ef]"
                    }`}
            >
                EN
            </Link>
            <Link
                href={spanishHref}
                aria-current={!isEnglish ? "page" : undefined}
                className={`relative z-10 rounded-full px-3 py-1.5 transition-colors duration-200 ${!isEnglish ? "text-[#243b30]" : "text-[#e4e3de]/70 hover:text-[#f2f2ef]"
                    }`}
            >
                ES
            </Link>
        </div>
    );
}

export function PortfolioPage({ locale }: { locale: Locale }) {
    const text = localizedContent[locale] ?? localizedContent[defaultLocale];
    const projectItems = localizedProjects[locale] ?? localizedProjects[defaultLocale];
    const skillSections = localizedSkills[locale]?.sections ?? localizedSkills[defaultLocale].sections;
    const emailHref = "mailto:antoniocarlos00@outlook.com.ar";
    const previewResumeLabel = locale === "en" ? "Preview CV" : "Ver CV";
    const downloadResumeLabel = locale === "en" ? "Download CV" : "Descargar CV";
    const contactTitle = locale === "en" ? "Contact" : "Contacto";
    const quickLinksLabel = locale === "en" ? "Quick links" : "Accesos";
    const emailLabel = locale === "en" ? "Email" : "Correo";
    const cvCardTitle = locale === "en" ? "Curriculum" : "Curriculum";
    const cvCardBody =
        locale === "en"
            ? "Preview my resume in your browser or download it with the icon."
            : "Previsualiza mi curriculum en el navegador o descargalo con el icono.";
    const resumeFileHref =
        locale === "en" ? "/Antonio%20Carlos%20(English).pdf" : "/Antonio%20Carlos%20CV.pdf";
    const resumeFileName =
        locale === "en" ? "Antonio Carlos (English).pdf" : "Antonio Carlos CV.pdf";
    const menuLabel = locale === "en" ? "Menu" : "Menu";
    const linkedinDescription =
        locale === "en"
            ? "Professional profile, experience and projects."
            : "Perfil profesional, experiencia y proyectos.";
    const githubDescription =
        locale === "en"
            ? "Code samples, repositories and experiments."
            : "Muestras de código, repositorios y experimentos.";

    const handleProjectLinkClick = (projectName: string, url: string, linkType: "repo" | "live") => {
        void trackProjectClick(`${projectName}:${linkType}`);
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <main className="relative min-h-screen overflow-hidden text-[#f0ebd8]">
            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-5 sm:px-10 lg:px-16">
                <header className="relative z-20 flex items-center justify-between border-b border-[#d1d0c9]/36 pb-5 text-sm text-[#f0ebd8]">
                    <span className="tracking-[0.24em] uppercase">Antonio Carlos</span>
                    <nav className="hidden items-center gap-5 md:flex">
                        <a className="transition-colors hover:text-[#dad7cd]" href="#skills">
                            {text.navSkills}
                        </a>
                        <a className="transition-colors hover:text-[#dad7cd]" href="#projects">
                            {text.navProjects}
                        </a>
                        <a className="transition-colors hover:text-[#dad7cd]" href="#contact">
                            {text.navContact}
                        </a>
                        <LanguageSwitcher locale={locale} />
                    </nav>

                    <details className="relative md:hidden">
                        <summary className="list-none rounded-full border border-[#d0cfc8]/40 bg-[#f6f6f3]/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#f2f2ef]">
                            {menuLabel}
                        </summary>
                        <div className="absolute right-0 top-12 z-30 grid min-w-48 gap-4 rounded-xl border border-[#d0cfc8]/36 bg-[#243b30]/95 p-4 backdrop-blur">
                            <a className="transition-colors hover:text-[#dad7cd]" href="#skills">
                                {text.navSkills}
                            </a>
                            <a className="transition-colors hover:text-[#dad7cd]" href="#projects">
                                {text.navProjects}
                            </a>
                            <a className="transition-colors hover:text-[#dad7cd]" href="#contact">
                                {text.navContact}
                            </a>
                            <div className="pt-1">
                                <LanguageSwitcher locale={locale} />
                            </div>
                        </div>
                    </details>
                </header>

                <section className="relative grid min-h-[calc(100vh-5.5rem)] place-items-center py-8 sm:py-10 lg:min-h-[calc(100vh-10rem)] lg:py-20">
                    <div className="grid w-full max-w-6xl gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.65fr)] lg:items-center">
                        <div className="mx-auto max-w-3xl text-left">
                            <p className="mb-5 text-sm uppercase tracking-[0.28em] text-[#dad7cd]/82">{text.heroKicker}</p>
                            <h1 className="font-(family-name:--font-display) text-4xl leading-[0.95] tracking-tight text-[#f2f2ef] sm:text-6xl lg:text-7xl">
                                {text.heroTitle}
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-[#e4e3dd]/88 sm:text-lg sm:leading-8">
                                {text.heroDescription}
                            </p>
                        </div>

                        <aside className="mx-auto grid w-full max-w-sm gap-3 rounded-l border border-[#d0cfc8]/28 bg-[#f4f4f1]/8 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.16)] backdrop-blur-sm lg:mx-0 lg:justify-self-end">
                            {text.stats.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-start justify-between gap-4 border-b border-[#d0cfc8]/22 pb-3 last:border-b-0 last:pb-0"
                                >
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#dad7cd]/76">{item.label}</span>
                                    <span className="text-right text-xs leading-5 text-[#f0efea]/84">{item.value}</span>
                                </div>
                            ))}
                        </aside>
                    </div>

                    <a
                        href="#skills"
                        aria-label="Scroll down"
                        className="mt-8 flex flex-col items-center gap-1 text-[#dad7cd]/60 transition-colors hover:text-[#f2f2ef] lg:absolute lg:bottom-4 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
                    >
                        <span className="block h-3 w-3 rotate-45 border-b border-r border-current animate-bounce [animation-duration:1.6s]" />
                        <span className="block h-3 w-3 rotate-45 border-b border-r border-current animate-bounce [animation-delay:120ms] [animation-duration:1.6s]" />
                    </a>
                </section>

                <div aria-hidden="true" className="my-16 border-t border-[#d0cfc8]/34 lg:my-24" />

                <section id="skills" className="scroll-mt-6 flex min-h-screen flex-col items-center justify-center pb-16">
                    <div className="w-full max-w-6xl">
                        <div className="mb-10 flex flex-col items-center gap-4 text-center">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-[#dad7cd]/82">{text.skillsKicker}</p>
                                <h2 className="mt-2 font-(family-name:--font-display) text-4xl text-[#f2f2ef] sm:text-5xl">
                                    {text.skillsTitle}
                                </h2>
                            </div>
                            <p className="max-w-md text-sm leading-6 text-[#e2e1db]/82">{text.skillsDescription}</p>
                        </div>

                        <SkillsScroller sections={skillSections} />
                    </div>
                </section>

                <div aria-hidden="true" className="my-16 border-t border-[#d0cfc8]/34 lg:my-24" />

                <ProjectsSection
                    locale={locale}
                    projectsKicker={text.projectsKicker}
                    projectsTitle={text.projectsTitle}
                    projectsDescription={text.projectsDescription}
                    projectItems={projectItems}
                    onProjectLinkClick={handleProjectLinkClick}
                />

                <div aria-hidden="true" className="my-16 border-t border-[#d0cfc8]/34 lg:my-24" />

                <section
                    id="contact"
                    className="scroll-mt-20 flex min-h-screen items-center py-10 text-sm text-[#e4e3de]/84 lg:py-16"
                >
                    <div className="w-full rounded-sm border border-[#d0cfc8]/34 bg-[#f6f6f3]/8 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.2)] sm:p-8">
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                            <div>
                                <h2 className="font-(family-name:--font-display) text-5xl leading-none text-[#f2f2ef] sm:text-6xl">
                                    {contactTitle}:
                                </h2>
                                <p className="mt-5 max-w-xl text-base leading-7 text-[#e4e3de]/90">{text.contactDescription}</p>

                                <div className="mt-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#dad7cd]/82">{quickLinksLabel}</p>
                                    <ul className="mt-3 grid gap-2 text-xl leading-none text-[#f2f2ef]">
                                        <li>
                                            <a className="underline decoration-[#dad7cd]/40 underline-offset-4 transition-colors hover:text-[#dad7cd]" href={emailHref}>
                                                {emailLabel}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="underline decoration-[#dad7cd]/40 underline-offset-4 transition-colors hover:text-[#dad7cd]"
                                                href="https://www.linkedin.com/in/antoniocarlos2000/"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                LinkedIn
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="underline decoration-[#dad7cd]/40 underline-offset-4 transition-colors hover:text-[#dad7cd]"
                                                href="https://github.com/totoccar"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                GitHub
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <aside className="rounded-sm border border-[#d0cfc8]/36 bg-[#243b30]/34 p-5 lg:ml-auto lg:w-full lg:max-w-md">
                                <p className="text-xs uppercase tracking-[0.22em] text-[#dad7cd]/84">{cvCardTitle}</p>
                                <p className="mt-3 text-base leading-7 text-[#f0efea]/88">{cvCardBody}</p>
                                <div className="mt-5 flex items-center gap-2">
                                    <a
                                        className="inline-block rounded-sm border border-[#d0cfc8]/45 bg-[#f6f6f3]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#f2f2ef] transition-colors hover:bg-[#f6f6f3]/18"
                                        href={resumeFileHref}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {previewResumeLabel}
                                    </a>
                                    <a
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#d0cfc8]/45 bg-[#f6f6f3]/10 text-[#f2f2ef] transition-colors hover:bg-[#f6f6f3]/18"
                                        href={resumeFileHref}
                                        download={resumeFileName}
                                        aria-label={downloadResumeLabel}
                                        title={downloadResumeLabel}
                                    >
                                        <FaDownload className="text-sm" aria-hidden="true" />
                                    </a>
                                </div>
                            </aside>
                        </div>

                        <div className="mt-8 hidden gap-4 lg:grid lg:grid-cols-3">
                            <article className="rounded-sm border border-[#d0cfc8]/30 bg-[#243b30]/22 p-4">
                                <p className="text-sm font-semibold text-[#dad7cd]">01</p>
                                <p className="mt-2 text-base text-[#f2f2ef]">Email</p>
                                <a
                                    className="mt-1 block break-all text-sm leading-6 text-[#e6e5de]/86 underline decoration-[#dad7cd]/35 underline-offset-4 transition-colors hover:text-[#f2f2ef]"
                                    href={emailHref}
                                >
                                    antoniocarlos00@outlook.com.ar
                                </a>
                            </article>
                            <article className="rounded-sm border border-[#d0cfc8]/30 bg-[#243b30]/22 p-4">
                                <p className="text-sm font-semibold text-[#dad7cd]">02</p>
                                <p className="mt-2 text-base text-[#f2f2ef]">LinkedIn</p>
                                <p className="mt-1 text-sm leading-6 text-[#e6e5de]/86">{linkedinDescription}</p>
                            </article>
                            <article className="rounded-sm border border-[#d0cfc8]/30 bg-[#243b30]/22 p-4">
                                <p className="text-sm font-semibold text-[#dad7cd]">03</p>
                                <p className="mt-2 text-base text-[#f2f2ef]">GitHub</p>
                                <p className="mt-1 text-sm leading-6 text-[#e6e5de]/86">{githubDescription}</p>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default PortfolioPage;