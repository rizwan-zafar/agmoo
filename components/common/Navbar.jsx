"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { useCustomerSession } from "@/components/account/useCustomerSession";
import BrandMark from "./BrandMark";
import { BLOGS_ENABLED } from "@/lib/features";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  ...(BLOGS_ENABLED ? [{ href: "/blogs", label: "Guides" }] : []),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, hydrated } = useCart();
  const { customer, loading: customerLoading, logout } = useCustomerSession();

  return (
    <header className="sticky top-0 z-40 border-b border-red-600/15 bg-white shadow-[0_1px_0_rgba(220,38,38,0.08)]">
      <div className="h-1 bg-red-600" />
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Agmoo home">
          <BrandMark />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-red-600 text-white"
                    : "text-slate-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 mr-1">
            {!customerLoading && customer ? (
              <>
                <Link
                  href="/account"
                  className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors max-w-[140px] truncate"
                  title={customer.name}
                >
                  {customer.name}
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="rounded-full px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : !customerLoading ? (
              <>
                <Link
                  href="/account"
                  className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/account?mode=register"
                  className="rounded-full px-3 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Sign up
                </Link>
              </>
            ) : null}
          </div>
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-red-600 hover:bg-red-50 transition-colors"
            aria-label="View cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.87-4.508 2.478-7.393L21.11 7.5H5.106M7.5 14.25L5.106 7.5m2.394 6.75l-1.87 6.53M7.5 14.25l1.87 6.53M6 21a.75.75 0 100-1.5.75.75 0 000 1.5zm12 0a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            </svg>
            {hydrated && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-red-100 bg-white animate-fade-in">
          <div className="container-app flex flex-col py-2">
            {LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 text-sm font-medium ${
                    active
                      ? "bg-red-600 text-white"
                      : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-red-100 mt-2 pt-2 flex flex-col gap-1">
              {customer ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-red-50"
                  >
                    Account · {customer.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/account?mode=register"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-semibold bg-red-600 text-white text-center hover:bg-red-700"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
