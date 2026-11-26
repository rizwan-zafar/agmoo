"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import CustomerAuthPanel from "@/components/account/CustomerAuthPanel";
import CustomerAuthLayout from "@/components/account/CustomerAuthLayout";
import { useCustomerSession } from "@/components/account/useCustomerSession";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import BrandMark from "@/components/common/BrandMark";

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { customer, loading, logout, refresh } = useCustomerSession();

  const mode = searchParams.get("mode") === "register" ? "register" : "login";
  const next = searchParams.get("next") || "/";

  if (loading) {
    return (
      <section className="auth-ambient min-h-[50vh] flex items-center justify-center">
        <Spinner label="Loading account..." />
      </section>
    );
  }

  if (customer) {
    return (
      <section className="auth-ambient py-10 sm:py-14">
        <div className="container-app max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 backdrop-blur-2xl shadow-[0_32px_80px_-20px_rgba(220,38,38,0.2)]">
            <header className="relative bg-gradient-to-br from-red-600 to-red-700 px-8 py-10 text-white overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_220px_at_100%_0%,rgba(255,255,255,0.2),transparent)]" />
              <BrandMark size="md" />
              <p className="relative mt-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                Your workspace
              </p>
              <h1 className="relative font-display text-3xl font-bold mt-1">{customer.name}</h1>
              {customer.shopName ? (
                <p className="relative text-white/90 mt-1 text-lg">{customer.shopName}</p>
              ) : null}
            </header>

            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard label="Phone" value={customer.phone} />
              <StatCard label="Shop" value={customer.shopName || "—"} />
              <div className="sm:col-span-2 rounded-2xl border border-red-100 bg-red-50/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-red-700">Delivery address</p>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">{customer.address}</p>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-8 flex flex-col sm:flex-row gap-3">
              <Button as={Link} href="/products" variant="secondary" className="flex-1 rounded-xl">
                Shop
              </Button>
              <Button as={Link} href="/checkout" className="flex-1 rounded-xl">
                Checkout
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="sm:w-auto rounded-xl"
                onClick={async () => {
                  await logout();
                  router.refresh();
                }}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <CustomerAuthLayout>
      <CustomerAuthPanel
        key={mode}
        initialMode={mode}
        loginSubmitLabel="Sign in"
        registerSubmitLabel="Create account"
        onSuccess={async () => {
          await refresh();
          router.push(next);
          router.refresh();
        }}
      />
    </CustomerAuthLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-ink-900 mt-1.5">{value}</p>
    </div>
  );
}