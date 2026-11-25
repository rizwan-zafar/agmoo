import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { SITE_SETTINGS_ID, getSiteSettings, pickFooterFields } from "@/lib/siteSettings";
import { prisma } from "@/lib/db";
import { toPlain } from "@/lib/utils";
import { hasErrors, validateSiteSettings } from "@/lib/validation";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ settings: toPlain(pickFooterFields(settings)) });
}

export async function PUT(request) {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const errors = validateSiteSettings(data);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: SITE_SETTINGS_ID },
    create: {
      id: SITE_SETTINGS_ID,
      footerTagline: data.footerTagline.trim(),
      footerAddress: data.footerAddress.trim(),
      footerPhone: data.footerPhone.trim(),
      footerEmail: data.footerEmail.trim().toLowerCase(),
    },
    update: {
      footerTagline: data.footerTagline.trim(),
      footerAddress: data.footerAddress.trim(),
      footerPhone: data.footerPhone.trim(),
      footerEmail: data.footerEmail.trim().toLowerCase(),
    },
  });

  return NextResponse.json({ settings: toPlain(pickFooterFields(settings)) });
}