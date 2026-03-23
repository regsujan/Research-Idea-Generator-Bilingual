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
  interests: string,
  language: string = "english"
): ResearchIdea[] => {
  if (language === "nepali") {
    return [
      {
        title: `${field} मा अनुकूलनशील शिक्षण प्रणालीहरू`,
        description: `${field} भित्र वास्तविक-समय विद्यार्थी प्रदर्शन डेटाको आधारमा व्यक्तिगत AI ट्यूटरहरूले पाठ्यक्रमलाई कसरी गतिशील रूपमा समायोजन गर्न सक्छन् भन्ने अन्वेषण।`,
        feasibilityScore: 8,
        noveltyScore: 6,
        suggestedMethodology:
          "१२ हप्ताको सेमेस्टरमा अनुकूलनशील एल्गोरिदमको मात्रात्मक A/B परीक्षण र विद्यार्थी सहभागीहरूको गुणात्मक अन्तर्वार्ता संयोजन गर्ने मिश्रित-विधि दृष्टिकोण।",
        experimentDesign: {
          steps: [
            "परिचयात्मक पाठ्यक्रममा भर्ना भएका २०० विद्यार्थीहरूको भर्ना",
            "अनुकूलनशील (n=१००) वा परम्परागत (n=१००) शिक्षण प्लेटफर्ममा यादृच्छिक रूपमा विभाजन",
            "१२ हप्तासम्म साप्ताहिक क्विज स्कोर र संलग्नता मेट्रिक्स सङ्कलन",
            "प्रत्येक समूहबाट २० सहभागीहरूसँग अर्ध-संरचित अन्तर्वार्ता सञ्चालन",
            "मिश्रित-प्रभाव प्रतिगमन मोडेलहरू प्रयोग गरी प्रदर्शन भिन्नताको विश्लेषण",
          ],
          controlGroup:
            "स्थिर सामग्री वितरणसहित परम्परागत, गैर-अनुकूलनशील ई-लर्निङ प्लेटफर्म प्रयोग गर्ने विद्यार्थीहरू।",
          variableGroup:
            "वास्तविक-समयमा कठिनाइ र सामग्री अनुक्रम परिमार्जन गर्ने AI-संचालित अनुकूलनशील प्लेटफर्म प्रयोग गर्ने विद्यार्थीहरू।",
        },
      },
      {
        title: `आधुनिक अनुसन्धानमा ${interests} को नैतिक प्रभावहरू`,
        description: `${interests} मा उदीयमान अभ्यासहरू शासन गर्न आवश्यक नैतिक ढाँचाहरूको समालोचनात्मक विश्लेषण, नीति सिफारिसहरूसहित।`,
        feasibilityScore: 7,
        noveltyScore: 8,
        suggestedMethodology:
          "नैतिक दिशानिर्देशहरूमा सहमति निर्माण गर्न ३०+ डोमेन विशेषज्ञहरू समावेश गर्ने डेल्फी अध्ययनसँग संयुक्त व्यवस्थित साहित्य समीक्षा।",
        experimentDesign: {
          steps: [
            "डोमेनमा नैतिकतासम्बन्धी ५००+ पत्रहरूको व्यवस्थित समीक्षा सञ्चालन",
            "विषयगत विश्लेषण प्रयोग गरी आवर्ती नैतिक विषयवस्तुहरू पहिचान",
            "पहिचान गरिएका विषयवस्तुहरूमा आधारित ३-राउन्ड डेल्फी प्रश्नावली डिजाइन",
            "शिक्षा, उद्योग, र नीतिबाट ३५ विशेषज्ञहरूको भर्ना",
            "मुख्य सिद्धान्तहरूमा ७५% सहमति प्राप्त नभएसम्म दोहोर्‍याउने",
          ],
          controlGroup:
            "आधारभूत तुलनाको रूपमा प्रयोग गरिएका समीपवर्ती क्षेत्रहरूबाट विद्यमान नैतिक ढाँचाहरू।",
          variableGroup:
            "डेल्फी सहमति प्रक्रियामार्फत विकसित नयाँ प्रस्तावित नैतिक दिशानिर्देशहरू।",
        },
      },
      {
        title: `${field} को लागि अन्तर-विषयक डेटा फ्युजन`,
        description: `${field} र समीपवर्ती विषयहरूबाट विषम डेटासेटहरू संयोजन गर्दा पहिले लुकेका ढाँचाहरू कसरी प्रकट हुन सक्छन् भन्ने अनुसन्धान।`,
        feasibilityScore: 6,
        noveltyScore: 9,
        suggestedMethodology:
          "ज्ञात बेन्चमार्कहरू विरुद्ध प्रमाणित, बहु-मोडल डेटासेटहरूमा सम्बन्धहरू मोडेल गर्न ग्राफ न्यूरल नेटवर्कहरू प्रयोग गर्ने कम्प्युटेशनल दृष्टिकोण।",
        experimentDesign: {
          steps: [
            "प्राथमिक क्षेत्रबाट ५ र सम्बन्धित क्षेत्रहरूबाट ३ सार्वजनिक रूपमा उपलब्ध डेटासेटहरू क्युरेट गर्ने",
            "स्थापित पाइपलाइनहरू प्रयोग गरी डेटा पूर्व-प्रशोधन र सामान्यीकरण",
            "डेटासेटहरूमा इकाइहरू जोड्ने विषम ज्ञान ग्राफ निर्माण",
            "नयाँ क्रस-डोमेन सम्बन्धहरू भविष्यवाणी गर्न ग्राफ न्यूरल नेटवर्क तालिम",
            "विशेषज्ञ समीक्षा र साहित्य प्रमाणीकरणमार्फत शीर्ष-५० भविष्यवाणीहरू प्रमाणीकरण",
          ],
          controlGroup:
            "अध्ययनको प्राथमिक क्षेत्रको डेटामा मात्र प्रशिक्षित एकल-डोमेन मोडेलहरू।",
          variableGroup:
            "अन्तर-विषयक डेटा स्रोतहरू समावेश गर्ने बहु-डोमेन फ्युजन मोडेलहरू।",
        },
      },
      {
        title: `${field} मा पुनरुत्पादनशीलता संकट समाधानहरू`,
        description: `${field} मा प्रयोगात्मक अनुसन्धानको लागि पुनरुत्पादनशीलता जाँचहरू स्वचालित गर्ने खुला-स्रोत टूलकिट विकास।`,
        feasibilityScore: 9,
        noveltyScore: 7,
        suggestedMethodology:
          "पुनरावर्ती प्रयोगकर्ता परीक्षणसहित सफ्टवेयर इन्जिनियरिङ दृष्टिकोण, १० अनुसन्धान प्रयोगशालाहरूमा टूलकिट तैनाथ गरी पुनरुत्पादनशीलता सुधार दरहरू मापन।",
        experimentDesign: {
          steps: [
            "हालको पुनरुत्पादनशीलता समस्याहरूबारे ५० अनुसन्धानकर्ताहरूको सर्वेक्षण",
            "स्वचालित जाँच टूलकिटको v१.० विकास",
            "६ महिनाको पायलटको लागि १० स्वयंसेवक अनुसन्धान प्रयोगशालाहरूमा तैनाथ",
            "पूर्व/पश्चात पुनरुत्पादनशीलता जाँच पास गर्ने प्रयोगहरूको प्रतिशत ट्र्याक",
            "प्रतिक्रियाको आधारमा परिमार्जन र टूलकिट खुला-स्रोतको रूपमा प्रकाशन",
          ],
          controlGroup:
            "तिनीहरूको विद्यमान म्यानुअल पुनरुत्पादनशीलता प्रमाणीकरण प्रक्रियाहरू प्रयोग गर्ने प्रयोगशालाहरू।",
          variableGroup:
            "आफ्नो कार्यप्रवाहसँगै नयाँ स्वचालित पुनरुत्पादनशीलता टूलकिट प्रयोग गर्ने प्रयोगशालाहरू।",
        },
      },
      {
        title: `${interests}: दीर्घकालीन प्रभाव मूल्याङ्कन`,
        description: `शिक्षा र उद्योगबीचको अनुवादनात्मक खाडललाई पहिचान गर्न ५ वर्षको अवधिमा ${interests} अनुसन्धानको वास्तविक-विश्व प्रभावको ट्र्याकिङ।`,
        feasibilityScore: 5,
        noveltyScore: 8,
        suggestedMethodology:
          "प्रकाशनदेखि व्यावहारिक अनुप्रयोगसम्मको अनुवाद पाइपलाइन मात्रात्मक रूपमा मापन गर्न उद्योग सर्वेक्षणहरू र पेटेन्ट फाइलिङहरूसँग जोडिएको बिब्लियोमेट्रिक विश्लेषण।",
        experimentDesign: {
          steps: [
            "Scopus/WoS प्रयोग गरी विगत ५ वर्षका २,०००+ प्रकाशनहरूको कोर्पस निर्माण",
            "उद्धरण नेटवर्कहरू म्याप गर्ने र उच्च-प्रभाव क्लस्टरहरू पहिचान",
            "उद्योग अपनाउनेहरू फेला पार्न पेटेन्ट डेटाबेसहरूसँग क्रस-रेफरेन्स",
            "शैक्षिक निष्कर्षहरूको जागरूकता र प्रयोगबारे १०० उद्योग अभ्यासकर्ताहरूको सर्वेक्षण",
            "सर्भाइभल एनालिसिस प्रविधिहरू प्रयोग गरी अनुवाद समयरेखा मोडेल",
          ],
          controlGroup:
            "बेन्चमार्कको रूपमा ज्ञात उच्च अनुवाद दरहरू भएका सुस्थापित अनुसन्धान क्षेत्रहरू।",
          variableGroup:
            "स्थापित बेन्चमार्कहरू विरुद्ध मापन गरिएको, अध्ययनाधीन उदीयमान अनुसन्धान क्षेत्र।",
        },
      },
    ];
  }

  return [
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
          "Curate 5 publicly available datasets from the field and 3 from related fields",
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
};
