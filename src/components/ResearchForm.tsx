import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Loader2, GraduationCap, BookOpen, Microscope, FileText } from "lucide-react";

interface FormData {
  level: string;
  field: string;
  interests: string;
  recentPapers: string;
}

interface ResearchFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const ResearchForm = ({ onSubmit, isLoading }: ResearchFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    level: "",
    field: "",
    interests: "",
    recentPapers: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="border-border/60 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-serif">
          <Microscope className="h-5 w-5 text-primary" />
          Define Your Research Scope
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="level" className="flex items-center gap-1.5 font-sans text-sm font-medium">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                Level of Education
              </Label>
              <Select
                value={formData.level}
                onValueChange={(v) => setFormData((p) => ({ ...p, level: v }))}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="masters">Masters</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="field" className="flex items-center gap-1.5 font-sans text-sm font-medium">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Field of Study
              </Label>
              <Input
                id="field"
                placeholder="e.g., Computer Science, Biology"
                value={formData.field}
                onChange={(e) => setFormData((p) => ({ ...p, field: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests" className="flex items-center gap-1.5 font-sans text-sm font-medium">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              Specific Interests
            </Label>
            <Textarea
              id="interests"
              placeholder="e.g., AI agents, marine ecosystems, quantum computing..."
              rows={3}
              value={formData.interests}
              onChange={(e) => setFormData((p) => ({ ...p, interests: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="papers" className="flex items-center gap-1.5 font-sans text-sm font-medium">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Recent Papers Read
            </Label>
            <Textarea
              id="papers"
              placeholder="List papers you've recently read to help us understand your current knowledge..."
              rows={3}
              value={formData.recentPapers}
              onChange={(e) => setFormData((p) => ({ ...p, recentPapers: e.target.value }))}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isLoading || !formData.level || !formData.field}
            className="w-full text-base font-sans font-semibold h-12"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Ideas…
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Research Ideas
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResearchForm;
