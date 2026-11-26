import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "ss_admin_session";
export const CUSTOMER_SESSION_COOKIE = "ss_customer_session";
const JWT_SECRET = process.env.JWT_SECRET || process.env.AUTH_SECRET || "insecure-dev-secret";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

export async function verifyPassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

export function signAdminToken(admin) {
  return jwt.sign(
    { role: "admin", adminId: admin.id, email: admin.email, name: admin.name },
    JWT_SECRET,
    { expiresIn: SESSION_MAX_AGE }
  );
}

export function verifyAdminToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload?.role === "customer") return null;
    if (payload?.role === "admin" || payload?.adminId) return payload;
    return null;
  } catch {
    return null;
  }
}

export function signCustomerToken(customer) {
  return jwt.sign(
    {
      role: "customer",
      customerId: customer.id,
      phone: customer.phone,
      name: customer.name,
      shopName: customer.shopName,
    },
    JWT_SECRET,
    { expiresIn: SESSION_MAX_AGE }
  );
}

export function verifyCustomerToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload?.role !== "customer") return null;
    return payload;
  } catch {
    return null;
  }
}

// For use inside Route Handlers / Server Components (has access to next/headers).
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

// For use inside Route Handlers that receive a `request` (NextRequest) object.
export function getAdminSessionFromRequest(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function getCustomerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyCustomerToken(token);
}

export function getCustomerSessionFromRequest(request) {
  const token = request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyCustomerToken(token);
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_MAX_AGE,
};
