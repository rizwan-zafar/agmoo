"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useCustomerSession() {
  const pathname = usePathname();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/customer/me");
      const data = await res.json();
      setCustomer(data.customer || null);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [pathname, refresh]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/customer/logout", { method: "POST" });
    setCustomer(null);
  }, []);

  return { customer, loading, refresh, logout };
}