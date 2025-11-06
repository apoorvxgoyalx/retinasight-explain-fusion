import { Button } from "@/components/ui/button";
import { Brain, Shield, Activity, Eye } from "lucide-react";

interface HeroSectionProps {
  onStartScan: () => void;
}

const HeroSection = ({ onStartScan }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-scan pointer-events-none" />
      
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Explainable AI Technology
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Advanced Retinal Disease Detection
            <span className="block text-primary mt-2">Powered by Explainable AI</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Accurate detection of Diabetic Retinopathy and Macular Edema using EfficientNet 
            with transparent, trustworthy predictions through advanced XAI methods.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={onStartScan}
              className="bg-gradient-primary text-lg h-14 px-8"
            >
              <Eye className="mr-2 h-5 w-5" />
              Start Analysis
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-2">95.8%</div>
              <div className="text-muted-foreground">Detection Accuracy</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-accent mb-2">4+</div>
              <div className="text-muted-foreground">XAI Methods</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-success mb-2">Real-time</div>
              <div className="text-muted-foreground">Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
