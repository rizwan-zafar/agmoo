import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCustomerSessionFromRequest } from "@/lib/auth";
import { toPlain } from "@/lib/utils";

export async function GET(request) {
  const session = getCustomerSessionFromRequest(request);
  if (!session?.customerId) {
    return NextResponse.json({ customer: null });
  }

  const customer = await prisma.customer.findUnique({
    where: { id: session.customerId },
    select: { id: true, name: true, shopName: true, address: true, phone: true },
  });

  if (!customer) {
    return NextResponse.json({ customer: null });
  }

  return NextResponse.json({ customer: toPlain(customer) });
}