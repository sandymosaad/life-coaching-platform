import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLocale } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("hero");
  const ts = await getTranslations("services");
  const tc = await getTranslations("cta");
  const locale = await getLocale();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto relative">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
              {t("tagline")}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {t("headline")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              {t("subheadline")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="https://www.facebook.com/profile.php?id=100064718392883" target="_blank" rel="noopener noreferrer">
                  {t("ctaBook")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/videos`}>{t("ctaContent")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">{ts("title")}</h2>
            <p className="text-muted-foreground">{ts("subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">{ts("coaching.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ts("coaching.description")}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">{ts("artTherapy.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ts("artTherapy.description")}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">{ts("wellness.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ts("wellness.description")}</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href={`/${locale}/services`}>{ts("ctaLearnMore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">{tc("title")}</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{tc("subtitle")}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <a href="https://www.facebook.com/profile.php?id=100064718392883" target="_blank" rel="noopener noreferrer">
                {tc("button")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/videos`}>{tc("explore")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
