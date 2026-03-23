import { useState } from "react";
import { Beaker } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResearchForm from "@/components/ResearchForm";
import IdeaCard from "@/components/IdeaCard";
import { generateMockIdeas, type ResearchIdea } from "@/lib/mockData";

const Index = () => {
  const [ideas, setIdeas] = useState<ResearchIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (data: {
    level: string;
    field: string;
    interests: string;
    recentPapers: string;
  }) => {
    setIsLoading(true);
    setIdeas([]);

    try {
      // ────────────────────────────────────────────────────────────────
      // TODO: Replace the mock call below with your GoogleGenerativeAI
      // SDK call. For example:
      //
      // import { GoogleGenerativeAI } from "@google/generative-ai";
      // const genAI = new GoogleGenerativeAI(YOUR_API_KEY);
      // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      // const prompt = buildPrompt(data);
      // const result = await model.generateContent(prompt);
      // const parsed: ResearchIdea[] = JSON.parse(result.response.text());
      // setIdeas(parsed);
      //
      // ────────────────────────────────────────────────────────────────

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockIdeas = generateMockIdeas(data.field || "Science", data.interests || "emerging technologies");
      setIdeas(mockIdeas);
    } catch (error) {
      console.error("Generation failed:", error);
      toast({
        title: "Generation Failed",
        description: "Something went wrong while generating research ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto flex items-center gap-3 py-4 px-4">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10">
            <Beaker className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold leading-tight">Research Idea Generator</h1>
            <p className="text-xs font-sans text-muted-foreground">
              Discover compelling thesis topics tailored to your expertise
            </p>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Form */}
        <section className="max-w-2xl mx-auto">
          <ResearchForm onSubmit={handleGenerate} isLoading={isLoading} />
        </section>

        {/* Results */}
        {ideas.length > 0 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-serif font-bold">Generated Research Ideas</h2>
              <p className="text-sm font-sans text-muted-foreground mt-1">
                {ideas.length} ideas tailored to your profile
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ideas.map((idea, i) => (
                <IdeaCard key={i} idea={idea} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
