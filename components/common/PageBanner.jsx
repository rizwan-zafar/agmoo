export default function PageBanner({ title, subtitle }) {
  return (
    <section className="bg-red-600 text-white py-10 mb-10">
      <div className="container-app">
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        {subtitle ? <p className="text-white/85 mt-1">{subtitle}</p> : null}
      </div>
    </section>
  );
}
