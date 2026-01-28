import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OpportunityScanner from "@/components/scanner/OpportunityScanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl">
          <OpportunityScanner />
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
