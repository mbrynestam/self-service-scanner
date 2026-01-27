import React from "react";
import ReactDOM from "react-dom/client";
import OpportunityScanner from "@/components/scanner/OpportunityScanner";
import "./index.css";

class BuyrScanner extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private mountPoint: HTMLDivElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Create a mount point for React
    this.mountPoint = document.createElement("div");
    this.mountPoint.setAttribute("id", "buyr-scanner-root");
    
    // Create style element and import all styles
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = this.getAttribute("css-url") || "";

    // Apply inline styles for the container
    const inlineStyles = document.createElement("style");
    inlineStyles.textContent = `
      :host {
        display: block;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      #buyr-scanner-root {
        min-height: 600px;
        background: hsl(240 10% 3.9%);
        color: hsl(0 0% 98%);
        padding: 2rem;
        border-radius: 1rem;
      }
      /* CSS custom properties for theming */
      #buyr-scanner-root {
        --background: 240 10% 3.9%;
        --foreground: 0 0% 98%;
        --card: 240 10% 3.9%;
        --card-foreground: 0 0% 98%;
        --popover: 240 10% 3.9%;
        --popover-foreground: 0 0% 98%;
        --primary: 142.1 76.2% 36.3%;
        --primary-foreground: 355.7 100% 97.3%;
        --secondary: 240 3.7% 15.9%;
        --secondary-foreground: 0 0% 98%;
        --muted: 240 3.7% 15.9%;
        --muted-foreground: 240 5% 64.9%;
        --accent: 240 3.7% 15.9%;
        --accent-foreground: 0 0% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 3.7% 15.9%;
        --input: 240 3.7% 15.9%;
        --ring: 142.1 76.2% 36.3%;
        --radius: 0.5rem;
      }
    `;

    this.shadowRoot?.appendChild(inlineStyles);
    if (styleLink.href) {
      this.shadowRoot?.appendChild(styleLink);
    }
    this.shadowRoot?.appendChild(this.mountPoint);

    // Mount React app
    this.root = ReactDOM.createRoot(this.mountPoint);
    this.root.render(
      <React.StrictMode>
        <OpportunityScanner embedded={true} />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    // Cleanup React
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
