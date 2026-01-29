import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import OpportunityScanner from "@/components/scanner/OpportunityScanner";
import indexCss from "@/index.css?inline";

const queryClient = new QueryClient();

class BuyrScanner extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private mountPoint: HTMLDivElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    this.mountPoint.setAttribute("id", "buyr-scanner-root");

    // Create style element with inlined Tailwind CSS
    const styles = document.createElement("style");
    styles.textContent = indexCss;

    // Optional external CSS link for customization
    const cssUrl = this.getAttribute("css-url");
    if (cssUrl) {
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = cssUrl;
      this.shadowRoot?.appendChild(styleLink);
    }

    this.shadowRoot?.appendChild(styles);
    this.shadowRoot?.appendChild(this.mountPoint);

    // Mount React app
    this.root = ReactDOM.createRoot(this.mountPoint);
    this.root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <OpportunityScanner embedded={true} />
          </TooltipProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

// Register the custom element
if (!customElements.get("buyr-scanner")) {
  customElements.define("buyr-scanner", BuyrScanner);
}

export { BuyrScanner };
