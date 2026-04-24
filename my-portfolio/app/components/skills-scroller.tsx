"use client";

import { useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import { FaAws, FaJava } from "react-icons/fa";
import {
    SiCplusplus,
    SiDocker,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiGo,
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

type SkillItem = {
    name: string;
    icon: string;
};

type SkillSection = {
    title: string;
    items: SkillItem[];
};

const skillIcons: Record<string, ComponentType<{ className?: string; size?: number; title?: string }>> = {
    FaAws,
    SiCplusplus,
    SiDocker,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiGo,
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

function clampIndex(index: number, max: number) {
    if (max <= 0) return 0;
    if (index < 0) return 0;
    if (index > max) return max;
    return index;
}

export function SkillsScroller({ sections }: { sections: SkillSection[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const maxIndex = useMemo(() => Math.max(0, sections.length - 1), [sections.length]);

    const updateActiveIndex = () => {
        const container = containerRef.current;
        if (!container) return;

        const pageHeight = container.clientHeight || 1;
        const currentIndex = clampIndex(Math.round(container.scrollTop / pageHeight), maxIndex);
        setActiveIndex(currentIndex);
    };

    const scrollToIndex = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        const pageHeight = container.clientHeight || 1;
        container.scrollTo({ top: index * pageHeight, behavior: "smooth" });
        setActiveIndex(index);
    };

    const activeTitle = sections[activeIndex]?.title ?? sections[0]?.title ?? "";

    return (
        <div className="grid items-stretch gap-4 lg:grid-cols-[auto_1fr_auto]">

            <aside className="hidden lg:flex sticky top-28 h-fit self-start items-center justify-center">
                <span className="[writing-mode:vertical-rl] rotate-180 text-4xl font-semibold tracking-[0.16em] uppercase text-[#f2f2ef]">
                    {activeTitle}
                </span>
            </aside>

            <div
                ref={containerRef}
                onScroll={updateActiveIndex}
                className="skills-native-scrollbar h-[56vh] rounded-sm overflow-y-auto snap-y snap-proximity scroll-smooth border border-[#d0cfc8]/34 bg-[#f6f6f3]/8 sm:h-[58vh] lg:h-[60vh] lg:snap-mandatory"
            >
                {sections.map((section) => (
                    <article key={section.title} className="min-h-[56vh] snap-start px-5 py-6 sm:min-h-[58vh] sm:px-8 sm:py-8 lg:h-[60vh] lg:min-h-0">
                        <p className="mb-4 block w-fit mx-auto px-3 py-1  text-center text-[10px] uppercase tracking-[0.2em] text-[#dad7cd]/88 lg:hidden">
                            {section.title}
                        </p>
                        <div className="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
                            {section.items.map((item) => {
                                const Icon = skillIcons[item.icon] ?? SiTypescript;

                                return (
                                    <div
                                        key={`${section.title}-${item.name}`}
                                        className="group rounded-sm border border-[#d0cfc8]/28 bg-[#243b30]/32 px-4 py-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.24)] transition-transform duration-200 hover:-translate-y-0.5"
                                        aria-label={item.name}
                                        title={item.name}
                                    >
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center">
                                            <Icon
                                                className="h-14 w-14 text-[#f2f2ef]/92 transition-transform duration-200 group-hover:scale-105"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#f0efea]/88">{item.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </article>
                ))}
            </div>

            <nav aria-label="Skills sections" className="hidden lg:flex sticky top-28 h-fit self-start">
                <div className="flex flex-col gap-3">
                    {sections.map((section, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={section.title}
                                type="button"
                                onClick={() => scrollToIndex(index)}
                                aria-label={section.title}
                                aria-current={isActive ? "true" : undefined}
                                className="group"
                            >
                                <span
                                    className={`block h-10 w-2 transition-all duration-200 ${isActive
                                        ? "bg-[#dad7cd]"
                                        : "bg-[#dad7cd]/42 group-hover:bg-[#dad7cd]/70"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </nav>

        </div>
    );
}
