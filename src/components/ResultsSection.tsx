import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  CheckCircle2, 
  Upload, 
  Brain, 
  Shield, 
  Activity,
  Eye
} from "lucide-react";
import { AnalysisResult } from "@/pages/Index";

interface ResultsSectionProps {
  result: AnalysisResult;
  onNewScan: () => void;
}

const ResultsSection = ({ result, onNewScan }: ResultsSectionProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Analysis Results</h2>
            <p className="text-muted-foreground">Comprehensive AI-powered diagnosis with XAI explanations</p>
          </div>
          <Button onClick={onNewScan} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            New Scan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Results Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prediction Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Diagnosis
                  </CardTitle>
                  <Badge variant={getSeverityColor(result.diseaseInfo.severity)}>
                    {result.diseaseInfo.severity.toUpperCase()} SEVERITY
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {result.prediction}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {result.diseaseInfo.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-semibold text-foreground">{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* XAI Heatmaps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-accent" />
                  Explainable AI Visualizations
                </CardTitle>
                <CardDescription>
                  Multiple saliency maps showing which regions influenced the prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="fused" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="fused">Fused</TabsTrigger>
                    <TabsTrigger value="gradcam">Grad-CAM</TabsTrigger>
                    <TabsTrigger value="lime">LIME</TabsTrigger>
                    <TabsTrigger value="ig">Int. Gradients</TabsTrigger>
                  </TabsList>
                  <TabsContent value="fused" className="mt-4">
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden bg-muted border border-border">
                        <img
                          src={result.heatmaps.fused}
                          alt="Fused heatmap"
                          className="w-full h-auto opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Combined visualization using novel fusion technique for comprehensive analysis
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="gradcam" className="mt-4">
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden bg-muted border border-border">
                        <img
                          src={result.heatmaps.gradcam}
                          alt="Grad-CAM heatmap"
                          className="w-full h-auto opacity-80"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Gradient-weighted Class Activation Mapping highlights key decision regions
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="lime" className="mt-4">
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden bg-muted border border-border">
                        <img
                          src={result.heatmaps.lime}
                          alt="LIME heatmap"
                          className="w-full h-auto opacity-80"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Local Interpretable Model-agnostic Explanations through perturbation analysis
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="ig" className="mt-4">
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden bg-muted border border-border">
                        <img
                          src={result.heatmaps.integratedGradients}
                          alt="Integrated Gradients heatmap"
                          className="w-full h-auto opacity-80"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Attribution method integrating gradients along the baseline-to-input path
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-success" />
                  Clinical Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.diseaseInfo.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Score */}
            <Card className="border-2 border-success/20 bg-gradient-trust">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5" />
                  Trust Score
                </CardTitle>
                <CardDescription className="text-white/80">
                  Reliability metric for this prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-5xl font-bold mb-2 text-white`}>
                    {result.trustScore}
                  </div>
                  <p className="text-sm text-white/80 mb-4">out of 100</p>
                  <Progress value={result.trustScore} className="h-3 bg-white/20" />
                  <p className="text-xs text-white/70 mt-4">
                    High trust score indicates strong model confidence and consistent XAI explanations
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Alert */}
            <Alert variant={result.diseaseInfo.severity === "high" ? "destructive" : "default"}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Medical Notice</AlertTitle>
              <AlertDescription className="text-sm">
                This is an AI-assisted analysis for research purposes. Always consult qualified 
                healthcare professionals for clinical diagnosis and treatment decisions.
              </AlertDescription>
            </Alert>

            {/* Model Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Model Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Architecture</span>
                  <span className="font-medium">EfficientNet-B4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dataset</span>
                  <span className="font-medium">OCT2017</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-medium text-success">95.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">XAI Methods</span>
                  <span className="font-medium">4 Combined</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
