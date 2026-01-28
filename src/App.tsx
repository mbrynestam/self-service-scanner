import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Losning from "./pages/Losning";
import SaFunkarDet from "./pages/SaFunkarDet";
import Priser from "./pages/Priser";
import OmOss from "./pages/OmOss";
import Kontakt from "./pages/Kontakt";
import Embed from "./pages/Embed";
import Integritetspolicy from "./pages/Integritetspolicy";
import Villkor from "./pages/Villkor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/losning" element={<Losning />} />
          <Route path="/sa-funkar-det" element={<SaFunkarDet />} />
          <Route path="/priser" element={<Priser />} />
          <Route path="/om-oss" element={<OmOss />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/embed" element={<Embed />} />
          <Route path="/integritetspolicy" element={<Integritetspolicy />} />
          <Route path="/villkor" element={<Villkor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
