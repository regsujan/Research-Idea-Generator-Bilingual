export interface ResearchIdea {
  title: string;
  description: string;
  feasibilityScore: number;
  noveltyScore: number;
  suggestedMethodology: string;
  experimentDesign: {
    steps: string[];
    controlGroup: string;
    variableGroup: string;
  };
}

export const generateMockIdeas = (
  field: string,
  interests: string
): ResearchIdea[] => [
  {
    title: `Adaptive Learning Systems in ${field}`,
    description: `Exploring how personalized AI tutors can dynamically adjust curriculum based on real-time student performance data within ${field}.`,
    feasibilityScore: 8,
    noveltyScore: 6,
    suggestedMethodology:
      "A mixed-methods approach combining quantitative A/B testing of adaptive algorithms with qualitative interviews of student participants over a 12-week semester.",
    experimentDesign: {
      steps: [
        "Recruit 200 students enrolled in introductory courses",
        "Randomly assign to adaptive (n=100) or traditional (n=100) learning platforms",
        "Collect weekly quiz scores and engagement metrics for 12 weeks",
        "Conduct semi-structured interviews with 20 participants from each group",
        "Analyze performance differences using mixed-effects regression models",
      ],
      controlGroup:
        "Students using a traditional, non-adaptive e-learning platform with static content delivery.",
      variableGroup:
        "Students using the AI-powered adaptive platform that modifies difficulty and content sequencing in real-time.",
    },
  },
  {
    title: `Ethical Implications of ${interests} in Modern Research`,
    description: `A critical analysis of the ethical frameworks needed to govern emerging practices in ${interests}, with policy recommendations.`,
    feasibilityScore: 7,
    noveltyScore: 8,
    suggestedMethodology:
      "Systematic literature review combined with a Delphi study involving 30+ domain experts to build consensus on ethical guidelines.",
    experimentDesign: {
      steps: [
        "Conduct a systematic review of 500+ papers on ethics in the domain",
        "Identify recurring ethical themes using thematic analysis",
        "Design a 3-round Delphi questionnaire based on identified themes",
        "Recruit 35 experts from academia, industry, and policy",
        "Iterate until 75% consensus is achieved on key principles",
      ],
      controlGroup:
        "Existing ethical frameworks from adjacent fields used as baseline comparison.",
      variableGroup:
        "Newly proposed ethical guidelines developed through the Delphi consensus process.",
    },
  },
  {
    title: `Cross-Disciplinary Data Fusion for ${field}`,
    description: `Investigating how combining heterogeneous datasets from ${field} and adjacent disciplines can reveal previously hidden patterns.`,
    feasibilityScore: 6,
    noveltyScore: 9,
    suggestedMethodology:
      "Computational approach using graph neural networks to model relationships across multi-modal datasets, validated against known benchmarks.",
    experimentDesign: {
      steps: [
        "Curate 5 publicly available datasets from ${field} and 3 from related fields",
        "Pre-process and normalize data using established pipelines",
        "Build a heterogeneous knowledge graph linking entities across datasets",
        "Train a graph neural network to predict novel cross-domain relationships",
        "Validate top-50 predictions through expert review and literature verification",
      ],
      controlGroup:
        "Single-domain models trained only on data from the primary field of study.",
      variableGroup:
        "Multi-domain fusion models incorporating cross-disciplinary data sources.",
    },
  },
  {
    title: `Reproducibility Crisis Solutions in ${field}`,
    description: `Developing an open-source toolkit that automates reproducibility checks for experimental research in ${field}.`,
    feasibilityScore: 9,
    noveltyScore: 7,
    suggestedMethodology:
      "Software engineering approach with iterative user testing, deploying the toolkit across 10 research labs and measuring reproducibility improvement rates.",
    experimentDesign: {
      steps: [
        "Survey 50 researchers about current reproducibility pain points",
        "Develop v1.0 of the automated checking toolkit",
        "Deploy to 10 volunteering research labs for a 6-month pilot",
        "Track the percentage of experiments passing reproducibility checks pre/post",
        "Refine based on feedback and publish the toolkit as open-source",
      ],
      controlGroup:
        "Labs using their existing manual reproducibility verification processes.",
      variableGroup:
        "Labs using the new automated reproducibility toolkit alongside their workflows.",
    },
  },
  {
    title: `${interests}: A Longitudinal Impact Assessment`,
    description: `Tracking the real-world impact of ${interests} research over a 5-year period to identify translational gaps between academia and industry.`,
    feasibilityScore: 5,
    noveltyScore: 8,
    suggestedMethodology:
      "Bibliometric analysis paired with industry surveys and patent filings to quantify the translation pipeline from publication to practical application.",
    experimentDesign: {
      steps: [
        "Build a corpus of 2,000+ publications from the last 5 years using Scopus/WoS",
        "Map citation networks and identify high-impact clusters",
        "Cross-reference with patent databases to find industry adoptions",
        "Survey 100 industry practitioners about awareness and usage of academic findings",
        "Model the translation timeline using survival analysis techniques",
      ],
      controlGroup:
        "Well-established research areas with known high translation rates as benchmarks.",
      variableGroup:
        "The emerging research area under study, measured against established benchmarks.",
    },
  },
];
