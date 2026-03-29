import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

const SOCIAL_LINKS = [
  {
    key: "facebook" as const,
    href: "https://www.facebook.com/profile.php?id=100064718392883",
    ariaLabel: "Facebook",
  },
  {
    key: "instagram" as const,
    href: "https://www.instagram.com/balance_wz_haidy",
    ariaLabel: "Instagram",
  },
  {
    key: "tiktok" as const,
    href: "https://www.tiktok.com/@balance_wz_haidy",
    ariaLabel: "TikTok",
  },
  {
    key: "youtube" as const,
    href: "https://youtube.com/@balance_wz_haidy",
    ariaLabel: "YouTube",
  },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const ts = await getTranslations("social");
  const locale = await getLocale();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href={`/${locale}`} className="font-bold text-xl text-primary">
              Balance
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">{ts("followUs")}</h3>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {ts(link.key)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Links</h3>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href={`/${locale}/services`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href={`/${locale}/videos`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Content Hub
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Balance. {t("copyright")}
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("privacy")}
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
