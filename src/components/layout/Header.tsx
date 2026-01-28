import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Self-service för B2B", href: "/losning" },
  { name: "Så funkar det", href: "/sa-funkar-det" },
  { name: "Priser", href: "/priser" },
  { name: "Om oss", href: "/om-oss" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 lg:py-4">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/assets/buyr-logo.png" alt="Buyr" className="h-12" />
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-lg font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === link.href
                    ? "text-primary bg-secondary/50"
                    : "text-[#f3f3f3] hover:bg-secondary/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/kontakt">Boka strategisamtal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-bold px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === link.href
                      ? "text-primary bg-secondary/50"
                      : "text-[#f3f3f3] hover:bg-secondary/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="hero" size="lg" className="mt-4" asChild>
                <Link to="/kontakt" onClick={() => setMobileOpen(false)}>
                  Boka strategisamtal
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
