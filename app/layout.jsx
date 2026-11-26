import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import SiteChrome from "@/components/common/SiteChrome";
import { CartProvider } from "@/components/cart/CartContext";
import { ToastProvider } from "@/components/common/ToastContext";
import { getSiteSettings, pickFooterFields } from "@/lib/siteSettings";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Agmoo | Mobile Accessories for Everyday Speed",
  description:
    "Shop charging cables, adapters, earbuds, handsfree and power banks from Agmoo. Fast, durable accessories with Cash on Delivery across Pakistan.",
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default async function RootLayout({ children }) {
  const footer = pickFooterFields(await getSiteSettings());

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ToastProvider>
          <CartProvider>
            <SiteChrome footer={footer}>{children}</SiteChrome>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}