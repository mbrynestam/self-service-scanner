import Layout from "@/components/layout/Layout";

export default function Villkor() {
  return (
    <Layout>
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Allmänna villkor
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
                  Dessa allmänna villkor ("Villkoren") reglerar din användning av webbplatsen 
                  buyr.se och de tjänster som tillhandahålls av Buyr AB ("vi", "oss", "vår"). 
                  Genom att använda webbplatsen accepterar du dessa villkor.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  2. Tjänstebeskrivning
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Buyr erbjuder tjänster inom AI-driven prototyping och utveckling av 
                  self-service-verktyg för B2B-företag. Våra tjänster inkluderar rådgivning, 
                  workshoppar, prototyputveckling och implementering av digitala lösningar.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  3. Användning av webbplatsen
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Du förbinder dig att använda webbplatsen endast för lagliga ändamål och på 
                  ett sätt som inte inkräktar på andras rättigheter. Du får inte:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Använda webbplatsen för olagliga eller otillåtna ändamål</li>
                  <li>Försöka få obehörig åtkomst till webbplatsens system eller nätverk</li>
                  <li>Sprida skadlig programvara eller störa webbplatsens funktion</li>
                  <li>Kopiera, reproducera eller distribuera innehåll utan tillstånd</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  4. Immateriella rättigheter
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Allt innehåll på webbplatsen, inklusive text, grafik, logotyper, bilder och 
                  programvara, är skyddat av upphovsrätt och andra immateriella rättigheter 
                  som tillhör Buyr AB eller våra licensgivare. Du får inte använda, kopiera 
                  eller distribuera detta innehåll utan vårt skriftliga medgivande.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  5. Verktyg och analysresultat
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  De verktyg och analysresultat som tillhandahålls på webbplatsen (t.ex. 
                  Opportunity Scanner) är avsedda som vägledning och information. Resultaten 
                  utgör inte professionell rådgivning och bör inte ensamt ligga till grund 
                  för affärsbeslut. Vi garanterar inte resultats exakthet eller fullständighet.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  6. Ansvarsbegränsning
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Webbplatsen och dess innehåll tillhandahålls "i befintligt skick" utan 
                  garantier av något slag. Vi ansvarar inte för direkta, indirekta, 
                  tillfälliga eller följdskador som uppstår genom användning av webbplatsen 
                  eller våra tjänster, i den utsträckning lagen tillåter.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  7. Länkar till tredje part
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Webbplatsen kan innehålla länkar till externa webbplatser. Vi ansvarar inte 
                  för innehållet på dessa webbplatser och rekommenderar att du läser deras 
                  villkor och integritetspolicyer separat.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  8. Ändringar av villkoren
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi förbehåller oss rätten att när som helst ändra dessa villkor. Ändringar 
                  träder i kraft när de publiceras på webbplatsen. Din fortsatta användning 
                  av webbplatsen efter ändringar innebär att du accepterar de nya villkoren.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  9. Tillämplig lag och tvister
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dessa villkor regleras av svensk lag. Eventuella tvister som uppstår i 
                  samband med dessa villkor ska i första hand lösas genom förhandling. 
                  Om parterna inte kan enas, ska tvisten avgöras av svensk allmän domstol.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  10. Avtalstid och uppsägning
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dessa villkor gäller så länge du använder webbplatsen. Vi förbehåller oss 
                  rätten att när som helst och utan förvarning stänga av eller begränsa din 
                  åtkomst till webbplatsen om du bryter mot dessa villkor.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  11. Kontakt
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Om du har frågor om dessa villkor, vänligen kontakta oss via 
                  kontaktformuläret på vår webbplats.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
