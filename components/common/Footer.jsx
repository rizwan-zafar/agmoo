import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer({
  footerTagline,
  footerAddress,
  footerPhone,
  footerEmail,
}) {
  return (
    <footer className="mt-20 bg-red-700 text-white">
      <div className="container-app py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-4">
            <BrandMark light />
          </div>
          <p className="text-sm text-white/80 leading-relaxed">{footerTagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
            Shop
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Agmoo</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
            Customer Care
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-white transition-colors">Checkout</Link></li>
            <li><span className="text-white/60">Cash on Delivery only</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
            Get in Touch
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>{footerAddress}</li>
            <li>{footerPhone}</li>
            <li>
              <a href={`mailto:${footerEmail}`} className="hover:text-white transition-colors">
                {footerEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 bg-red-800">
        <div className="container-app py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/70">
          <p>&copy; {new Date().getFullYear()} Agmoo. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://mayonity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:opacity-90 transition-opacity underline-offset-2 hover:underline"
            >
              Mayonity
            </a>
          </p>
          <Link href="/admin/login" className="hover:text-white transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
