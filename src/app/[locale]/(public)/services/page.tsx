import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ServicesPage() {
  const t = await getTranslations("services");

  const services = [
    {
      title: t("coaching.title"),
      description: t("coaching.description"),
    },
    {
      title: t("artTherapy.title"),
      description: t("artTherapy.description"),
    },
    {
      title: t("wellness.title"),
      description: t("wellness.description"),
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, i) => (
            <Card key={i} className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                <Button asChild className="mt-6 w-full" variant="outline">
                  <a href="https://www.facebook.com/profile.php?id=100064718392883" target="_blank" rel="noopener noreferrer">
                    {t("ctaBook")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
