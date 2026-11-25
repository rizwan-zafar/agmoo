"use client";

import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Spinner from "@/components/common/Spinner";
import { useToast } from "@/components/common/ToastContext";

const emptyForm = {
  footerTagline: "",
  footerAddress: "",
  footerPhone: "",
  footerEmail: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/site-settings");
        const data = await res.json();
        if (!res.ok) throw new Error();
        if (active && data.settings) {
          setForm(data.settings);
        }
      } catch {
        showToast("Failed to load site settings", "error");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        showToast(data.error || "Could not save settings", "error");
        return;
      }

      setForm(data.settings);
      showToast("Footer content saved");
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-desk">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="admin-desk">
      <p className="admin-muted max-w-2xl">
        Storefront footer copy under the logo and in Get in Touch.
      </p>

      <form onSubmit={handleSubmit} className="admin-form max-w-2xl">
        <fieldset className="admin-form-section">
          <legend className="admin-form-section-title">Brand column</legend>
          <Textarea
            label="Tagline under logo"
            rows={4}
            value={form.footerTagline}
            onChange={(e) => setForm((f) => ({ ...f, footerTagline: e.target.value }))}
            error={errors.footerTagline}
            required
          />
        </fieldset>

        <fieldset className="admin-form-section">
          <legend className="admin-form-section-title">Get in Touch</legend>
          <div className="admin-form-fields">
            <Input
              label="Address"
              value={form.footerAddress}
              onChange={(e) => setForm((f) => ({ ...f, footerAddress: e.target.value }))}
              error={errors.footerAddress}
              required
            />
            <Input
              label="Phone"
              value={form.footerPhone}
              onChange={(e) => setForm((f) => ({ ...f, footerPhone: e.target.value }))}
              error={errors.footerPhone}
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.footerEmail}
              onChange={(e) => setForm((f) => ({ ...f, footerEmail: e.target.value }))}
              error={errors.footerEmail}
              required
            />
          </div>
        </fieldset>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <Button type="submit" loading={saving}>
            Save footer
          </Button>
        </div>
      </form>
    </div>
  );
}