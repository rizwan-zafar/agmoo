import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  CUSTOMER_SESSION_COOKIE,
  sessionCookieOptions,
  signCustomerToken,
  verifyPassword,
} from "@/lib/auth";
import { normalizePhone, toPlain } from "@/lib/utils";
import { hasErrors, validateCustomerLogin } from "@/lib/validation";

export async function POST(request) {
  try {
    const data = await request.json();
    const errors = validateCustomerLogin(data);
    if (hasErrors(errors)) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
    }

    const phone = normalizePhone(data.phone);
    const customer = await prisma.customer.findUnique({ where: { phone } });
    if (!customer) {
      return NextResponse.json({ error: "Invalid phone or password" }, { status: 401 });
    }

    const valid = await verifyPassword(data.password, customer.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid phone or password" }, { status: 401 });
    }

    const token = signCustomerToken(customer);
    const response = NextResponse.json({
      customer: toPlain({
        id: customer.id,
        name: customer.name,
        shopName: customer.shopName,
        address: customer.address,
        phone: customer.phone,
      }),
    });
    response.cookies.set(CUSTOMER_SESSION_COOKIE, token, sessionCookieOptions);
    return response;
  } catch (error) {
    console.error("Customer login error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}