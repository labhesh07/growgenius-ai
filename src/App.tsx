
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Results from "./pages/Results";
import DiseaseDetection from "./pages/DiseaseDetection";
import NotFound from "./pages/NotFound";
import { RecommendationProvider } from "./context/RecommendationContext";
import { DiseaseDetectionProvider } from "./context/DiseaseDetectionContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RecommendationProvider>
        <DiseaseDetectionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/results" element={<Results />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DiseaseDetectionProvider>
      </RecommendationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
