import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/common/SiteChrome";
import { CartProvider } from "@/components/cart/CartContext";
import { ToastProvider } from "@/components/common/ToastContext";
import { getSiteSettings, pickFooterFields } from "@/lib/siteSettings";

const heading = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

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
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
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
