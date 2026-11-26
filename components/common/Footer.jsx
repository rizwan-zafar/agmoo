import Link from "next/link";
import BrandMark from "./BrandMark";

const footerLink =
  "text-white rounded-sm transition-colors hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const footerHeading = "text-sm font-bold text-white uppercase tracking-wide mb-3";

export default function Footer({
  footerTagline,
  footerAddress,
  footerPhone,
  footerEmail,
}) {
  return (
    <footer className="mt-20 bg-red-900 text-white border-t border-red-800">
      <div className="container-app py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-4 rounded-lg bg-white/95 p-2 inline-block">
            <BrandMark size="md" />
          </div>
          <p className="text-sm text-red-50 leading-relaxed">{footerTagline}</p>
        </div>

        <div>
          <h4 className={footerHeading}>Shop</h4>
          <ul className="space-y-2.5 text-sm text-white">
            <li>
              <Link href="/products" className={footerLink}>
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className={footerLink}>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" className={footerLink}>
                About Agmoo
              </Link>
            </li>
            <li>
              <Link href="/contact" className={footerLink}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={footerHeading}>Customer Care</h4>
          <ul className="space-y-2.5 text-sm text-white">
            <li>
              <Link href="/cart" className={footerLink}>
                My Cart
              </Link>
            </li>
            <li>
              <Link href="/checkout" className={footerLink}>
                Checkout
              </Link>
            </li>
            <li>
              <Link href="/account" className={footerLink}>
                Sign in / Sign up
              </Link>
            </li>
            <li>
              <span className="text-red-100">Cash on Delivery only</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={footerHeading}>Get in Touch</h4>
          <ul className="space-y-2.5 text-sm text-white">
            <li className="text-red-50">{footerAddress}</li>
            <li>
              <a href={`tel:${String(footerPhone).replace(/\s/g, "")}`} className={footerLink}>
                {footerPhone}
              </a>
            </li>
            <li>
              <a href={`mailto:${footerEmail}`} className={footerLink}>
                {footerEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/25 bg-red-950">
        <div className="container-app py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-red-100">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Agmoo. All rights reserved.
          </p>
          <p className="text-center">
            Powered by{" "}
            <a
              href="https://mayonity.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold text-white ${footerLink}`}
            >
              Mayonity
            </a>
          </p>
          <Link href="/admin/login" className={`text-center ${footerLink}`}>
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}