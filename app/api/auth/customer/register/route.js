import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  CUSTOMER_SESSION_COOKIE,
  hashPassword,
  sessionCookieOptions,
  signCustomerToken,
} from "@/lib/auth";
import { normalizePhone, toPlain } from "@/lib/utils";
import { hasErrors, validateCustomerRegister } from "@/lib/validation";

export async function POST(request) {
  try {
    const data = await request.json();
    const errors = validateCustomerRegister(data);
    if (hasErrors(errors)) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
    }

    const phone = normalizePhone(data.phone);
    const existing = await prisma.customer.findUnique({ where: { phone } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this phone already exists. Please sign in." },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(data.password);
    const customer = await prisma.customer.create({
      data: {
        name: data.name.trim(),
        shopName: data.shopName.trim(),
        address: data.address.trim(),
        phone,
        password: hashed,
      },
    });

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
    console.error("Customer register error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}