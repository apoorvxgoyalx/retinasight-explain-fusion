import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { AnalysisResult } from "@/pages/Index";

interface UploadSectionProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const UploadSection = ({ onAnalysisComplete }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    toast.success("Image loaded successfully");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    toast.info("Analyzing OCT scan...");

    // Simulate analysis delay
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        prediction: "Diabetic Retinopathy",
        confidence: 94.2,
        trustScore: 87.5,
        heatmaps: {
          gradcam: previewUrl || "",
          lime: previewUrl || "",
          integratedGradients: previewUrl || "",
          fused: previewUrl || ""
        },
        diseaseInfo: {
          name: "Diabetic Retinopathy",
          description: "Diabetic retinopathy is a diabetes complication that affects eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).",
          severity: "medium",
          recommendations: [
            "Consult with an ophthalmologist for detailed examination",
            "Monitor blood sugar levels regularly",
            "Schedule follow-up OCT scans every 3-6 months",
            "Consider laser treatment if condition progresses"
          ]
        }
      };

      setIsAnalyzing(false);
      toast.success("Analysis complete!");
      onAnalysisComplete(mockResult);
    }, 3000);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Upload OCT Scan</h2>
          <p className="text-muted-foreground">
            Upload a retinal OCT image for AI-powered disease detection
          </p>
        </div>

        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            Supported formats: JPG, PNG, DICOM. For best results, use high-resolution OCT scans.
          </AlertDescription>
        </Alert>

        <Card className="border-2 border-dashed border-border p-8">
          <div
            className={`text-center ${isDragging ? "bg-primary/5" : ""} transition-colors rounded-lg p-8`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!previewUrl ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Drag and drop your OCT scan here
                </h3>
                <p className="text-muted-foreground mb-6">or</p>
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Browse Files
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </>
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden bg-muted">
                  <img
                    src={previewUrl}
                    alt="OCT scan preview"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <label htmlFor="file-upload-replace">
                    <Button variant="outline" asChild>
                      <span>Change Image</span>
                    </Button>
                  </label>
                  <input
                    id="file-upload-replace"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <Button
                    onClick={simulateAnalysis}
                    disabled={isAnalyzing}
                    className="bg-gradient-primary"
                  >
                    {isAnalyzing ? (
                      <>Analyzing...</>
                    ) : (
                      <>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Analyze Scan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default UploadSection;
