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

function defaultSiteSettingsRow() {
  return { id: SITE_SETTINGS_ID, ...DEFAULT_SITE_SETTINGS, updatedAt: new Date() };
}

const SITE_SETTINGS_QUERY_MS = 3000;

async function querySiteSettings() {
  const query = prisma.siteSettings.findUnique({ where: { id: SITE_SETTINGS_ID } });
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("site_settings_query_timeout")), SITE_SETTINGS_QUERY_MS);
  });
  return Promise.race([query, timeout]);
}

// Safe at build time when CI cannot reach MySQL (e.g. static /about prerender).
// Never writes here — seed, migration, or admin API owns the row.
export async function getSiteSettings() {
  if (process.env.NEXT_PHASE === "phase-production-build" || !process.env.DATABASE_URL) {
    return defaultSiteSettingsRow();
  }

  try {
    const settings = await querySiteSettings();
    return settings || defaultSiteSettingsRow();
  } catch {
    return defaultSiteSettingsRow();
  }
}