import { Brain, Eye, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "EfficientNet Architecture",
      description: "State-of-the-art deep learning model optimized for medical image analysis with superior accuracy.",
      color: "text-primary"
    },
    {
      icon: Eye,
      title: "Multiple XAI Methods",
      description: "Grad-CAM, LIME, and Integrated Gradients provide comprehensive visual explanations of predictions.",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "Heatmap Fusion",
      description: "Novel fusion technique combines multiple saliency maps for clearer, more reliable visual explanations.",
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Trust Score Metrics",
      description: "Quantifiable confidence measurements help assess the reliability of each prediction.",
      color: "text-success"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explainable AI Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our system combines cutting-edge deep learning with interpretability methods 
            to provide trustworthy, transparent diagnoses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`h-12 w-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* XAI Methods Explanation */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">How XAI Methods Work</CardTitle>
              <CardDescription>Understanding our explainability techniques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 bg-primary rounded-full" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Grad-CAM</h3>
                  <p className="text-muted-foreground text-sm">
                    Highlights regions in the image that most influenced the model's decision, 
                    showing where the network is "looking" when making predictions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 bg-accent rounded-full" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">LIME</h3>
                  <p className="text-muted-foreground text-sm">
                    Creates interpretable explanations by testing which regions of the image 
                    are most important through systematic perturbations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 bg-warning rounded-full" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Integrated Gradients</h3>
                  <p className="text-muted-foreground text-sm">
                    Attributes prediction scores to input features by integrating gradients 
                    along the path from a baseline to the input image.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 bg-success rounded-full" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fused Heatmap</h3>
                  <p className="text-muted-foreground text-sm">
                    Combines insights from all methods using our novel fusion technique, 
                    providing a comprehensive and reliable visual explanation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
