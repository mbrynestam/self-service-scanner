import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import OpportunityScanner from "@/components/scanner/OpportunityScanner";

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

    // Create style element with CSS variables and base styles
    const styles = document.createElement("style");
    styles.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Flow+Circular&display=swap');
      
      :host {
        display: block;
        font-family: 'Flow Circular', system-ui, -apple-system, sans-serif;
      }
      
      #buyr-scanner-root {
        --background: 0 0% 5%;
        --foreground: 0 0% 100%;
        --card: 0 0% 10%;
        --card-foreground: 0 0% 100%;
        --popover: 0 0% 10%;
        --popover-foreground: 0 0% 100%;
        --primary: 145 89% 71%;
        --primary-foreground: 0 0% 5%;
        --secondary: 0 0% 15%;
        --secondary-foreground: 0 0% 100%;
        --muted: 0 0% 15%;
        --muted-foreground: 0 0% 65%;
        --accent: 145 89% 71%;
        --accent-foreground: 0 0% 5%;
        --destructive: 0 84% 60%;
        --destructive-foreground: 0 0% 100%;
        --border: 0 0% 18%;
        --input: 0 0% 18%;
        --ring: 145 89% 71%;
        --radius: 0.75rem;
        
        background: transparent;
        color: hsl(var(--foreground));
        font-family: 'Flow Circular', system-ui, -apple-system, sans-serif;
        font-size: 18px;
        line-height: 1.7;
      }
      
      #buyr-scanner-root * {
        box-sizing: border-box;
      }
    `;

    // Optional external CSS link
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
