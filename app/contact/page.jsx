import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | Agmoo",
  description: "Get in touch with Agmoo for orders, product questions, and support.",
};

const INFO = [
  { icon: "📍", title: "Our Address", detail: "Lahore, Pakistan" },
  { icon: "📞", title: "Phone", detail: "+92 300 1234567" },
  { icon: "✉️", title: "Email", detail: "support@agmoo.com" },
  { icon: "🕒", title: "Working Hours", detail: "Mon - Sat: 9:00 AM - 8:00 PM" },
];

export default function ContactPage() {
  return (
    <div>
      <section className="bg-red-600 text-white py-12 mb-10">
        <div className="container-app">
          <h1 className="font-display text-3xl font-bold">Contact Us</h1>
          <p className="text-white/85 mt-1">Questions about an order or a product? We&apos;re here.</p>
        </div>
      </section>

      <div className="container-app pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-2xl border border-red-100 bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(220,38,38,0.08)]">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-4">
            {INFO.map((item) => (
              <div key={item.title} className="rounded-2xl border border-red-100 bg-white p-6 flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-2xl">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
