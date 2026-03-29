import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-lg leading-relaxed mb-6 text-muted-foreground">{t("intro")}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{t("body")}</p>
          </div>
          <div className="bg-muted/30 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-4">{t("philosophy")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("philosophyText")}</p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <a href="https://www.facebook.com/profile.php?id=100064718392883" target="_blank" rel="noopener noreferrer">
              {t("ctaConnect")}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
