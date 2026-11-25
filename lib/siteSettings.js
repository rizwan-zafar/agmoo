import { prisma } from "@/lib/db";

export const SITE_SETTINGS_ID = 1;

export const DEFAULT_SITE_SETTINGS = {
  footerTagline:
    "Mobile accessories engineered for everyday speed — cables, chargers, earbuds and adapters that just work.",
  footerAddress: "Lahore, Pakistan",
  footerPhone: "+92 300 1234567",
  footerEmail: "support@agmoo.com",
};

export function pickFooterFields(settings) {
  return {
    footerTagline: settings.footerTagline,
    footerAddress: settings.footerAddress,
    footerPhone: settings.footerPhone,
    footerEmail: settings.footerEmail,
  };
}

export async function getSiteSettings() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: SITE_SETTINGS_ID } });
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { id: SITE_SETTINGS_ID, ...DEFAULT_SITE_SETTINGS },
    });
  }
  return settings;
}