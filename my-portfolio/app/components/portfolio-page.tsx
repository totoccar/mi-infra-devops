import Link from "next/link";
import content from "../data/content.json";
import projects from "../data/projects.json";
import skills from "../data/skills.json";
import { SkillsScroller } from "./skills-scroller";

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

export function PortfolioPage({ locale }: { locale: Locale }) {
    const text = localizedContent[locale] ?? localizedContent[defaultLocale];
    const projectItems = localizedProjects[locale] ?? localizedProjects[defaultLocale];
    const skillSections = localizedSkills[locale]?.sections ?? localizedSkills[defaultLocale].sections;
    const activeLanguageLabel = locale === "en" ? "English" : "Espa\u00f1ol";
    const alternateHref = locale === "en" ? "/es" : "/";
    const alternateLabel = locale === "en" ? "Espa\u00f1ol" : "English";
    const resumeLabel = locale === "en" ? "Download CV" : "Descargar CV";
    const contactTitle = locale === "en" ? "Contact" : "Contacto";
    const quickLinksLabel = locale === "en" ? "Quick links" : "Accesos";
    const emailLabel = locale === "en" ? "Email" : "Correo";
    const cvCardTitle = locale === "en" ? "Curriculum" : "Curriculum";
    const cvCardBody =
        locale === "en"
            ? "You can open or download my resume from here."
            : "Desde aqui puedes abrir o descargar mi curriculum.";
    const linkedinDescription =
        locale === "en"
            ? "Professional profile, experience and projects."
            : "Perfil profesional, experiencia y proyectos.";
    const githubDescription =
        locale === "en"
            ? "Code samples, repositories and experiments."
            : "Muestras de codigo, repositorios y experimentos.";

    return (
        <main className="relative min-h-screen overflow-hidden text-[#f0ebd8]">
            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
                <header className="relative z-20 flex items-center justify-between border-b border-[#d1d0c9]/36 pb-5 text-sm text-[#f0ebd8]">
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

                <section className="relative grid min-h-[calc(100vh-5.5rem)] place-items-center py-10 lg:min-h-[calc(100vh-6rem)] lg:py-20">
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

                        <aside className="mx-auto grid w-full gap-4 rounded-l border border-[#d0cfc8]/36 bg-[#f4f4f1]/9 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm lg:mx-0 lg:max-w-none">
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

                    <a
                        href="#skills"
                        aria-label="Scroll down"
                        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[#dad7cd]/60 transition-colors hover:text-[#f2f2ef]"
                    >
                        <span className="block h-3 w-3 rotate-45 border-b border-r border-current animate-bounce [animation-duration:1.6s]" />
                        <span className="block h-3 w-3 rotate-45 border-b border-r border-current animate-bounce [animation-delay:120ms] [animation-duration:1.6s]" />
                    </a>
                </section>

                <div aria-hidden="true" className="my-16 border-t border-[#d0cfc8]/34 lg:my-24" />

                <section id="skills" className="scroll-mt-20 flex min-h-screen flex-col items-center justify-center pb-16">
                    <div className="w-full max-w-6xl">
                        <div className="mb-10 flex flex-col items-center gap-4 text-center">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-[#dad7cd]/82">{text.skillsKicker}</p>
                                <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[#f2f2ef] sm:text-5xl">
                                    {text.skillsTitle}
                                </h2>
                            </div>
                            <p className="max-w-md text-sm leading-6 text-[#e2e1db]/82">{text.skillsDescription}</p>
                        </div>

                        <SkillsScroller sections={skillSections} />
                    </div>
                </section>

                <div aria-hidden="true" className="my-16 border-t border-[#d0cfc8]/34 lg:my-24" />

                <section id="projects" className="scroll-mt-20 flex min-h-screen flex-col justify-center pb-16">
                    <div className="mb-6 flex items-end justify-between gap-6">
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
                                className="group rounded-l border border-[#d0cfc8]/34 bg-[#f6f6f3]/8 p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#f6f6f3]/12"
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
                                                className="rounded-xl border border-[#cfcfc8]/40 bg-[#f6f6f3]/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#f0efea]/90"
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

                <div aria-hidden="true" className="my-16 border-t border-[#d0cfc8]/34 lg:my-24" />

                <section
                    id="contact"
                    className="scroll-mt-20 flex min-h-screen items-center py-10 text-sm text-[#e4e3de]/84 lg:py-16"
                >
                    <div className="w-full rounded-l border border-[#d0cfc8]/34 bg-[#f6f6f3]/8 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.2)] sm:p-8">
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                            <div>
                                <h2 className="font-[family-name:var(--font-display)] text-5xl leading-none text-[#f2f2ef] sm:text-6xl">
                                    {contactTitle}:
                                </h2>
                                <p className="mt-5 max-w-xl text-base leading-7 text-[#e4e3de]/90">{text.contactDescription}</p>

                                <div className="mt-6">
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#dad7cd]/82">{quickLinksLabel}</p>
                                    <ul className="mt-3 grid gap-2 text-xl leading-none text-[#f2f2ef]">
                                        <li>
                                            <a className="underline decoration-[#dad7cd]/40 underline-offset-4 transition-colors hover:text-[#dad7cd]" href="mailto:antoniocarlos00@outlook.com.ar">
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

                            <aside className="rounded-l border border-[#d0cfc8]/36 bg-[#243b30]/34 p-5 lg:ml-auto lg:w-full lg:max-w-md">
                                <p className="text-xs uppercase tracking-[0.22em] text-[#dad7cd]/84">{cvCardTitle}</p>
                                <p className="mt-3 text-base leading-7 text-[#f0efea]/88">{cvCardBody}</p>
                                <a
                                    className="mt-5 inline-block rounded-l border border-[#d0cfc8]/45 bg-[#f6f6f3]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#f2f2ef] transition-colors hover:bg-[#f6f6f3]/18"
                                    href="/Antonio%20Carlos%20CV.pdf"
                                    download="Antonio Carlos CV.pdf"
                                >
                                    {resumeLabel}
                                </a>
                            </aside>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            <article className="rounded-l border border-[#d0cfc8]/30 bg-[#243b30]/22 p-4">
                                <p className="text-m font-semibold text-[#dad7cd]">01</p>
                                <p className="mt-2 text-base text-[#f2f2ef]">Email</p>
                                <a
                                    className="mt-1 block break-all text-sm leading-6 text-[#e6e5de]/86 underline decoration-[#dad7cd]/35 underline-offset-4 transition-colors hover:text-[#f2f2ef]"
                                    href="mailto:antoniocarlos00@outlook.com.ar"
                                >
                                    antoniocarlos00@outlook.com.ar
                                </a>
                            </article>
                            <article className="rounded-l border border-[#d0cfc8]/30 bg-[#243b30]/22 p-4">
                                <p className="text-m font-semibold text-[#dad7cd]">02</p>
                                <p className="mt-2 text-base text-[#f2f2ef]">LinkedIn</p>
                                <p className="mt-1 text-sm leading-6 text-[#e6e5de]/86">{linkedinDescription}</p>
                            </article>
                            <article className="rounded-l border border-[#d0cfc8]/30 bg-[#243b30]/22 p-4">
                                <p className="text-m font-semibold text-[#dad7cd]">03</p>
                                <p className="mt-2 text-base text-[#f2f2ef]">GitHub</p>
                                <p className="mt-1 text-sm leading-6 text-[#e6e5de]/86">{githubDescription}</p>
                            </article>
                        </div>

                        <div className="mt-8 flex items-center gap-4 border-t border-[#d0cfc8]/28 pt-6">
                            <span
                                className="inline-block h-10 w-10 rounded-full border border-[#d0cfc8]/40 bg-[#dad7cd] transition-all duration-100 ease-in-out hover:bg-[#f6f6f3]/40"
                                aria-hidden="true"
                            />
                            <span
                                className="inline-block h-10 w-10 rounded-full border border-[#d0cfc8]/40 bg-[#dad7cd] transition-all duration-100 ease-in-out hover:bg-[#f6f6f3]/40"
                                aria-hidden="true"
                            />
                            <span
                                className="inline-block h-10 w-10 rounded-full border border-[#d0cfc8]/40 bg-[#dad7cd] transition-all duration-100 ease-in-out hover:bg-[#f6f6f3]/40"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default PortfolioPage;