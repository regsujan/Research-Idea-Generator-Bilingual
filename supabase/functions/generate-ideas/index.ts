import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { level, field, interests, recentPapers } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert academic research advisor. You generate creative, feasible, and novel research thesis ideas. You always respond with valid JSON only — no markdown, no explanation outside the JSON.`;

    const userPrompt = `Generate exactly 5 research thesis ideas for a ${level} student studying ${field}.
Their specific interests are: ${interests || "general topics in the field"}.
${recentPapers ? `They have recently read these papers: ${recentPapers}` : ""}

Return a JSON array of exactly 5 objects with this exact structure:
[
  {
    "title": "string",
    "description": "1-2 sentence description of the core concept",
    "feasibilityScore": number between 1-10,
    "noveltyScore": number between 1-10,
    "suggestedMethodology": "A short paragraph explaining the research approach",
    "experimentDesign": {
      "steps": ["step 1", "step 2", "step 3", "step 4", "step 5"],
      "controlGroup": "Description of the control group",
      "variableGroup": "Description of the variable/experimental group"
    }
  }
]

Return ONLY the JSON array. No markdown fences, no explanation.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the response, stripping markdown fences if present
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const ideas = JSON.parse(cleaned);

    return new Response(JSON.stringify({ ideas }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-ideas error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
