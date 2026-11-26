"use client";

import { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import { useToast } from "@/components/common/ToastContext";

const loginEmpty = { phone: "", password: "" };
const registerEmpty = {
  name: "",
  shopName: "",
  address: "",
  phone: "",
  confirmPhone: "",
  password: "",
  confirmPassword: "",
};

export default function CustomerAuthPanel({
  initialMode = "login",
  onSuccess,
  loginSubmitLabel = "Sign in",
  registerSubmitLabel = "Create account",
  showIntro = true,
}) {
  const { showToast } = useToast();
  const [authMode, setAuthMode] = useState(initialMode);
  const [loginForm, setLoginForm] = useState(loginEmpty);
  const [registerForm, setRegisterForm] = useState(registerEmpty);
  const [authErrors, setAuthErrors] = useState({});
  const [authSubmitting, setAuthSubmitting] = useState(false);

  useEffect(() => {
    setAuthMode(initialMode);
  }, [initialMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthErrors({});
    setAuthSubmitting(true);
    try {
      const res = await fetch("/api/auth/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setAuthErrors(data.errors);
        showToast(data.error || "Could not sign in", "error");
        return;
      }
      showToast("Signed in");
      onSuccess?.(data.customer);
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthErrors({});
    setAuthSubmitting(true);
    try {
      const res = await fetch("/api/auth/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setAuthErrors(data.errors);
        showToast(data.error || "Could not create account", "error");
        return;
      }
      showToast("Account created");
      onSuccess?.(data.customer);
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setAuthSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-red-600 mb-5">
        Agmoo buyers
      </p>

      <fieldset className="flex justify-center mb-6">
        <legend className="sr-only">Account mode</legend>
        <div className="inline-flex p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80">
          <ModeTab active={authMode === "login"} onClick={() => switchMode("login", setAuthMode, setAuthErrors)}>
            Sign in
          </ModeTab>
          <ModeTab active={authMode === "register"} onClick={() => switchMode("register", setAuthMode, setAuthErrors)}>
            Sign up
          </ModeTab>
        </div>
      </fieldset>

      {showIntro ? (
        <header className="text-center max-w-lg mx-auto mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 tracking-tight">
            {authMode === "login" ? "Welcome back" : "Join Agmoo"}
          </h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base leading-relaxed">
            {authMode === "login"
              ? "Sign in with your phone and password to checkout faster."
              : "One account for COD orders — profile, shop, and delivery in one place."}
          </p>
        </header>
      ) : null}

      {authMode === "login" ? (
        <div key="login" className="max-w-md mx-auto animate-fade-in">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <FieldGroup>
              <Input
                label="Phone number"
                name="phone"
                type="tel"
                value={loginForm.phone}
                onChange={(e) => setLoginForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="0300 1234567"
                error={authErrors.phone}
                className="rounded-xl py-3"
                required
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                error={authErrors.password}
                className="rounded-xl py-3"
                required
              />
            </FieldGroup>
            <Button
              type="submit"
              size="lg"
              loading={authSubmitting}
              className="w-full mt-2 rounded-xl shadow-lg shadow-red-600/25"
            >
              {loginSubmitLabel}
            </Button>
          </form>
        </div>
      ) : (
        <form key="register" onSubmit={handleRegister} className="animate-fade-in flex flex-col gap-5">
          <BentoSection title="Profile" subtitle="Who you are and where you sell">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full name"
                name="name"
                value={registerForm.name}
                onChange={(e) => setRegisterForm((f) => ({ ...f, name: e.target.value }))}
                error={authErrors.name}
                className="rounded-xl py-3"
                required
              />
              <Input
                label="Shop name"
                name="shopName"
                value={registerForm.shopName}
                onChange={(e) => setRegisterForm((f) => ({ ...f, shopName: e.target.value }))}
                error={authErrors.shopName}
                className="rounded-xl py-3"
                required
              />
            </div>
            <Textarea
              label="Business address"
              name="address"
              rows={2}
              value={registerForm.address}
              onChange={(e) => setRegisterForm((f) => ({ ...f, address: e.target.value }))}
              error={authErrors.address}
              className="rounded-xl"
              required
            />
          </BentoSection>

          <BentoSection title="Contact" subtitle="Used for login and order updates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm((f) => ({ ...f, phone: e.target.value }))}
                error={authErrors.phone}
                className="rounded-xl py-3"
                required
              />
              <Input
                label="Confirm phone"
                name="confirmPhone"
                type="tel"
                value={registerForm.confirmPhone}
                onChange={(e) => setRegisterForm((f) => ({ ...f, confirmPhone: e.target.value }))}
                error={authErrors.confirmPhone}
                className="rounded-xl py-3"
                required
              />
            </div>
          </BentoSection>

          <BentoSection title="Security" subtitle="Minimum 6 characters">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm((f) => ({ ...f, password: e.target.value }))}
                error={authErrors.password}
                className="rounded-xl py-3"
                required
              />
              <Input
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                error={authErrors.confirmPassword}
                className="rounded-xl py-3"
                required
              />
            </div>
          </BentoSection>

          <Button
            type="submit"
            size="lg"
            loading={authSubmitting}
            className="w-full rounded-xl shadow-lg shadow-red-600/25 mt-1"
          >
            {registerSubmitLabel}
          </Button>
        </form>
      )}
    </div>
  );
}

function switchMode(mode, setAuthMode, setAuthErrors) {
  setAuthMode(mode);
  setAuthErrors({});
}

function ModeTab({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-[7.5rem] rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active ? "bg-white text-red-700 shadow-md shadow-red-600/10" : "text-slate-500 hover:text-slate-800"
      }`}
    >
      {children}
    </button>
  );
}

function BentoSection({ title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-900">{title}</h2>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function FieldGroup({ children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4 sm:p-5 flex flex-col gap-4">{children}</div>
  );
}