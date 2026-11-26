"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/components/common/ToastContext";
import CustomerAuthPanel from "@/components/account/CustomerAuthPanel";
import CustomerAuthLayout from "@/components/account/CustomerAuthLayout";
import { useCustomerSession } from "@/components/account/useCustomerSession";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import EmptyState from "@/components/common/EmptyState";
import Spinner from "@/components/common/Spinner";
import { formatCurrency } from "@/lib/utils";
import PageBanner from "@/components/common/PageBanner";

export default function CheckoutPage() {
  const { items, subtotal, hydrated, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const { customer, loading: authLoading, logout, refresh } = useCustomerSession();

  const [orderForm, setOrderForm] = useState({ email: "", address: "" });
  const [orderErrors, setOrderErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (customer) {
      setOrderForm((f) => ({
        ...f,
        address: customer.address || "",
      }));
    }
  }, [customer]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setOrderErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderForm,
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setOrderErrors(data.errors);
        if (res.status === 401) {
          showToast("Please sign in again to place your order.", "error");
        } else {
          showToast(data.error || "Could not place your order.", "error");
        }
        setSubmitting(false);
        return;
      }

      clearCart();
      showToast("Order placed successfully!");
      router.push(`/checkout/success?order=${data.order.orderNumber}`);
    } catch {
      showToast("Network error. Please try again.", "error");
      setSubmitting(false);
    }
  };

  if (!hydrated || authLoading) {
    return (
      <div className="container-app py-16">
        <Spinner label="Loading checkout..." />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-app py-10">
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Add some products to your cart before checking out."
          action={
            <Button as={Link} href="/products">
              Browse Products
            </Button>
          }
        />
      </div>
    );
  }

  const summary = (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 sticky top-24">
      <h2 className="font-semibold text-lg text-stone-800 mb-4">Order Summary</h2>
      <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.variantId} className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-brand-50 flex items-center justify-center flex-shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xl">⚡</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-800 line-clamp-1">{item.name}</p>
              <p className="text-xs text-stone-500">
                {item.variantName ? `${item.variantName} · ` : ""}Qty: {item.quantity}
              </p>
            </div>
            <span className="text-sm font-semibold text-stone-800">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between font-bold text-stone-800 text-lg">
        <span>Total</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
    </div>
  );

  if (!customer) {
    return (
      <div>
        <div className="container-app pt-6 pb-2">
          <h1 className="font-display text-2xl font-bold text-ink-900">Almost there</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in or sign up, then we&apos;ll ship your cart with COD.</p>
        </div>
        <div className="container-app grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start pb-10">
          <div className="xl:col-span-7 -mx-4 sm:mx-0">
            <CustomerAuthLayout compact>
              <CustomerAuthPanel
                loginSubmitLabel="Sign in to continue"
                registerSubmitLabel="Create account & continue"
                showIntro={false}
                onSuccess={async () => {
                  await refresh();
                  router.refresh();
                }}
              />
            </CustomerAuthLayout>
          </div>
          <div className="xl:col-span-5 xl:pt-6">{summary}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBanner title="Checkout" subtitle="Cash on Delivery — pay when the box lands." />
      <div className="container-app pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <form
            onSubmit={handleOrderSubmit}
            className="lg:col-span-2 rounded-2xl border border-stone-200 bg-white p-6 flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-lg text-stone-800">Delivery Details</h2>
                <p className="text-sm text-stone-500 mt-1">
                  Signed in as <span className="font-medium text-stone-700">{customer.name}</span>
                  {customer.shopName ? ` · ${customer.shopName}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await logout();
                  router.refresh();
                }}
                className="text-sm font-medium text-brand-700 hover:text-brand-800"
              >
                Sign out
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-stone-50 border border-stone-100 p-4 text-sm">
              <div>
                <p className="text-stone-500">Phone</p>
                <p className="font-medium text-stone-800">{customer.phone}</p>
              </div>
              <div>
                <p className="text-stone-500">Shop</p>
                <p className="font-medium text-stone-800">{customer.shopName}</p>
              </div>
            </div>

            <Input
              label="Email (optional)"
              name="email"
              type="email"
              value={orderForm.email}
              onChange={(e) => setOrderForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="For order updates — optional"
              error={orderErrors.email}
            />
            <Textarea
              label="Delivery address"
              name="address"
              rows={4}
              value={orderForm.address}
              onChange={(e) => setOrderForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="House #, Street, Area, City"
              error={orderErrors.address}
              required
            />

            <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <div>
                <p className="font-semibold text-brand-800 text-sm">Cash on Delivery</p>
                <p className="text-xs text-brand-700">Pay in cash when your order is delivered.</p>
              </div>
            </div>

            <Button type="submit" size="lg" loading={submitting} className="w-full mt-2">
              Place Order — {formatCurrency(subtotal)}
            </Button>
          </form>
          {summary}
        </div>
      </div>
    </div>
  );
}