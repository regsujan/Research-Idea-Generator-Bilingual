import { useState } from "react";
import { Beaker, BookOpen, GraduationCap, Lightbulb, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ResearchForm from "@/components/ResearchForm";
import IdeaCard from "@/components/IdeaCard";
import type { ResearchIdea } from "@/lib/mockData";
import heroBg from "@/assets/hero-bg.jpg";
import ideaIcon from "@/assets/idea-icon.png";
import researchDesk from "@/assets/research-desk.jpg";

const STATS = [
  { label: "Research Fields", value: "120+", icon: BookOpen },
  { label: "Ideas Generated", value: "50K+", icon: Lightbulb },
  { label: "Universities", value: "300+", icon: GraduationCap },
];

const STEPS = [
  {
    number: "01",
    title: "Define Your Scope",
    description: "Tell us your field, education level, and research interests.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our AI analyzes trends, gaps, and emerging topics in your field.",
  },
  {
    number: "03",
    title: "Get Ideas",
    description: "Receive 5 tailored thesis ideas with feasibility scores and methodology.",
  },
];

const Index = () => {
  const [ideas, setIdeas] = useState<ResearchIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (formData: {
    level: string;
    field: string;
    interests: string;
    recentPapers: string;
  }) => {
    setIsLoading(true);
    setIdeas([]);

    try {
      const { data, error } = await supabase.functions.invoke("generate-ideas", {
        body: formData,
      });

      if (error) throw error;

      if (data?.error) {
        throw new Error(data.error);
      }

      setIdeas(data.ideas);
    } catch (error) {
      console.error("Generation failed:", error);
      toast({
        title: "Generation Failed",
        description:
          "Something went wrong while generating research ideas. Please try again.",
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
            <h1 className="text-lg font-bold leading-tight">
              Research Idea Generator
            </h1>
            <p className="text-xs text-muted-foreground">
              Discover compelling thesis topics tailored to your expertise
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background" />
        <div className="relative container max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Research Discovery
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight tracking-tight">
                Find Your Next
                <br />
                <span className="text-accent">Breakthrough Idea</span>
              </h2>
              <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl leading-relaxed">
                Leverage artificial intelligence to discover untapped research
                directions, complete with feasibility analysis and experiment
                design frameworks.
              </p>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <img
                src={ideaIcon}
                alt="Research concept illustration"
                className="w-56 h-56 drop-shadow-2xl"
                width={512}
                height={512}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center md:text-left space-y-1"
              >
                <div className="flex items-center justify-center md:justify-start gap-1.5">
                  <stat.icon className="h-4 w-4 text-accent" />
                  <span className="text-2xl font-bold text-primary-foreground">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs text-primary-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/50 border-y border-border/30">
        <div className="container max-w-6xl mx-auto px-4 py-14">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.number} className="flex gap-4 items-start">
                <span className="text-3xl font-bold text-primary/20 leading-none">
                  {step.number}
                </span>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container max-w-6xl mx-auto px-4 py-12 space-y-14">
        {/* Form + Image Side by Side */}
        <section className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <ResearchForm onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-2 hidden lg:block">
            <div className="rounded-xl overflow-hidden shadow-lg border border-border/40">
              <img
                src={researchDesk}
                alt="Research workspace with papers and laptop"
                className="w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center italic">
              Turn your academic curiosity into a structured research plan
            </p>
          </div>
        </section>

        {/* Results */}
        {ideas.length > 0 && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Lightbulb className="h-3.5 w-3.5" />
                Results Ready
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Generated Research Ideas
              </h2>
              <p className="text-sm text-muted-foreground">
                {ideas.length} ideas tailored to your profile — explore
                feasibility, novelty, and experiment designs below.
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

      {/* Footer */}
      <footer className="border-t border-border/40 bg-secondary/30">
        <div className="container max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Beaker className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">
              Research Idea Generator
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Powered by AI · Built for students and researchers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
