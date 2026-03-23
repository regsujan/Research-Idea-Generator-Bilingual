import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FlaskConical, Lightbulb, Target, ArrowRight } from "lucide-react";
import type { ResearchIdea } from "@/lib/mockData";

interface IdeaCardProps {
  idea: ResearchIdea;
  index: number;
  language?: string;
}

const IdeaCard = ({ idea, index, language = "english" }: IdeaCardProps) => {
  const [showExperiment, setShowExperiment] = useState(false);
  const navigate = useNavigate();

  return (
    <Card className="border-border/60 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="font-sans text-xs mb-2 w-fit">
            Idea #{index + 1}
          </Badge>
        </div>
        <CardTitle className="text-lg font-serif leading-snug">{idea.title}</CardTitle>
        <p className="text-sm text-muted-foreground font-sans leading-relaxed pt-1">
          {idea.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Metrics */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-sans text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Target className="h-3.5 w-3.5 text-feasibility" />
                Feasibility
              </span>
              <span className="font-semibold">{idea.feasibilityScore}/10</span>
            </div>
            <Progress value={idea.feasibilityScore * 10} className="h-2 [&>div]:bg-feasibility" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-sans text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Lightbulb className="h-3.5 w-3.5 text-novelty" />
                Novelty
              </span>
              <span className="font-semibold">{idea.noveltyScore}/10</span>
            </div>
            <Progress value={idea.noveltyScore * 10} className="h-2 [&>div]:bg-novelty" />
          </div>
        </div>

        {/* Methodology */}
        <div className="space-y-1.5">
          <h4 className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Suggested Methodology
          </h4>
          <p className="text-sm font-sans leading-relaxed">
            {idea.suggestedMethodology}
          </p>
        </div>

        {/* Experiment Design Toggle */}
        <div className="mt-auto pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExperiment(!showExperiment)}
            className="w-full font-sans text-xs text-muted-foreground hover:text-foreground"
          >
            <FlaskConical className="h-3.5 w-3.5" />
            {showExperiment ? "Hide" : "Show"} Experiment Design
            {showExperiment ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>

          {showExperiment && (
            <div className="mt-3 space-y-3 rounded-lg bg-muted/50 p-4 font-sans text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Steps
                </h5>
                <ol className="list-decimal list-inside space-y-1 text-sm leading-relaxed">
                  {idea.experimentDesign.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-background p-3 border border-border/50">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-feasibility mb-1">
                    Control Group
                  </h5>
                  <p className="text-xs leading-relaxed">{idea.experimentDesign.controlGroup}</p>
                </div>
                <div className="rounded-md bg-background p-3 border border-border/50">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-novelty mb-1">
                    Variable Group
                  </h5>
                  <p className="text-xs leading-relaxed">{idea.experimentDesign.variableGroup}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Explore Button */}
        <Button
          className="w-full gap-2 mt-2"
          onClick={() => navigate("/explore", { state: { idea, language } })}
        >
          Explore This Idea
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default IdeaCard;
