export default function CustomerAuthLayout({ children, compact = false }) {
  return (
    <section className={`relative auth-ambient ${compact ? "py-6" : "py-10 sm:py-14"}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      <div className={`container-app relative ${compact ? "px-0 sm:px-4" : ""}`}>
        <div className={`mx-auto ${compact ? "max-w-full" : "max-w-3xl lg:max-w-4xl"}`}>
          <div
            className={`relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 backdrop-blur-2xl shadow-[0_32px_80px_-20px_rgba(220,38,38,0.22)] ${
              compact ? "p-5 sm:p-7" : "p-6 sm:p-9 lg:p-10"
            }`}
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-red-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-red-300/15 blur-3xl" />
            <div className="relative animate-fade-in">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}