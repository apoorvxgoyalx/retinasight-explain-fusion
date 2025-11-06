import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Upload, Brain, Shield, Activity } from "lucide-react";
import UploadSection from "@/components/UploadSection";
import ResultsSection from "@/components/ResultsSection";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

export type AnalysisResult = {
  prediction: string;
  confidence: number;
  trustScore: number;
  heatmaps: {
    gradcam: string;
    lime: string;
    integratedGradients: string;
    fused: string;
  };
  diseaseInfo: {
    name: string;
    description: string;
    severity: "low" | "medium" | "high";
    recommendations: string[];
  };
};

const Index = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setShowUpload(false);
  };

  const handleNewScan = () => {
    setAnalysisResult(null);
    setShowUpload(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">RetinalAI</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="ghost" size="sm">How It Works</Button>
              <Button 
                onClick={() => setShowUpload(!showUpload)}
                size="sm"
                className="bg-gradient-primary"
              >
                <Upload className="mr-2 h-4 w-4" />
                New Scan
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {!showUpload && !analysisResult && <HeroSection onStartScan={() => setShowUpload(true)} />}
      
      {showUpload && !analysisResult && (
        <UploadSection onAnalysisComplete={handleAnalysisComplete} />
      )}

      {analysisResult && (
        <ResultsSection result={analysisResult} onNewScan={handleNewScan} />
      )}

      {!showUpload && !analysisResult && <FeaturesSection />}

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>RetinalAI • Explainable AI for Retinal Disease Detection</p>
          <p className="mt-2">For research and educational purposes only. Not for clinical diagnosis.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
