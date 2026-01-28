import { Link } from "react-router-dom";

const footerLinks = {
  produkt: [
    { name: "Self-service för B2B", href: "/losning" },
    { name: "Så funkar det", href: "/sa-funkar-det" },
    { name: "Priser", href: "/priser" },
  ],
  foretag: [
    { name: "Om oss", href: "/om-oss" },
    { name: "Kontakt", href: "/kontakt" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <img 
                src="/assets/buyr-logo.png" 
                alt="Buyr" 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              En del av{" "}
              <a 
                href="https://grown.se" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline underline-offset-2"
              >
                Grown
              </a>
            </p>
            <p className="text-muted-foreground max-w-md">
              Vi hjälper B2B-företag bygga self-service tools som låter köpare utforska, utvärdera och ta beslut – på egna villkor.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Produkt</h4>
            <ul className="space-y-3">
              {footerLinks.produkt.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Företag</h4>
            <ul className="space-y-3">
              {footerLinks.foretag.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026{" "}
            <a 
              href="https://grown.se" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              Grown
            </a>
            . Alla rättigheter förbehållna.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/integritetspolicy" className="hover:text-primary transition-colors">Integritetspolicy</Link>
            <Link to="/villkor" className="hover:text-primary transition-colors">Villkor</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
