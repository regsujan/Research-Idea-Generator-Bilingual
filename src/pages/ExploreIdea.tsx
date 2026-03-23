import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Loader2,
  Target,
  Lightbulb,
  FlaskConical,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import type { ResearchIdea } from "@/lib/mockData";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "What datasets can I use for this research?",
  "Suggest a realistic timeline for this thesis",
  "What are the main challenges I might face?",
  "Can you suggest related papers to read?",
];

const ExploreIdea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idea = location.state?.idea as ResearchIdea | undefined;
  const language = (location.state?.language as string) || "english";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!idea) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No idea selected.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-idea", {
        body: { idea, messages: newMessages, language },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't process your question. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto flex items-center gap-3 py-3 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="h-5 w-px bg-border" />
          <p className="text-sm font-semibold truncate">Explore Idea</p>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Idea Detail */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <Badge variant="secondary" className="w-fit text-xs mb-2">
                  Research Idea
                </Badge>
                <CardTitle className="text-xl font-serif leading-snug">
                  {idea.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {idea.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Target className="h-3.5 w-3.5 text-feasibility" />
                        Feasibility
                      </span>
                      <span className="font-semibold">
                        {idea.feasibilityScore}/10
                      </span>
                    </div>
                    <Progress
                      value={idea.feasibilityScore * 10}
                      className="h-2 [&>div]:bg-feasibility"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Lightbulb className="h-3.5 w-3.5 text-novelty" />
                        Novelty
                      </span>
                      <span className="font-semibold">
                        {idea.noveltyScore}/10
                      </span>
                    </div>
                    <Progress
                      value={idea.noveltyScore * 10}
                      className="h-2 [&>div]:bg-novelty"
                    />
                  </div>
                </div>

                {/* Methodology */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    Methodology
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {idea.suggestedMethodology}
                  </p>
                </div>

                {/* Experiment */}
                <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <FlaskConical className="h-3.5 w-3.5" />
                    Experiment Design
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm leading-relaxed">
                    {idea.experimentDesign.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  <div className="grid gap-2 sm:grid-cols-2 mt-2">
                    <div className="rounded-md bg-background p-2.5 border border-border/50">
                      <h5 className="text-xs font-semibold text-feasibility mb-1">
                        Control
                      </h5>
                      <p className="text-xs leading-relaxed">
                        {idea.experimentDesign.controlGroup}
                      </p>
                    </div>
                    <div className="rounded-md bg-background p-2.5 border border-border/50">
                      <h5 className="text-xs font-semibold text-novelty mb-1">
                        Variable
                      </h5>
                      <p className="text-xs leading-relaxed">
                        {idea.experimentDesign.variableGroup}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: AI Chat */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col border-border/60 min-h-[500px] lg:min-h-0 lg:h-[calc(100vh-8rem)]">
              <CardHeader className="pb-3 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">
                    Chat with ThesisSathi
                  </CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ask follow-up questions about this idea — datasets, timeline,
                  challenges, papers, and more.
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                {/* Messages area */}
                <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
                  {messages.length === 0 ? (
                    <div className="space-y-3 py-6">
                      <p className="text-sm text-muted-foreground text-center">
                        Start exploring this idea. Try one of these:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {STARTER_QUESTIONS.map((q) => (
                          <Button
                            key={q}
                            variant="outline"
                            size="sm"
                            className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
                            onClick={() => sendMessage(q)}
                            disabled={isLoading}
                          >
                            {q}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            msg.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-xl px-4 py-2.5 text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>

                {/* Input */}
                <div className="border-t border-border/40 p-3 flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about this research idea..."
                    className="min-h-[44px] max-h-28 resize-none text-sm"
                    rows={1}
                  />
                  <Button
                    size="icon"
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className="shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExploreIdea;
