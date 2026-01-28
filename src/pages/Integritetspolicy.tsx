import Layout from "@/components/layout/Layout";

export default function Integritetspolicy() {
  return (
    <Layout>
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Integritetspolicy
            </h1>
            <p className="text-muted-foreground mb-8">
              Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  1. Inledning
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Buyr AB ("vi", "oss", "vår") värnar om din personliga integritet. Denna integritetspolicy 
                  förklarar hur vi samlar in, använder, lagrar och skyddar dina personuppgifter när du 
                  besöker vår webbplats och använder våra tjänster.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  2. Personuppgiftsansvarig
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Buyr AB är personuppgiftsansvarig för behandlingen av dina personuppgifter. 
                  Om du har frågor om hur vi hanterar dina uppgifter kan du kontakta oss via 
                  kontaktformuläret på vår webbplats.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  3. Vilka uppgifter vi samlar in
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vi kan samla in följande typer av personuppgifter:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Kontaktuppgifter (namn, e-postadress, telefonnummer, företagsnamn)</li>
                  <li>Information du lämnar via våra formulär och verktyg (t.ex. Opportunity Scanner)</li>
                  <li>Teknisk information (IP-adress, webbläsartyp, enhetsinformation)</li>
                  <li>Användningsdata (hur du navigerar på webbplatsen)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  4. Hur vi använder dina uppgifter
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vi använder dina personuppgifter för att:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Tillhandahålla och förbättra våra tjänster</li>
                  <li>Kommunicera med dig angående förfrågningar och bokningar</li>
                  <li>Skicka relevant information om våra tjänster (med ditt samtycke)</li>
                  <li>Analysera och förbättra webbplatsens funktionalitet</li>
                  <li>Uppfylla rättsliga förpliktelser</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  5. Rättslig grund för behandling
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi behandlar dina personuppgifter baserat på följande rättsliga grunder enligt GDPR: 
                  samtycke (när du fyller i formulär), berättigat intresse (för att förbättra våra tjänster), 
                  samt fullgörande av avtal (när du använder våra tjänster).
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  6. Delning av uppgifter
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi säljer aldrig dina personuppgifter. Vi kan dela uppgifter med betrodda 
                  tjänsteleverantörer som hjälper oss att driva vår verksamhet (t.ex. hosting, 
                  e-postleverantörer, CRM-system). Dessa parter är bundna av avtal att skydda 
                  dina uppgifter och får endast använda dem för att utföra tjänster åt oss.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  7. Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vår webbplats använder cookies för att förbättra din upplevelse och analysera 
                  webbplatstrafik. Du kan hantera dina cookie-inställningar i din webbläsare. 
                  Nödvändiga cookies krävs för att webbplatsen ska fungera korrekt.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  8. Lagring och säkerhet
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi lagrar dina personuppgifter endast så länge det är nödvändigt för de ändamål 
                  de samlades in för. Vi använder lämpliga tekniska och organisatoriska säkerhetsåtgärder 
                  för att skydda dina uppgifter mot obehörig åtkomst, förlust eller missbruk.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  9. Dina rättigheter
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Enligt GDPR har du följande rättigheter:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Rätt till tillgång – få information om vilka uppgifter vi har om dig</li>
                  <li>Rätt till rättelse – korrigera felaktiga uppgifter</li>
                  <li>Rätt till radering – begära att dina uppgifter raderas</li>
                  <li>Rätt till begränsning – begränsa behandlingen av dina uppgifter</li>
                  <li>Rätt till dataportabilitet – få dina uppgifter i ett strukturerat format</li>
                  <li>Rätt att invända – motsätta dig viss behandling</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  För att utöva dina rättigheter, kontakta oss via kontaktformuläret.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  10. Ändringar i policyn
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi kan uppdatera denna integritetspolicy vid behov. Väsentliga ändringar 
                  kommer att meddelas på webbplatsen. Vi rekommenderar att du regelbundet 
                  granskar denna policy.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  11. Kontakt
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Om du har frågor om denna integritetspolicy eller hur vi hanterar dina 
                  personuppgifter, vänligen kontakta oss via kontaktformuläret på vår webbplats 
                  eller via e-post.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
