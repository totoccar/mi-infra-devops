import { notFound } from "next/navigation";
import { PortfolioPage, type Locale } from "../components/portfolio-page";

const locales: Locale[] = ["en", "es"];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocalePage({
    params,
}: Readonly<{
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    return <PortfolioPage locale={locale as Locale} />;
}