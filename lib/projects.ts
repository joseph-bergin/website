import type { SheetName } from "@/components/pixel/sheets";
import type { ProjectSpriteName } from "@/components/pixel/sprites";

export type ProjectStatus = "acquired" | "completed" | "draft";

/** Optional results table, for projects that produced measurements worth showing. */
export type ResultsTable = {
  caption: string;
  columns: string[];
  rows: string[][];
  /** Zero-based row indices to emphasise — the best result per model, usually. */
  highlight?: number[];
};

export type Screenshot = {
  /** Path under /public. Leave empty to render an annotated empty slot. */
  src?: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** One-paragraph card description. */
  description: string;
  year: string;
  status: ProjectStatus;
  /** Inline-SVG grid sprite. Used when `sheet` is absent. */
  sprite: ProjectSpriteName;
  /** Hand-drawn Aseprite sheet, preferred over `sprite` when present. */
  sheet?: SheetName;
  stack: string[];
  links: { label: string; href: string }[];
  /** Placeholder entries render a visible "unfinished" banner on their page. */
  draft?: boolean;
  overview: string[];
  problem: string[];
  architecture: { step: string; detail: string }[];
  challenges: { title: string; body: string }[];
  lessons: string[];
  results?: ResultsTable;
  screenshots: Screenshot[];
  futureWork: string[];
};

export const projects: Project[] = [
  {
    slug: "akoe",
    title: "Akoe",
    tagline: "LLM-powered quality assurance for customer service calls",
    description:
      "A platform that graded and reviewed customer service calls with LLMs, scoring agents against benchmarks their own admins defined. Co-founded, built, and grown through to acquisition.",
    year: "2024 — 2025",
    status: "acquired",
    sprite: "robot",
    stack: ["Next.js", "TypeScript", "Python", "Flask", "AWS", "LLMs", "PostgreSQL"],
    links: [],
    overview: [
      "Akoe was an LLM-powered quality assurance platform for grading and reviewing customer service calls. I co-founded it, built the core grading engine and the reporting layer on top of it, and owned the AWS infrastructure the whole thing ran on.",
      "Call centers already knew their call quality mattered. What they didn't have was a way to look at more than a sliver of it. Akoe's premise was that if grading a call costs cents instead of a supervisor's afternoon, you stop sampling and start grading everything.",
      "The company was sold in 2025.",
    ],
    problem: [
      "Quality assurance in a call center is a sampling problem. A supervisor listens to a handful of calls per agent per month, fills in a rubric by hand, and extrapolates. The sample is small, the rubric is applied inconsistently between reviewers, and by the time feedback reaches the agent the call is weeks old.",
      "The obvious fix — grade every call — had never been economical. Transcription plus a human reviewer is far too expensive to run across an entire call volume, and pre-LLM automated scoring could only check for keyword presence, which is a poor proxy for whether an agent actually handled a customer well.",
      "The harder constraint was that no two organizations grade calls the same way. A rubric that ships hard-coded is a rubric that fits nobody. Whatever we built had to let an admin define what 'good' meant for their team, and then apply that definition consistently across every call.",
    ],
    architecture: [
      {
        step: "Ingest",
        detail:
          "Call audio and metadata land in AWS and are queued for processing. Work is decoupled from the request path from the start — grading is a batch concern, not something a user waits on.",
      },
      {
        step: "Benchmarks",
        detail:
          "Admins define benchmarks — the criteria their agents are scored against — through the application. These are data, not code, which is what makes the same engine work across organizations with different standards.",
      },
      {
        step: "Grading engine",
        detail:
          "The core of the product. A Python service scores each call against the customer's configured benchmarks using LLM inference, producing a per-criterion result rather than a single opaque number.",
      },
      {
        step: "Insights layer",
        detail:
          "Automated summary and insights reporting rolls individual gradings up into call-quality trends, and turns those trends into concrete recommendations for agents and for the managers reviewing them.",
      },
      {
        step: "Application",
        detail:
          "A Next.js and TypeScript front end where admins configure benchmarks, agents see their own results, and managers work through the reporting.",
      },
      {
        step: "Infrastructure",
        detail:
          "AWS throughout, owned end to end — the compute behind the grading pipeline, the storage, and the deployment path for the full-stack application.",
      },
    ],
    challenges: [
      {
        title: "Making the rubric a product surface",
        body: "Because benchmarks were admin-defined, the grading prompt could not be a constant. The engine had to compose a scoring pass from configuration written by someone who had never seen a prompt, and still produce results consistent enough that two similar calls scored similarly.",
      },
      {
        title: "Cost per call is the business model",
        body: "The entire pitch rested on grading being cheap enough to run on every call rather than a sample. That makes inference cost a product constraint, not an infrastructure detail — it shapes how much of a transcript you send, how many passes you make, and where a cheaper check can stand in for a model call.",
      },
      {
        title: "Scores nobody trusts are worthless",
        body: "A number an agent disagrees with and can't interrogate does more harm than no number at all. Grading per-criterion rather than in aggregate was as much about making results arguable as it was about making them precise.",
      },
    ],
    lessons: [
      "Configuration is a feature, and it is much harder than the hard-coded version. Letting customers define their own benchmarks was the thing that made Akoe sellable and the thing that made the engine difficult.",
      "When inference cost sits directly under the value proposition, cost work stops being optimization and becomes product work.",
      "Owning the infrastructure as well as the application meant nothing was ever someone else's problem — which is exhausting at the time and enormously clarifying in retrospect.",
      "A small team ships faster than it can decide what to ship. The bottleneck was rarely engineering.",
    ],
    screenshots: [
      {
        alt: "Akoe benchmark configuration screen",
        caption: "Benchmark configuration — where an admin defines what a good call means for their team.",
      },
      {
        alt: "Akoe call grading result",
        caption: "A graded call, scored per criterion rather than as a single aggregate number.",
      },
      {
        alt: "Akoe insights reporting",
        caption: "Insights reporting — call-quality trends rolled up across agents over time.",
      },
    ],
    futureWork: [
      "The product was sold, so this list is what I would have built next rather than what is planned.",
      "Calibration tooling: let an admin grade a handful of calls by hand and measure how closely the engine agrees, so trust in the rubric is measured rather than assumed.",
      "Real-time assistance during a call rather than review after it.",
      "Pushing more of the scoring work onto cheaper deterministic checks, reserving inference for the criteria that genuinely need judgment.",
    ],
  },
  {
    slug: "llm-causal-reasoning",
    title: "Learning Causality in LLMs",
    tagline: "Do large language models understand cause and effect, or just recognise patterns?",
    description:
      "I tested whether LLM's can tell a cause from its effect, by asking each to predict a Yelp star rating under three prompts that differ only in causal direction. All three did worst on the causal one.",
    year: "2024",
    status: "completed",
    sprite: "flask",
    sheet: "brain",
    stack: ["Python", "GPT-3.5", "Gemini Pro", "Llama 3", "Hugging Face", "scikit-learn"],
    links: [
      { label: "Read the thesis", href: "https://scholarworks.uark.edu/elcsuht/2" },
    ],
    overview: [
      "\u201cAn Empirical Study on the Capability of Large Language Models in Learning Causality\u201d — my undergraduate honors thesis at the University of Arkansas, submitted December 2024 under Dr. Lu Zhang, with Dr. Susan Gauch and Dr. Xintao Wu on the committee.",
      "The question: when a language model answers correctly about a cause-and-effect relationship, is it reasoning about causation, or is it pattern-matching its way to an answer that happens to be right?",
      "To separate those, I built a task where the correct answer stays identical but the causal direction changes. Three models, three prompt framings, a thousand Yelp reviews, and a measurable gap between them.",
    ],
    problem: [
      "A star rating and the review that accompanies it have a causal relationship, and which way it runs depends on how they were written. If you decide on the rating first and then write a review explaining it, the rating caused the review — predicting the rating from the review is causal inference. If you write the review first and then settle on a rating, the review caused the rating, and predicting it is anti-causal inference. The text on screen is the same either way.",
      "That makes it a clean instrument. Three prompts describe the same review and ask for the same number, differing only in which direction they say the causation ran. A model that genuinely reasons about causal structure should be sensitive to that difference in a principled way. A model that pattern-matches review sentiment to a rating should be largely indifferent, or should favour whichever framing best matches how it was trained.",
      "Prior work on this task used GPT-2 and found the causal framing performed best, followed by third-party, then anti-causal. The question I set out to answer was whether that ordering held on the models that had replaced it.",
    ],
    architecture: [
      {
        step: "Dataset",
        detail:
          "The Yelp review dataset from Hugging Face — 700k reviews across many business types, split 650k train / 50k test. I used the first 1,000 reviews of the test set, labelled 0–4 for a 1–5 star rating.",
      },
      {
        step: "Three causal setups",
        detail:
          "Setup 1 (causal): the rating was given first, and the review explains it. Setup 2 (anti-causal): the review was written first, and the rating follows from it. Setup 3 (third person): you are reading someone else's review and inferring what they gave. Same review text in all three; only the stated direction of causation changes.",
      },
      {
        step: "Zero-shot prompting",
        detail:
          "No examples, no demonstrations, no fine-tuning. The point was to measure what each model brings pre-trained, rather than how well it adapts once shown the pattern.",
      },
      {
        step: "Model harness",
        detail:
          "One consistent pipeline per model in Python 3.11.5, so all three received identical inputs: GPT-3.5-turbo via OpenAI's chat completions endpoint, Gemini Pro via the Google API, and Llama-3-8B run locally after requesting access from Meta.",
      },
      {
        step: "Output extraction",
        detail:
          "Models answer in prose, not integers. A parser strips each response down to a rating, matching either the numeral or the written word. Reviews too empty or malformed to rate at all returned -1 and were excluded rather than counted as wrong.",
      },
      {
        step: "Scoring",
        detail:
          "Ten subsets of 100 entries per model per prompt, scored with scikit-learn for accuracy, F1, precision, recall, and runtime — reported both per subset and combined.",
      },
    ],
    challenges: [
      {
        title: "Three providers, three sets of obstacles",
        body: "GPT-3.5 was a library import and an API key. Gemini's safety filters silently degraded results until every category was set to BLOCK_NONE, and the free tier's rate limit capped throughput at roughly six requests a minute — which is why its runs took nearly three hours each against GPT-3.5's nine to seventeen minutes. Llama 3 meant requesting model access from Meta, cloning the repo, and batching prompts to stay inside the model's processing capacity.",
      },
      {
        title: "Getting a number out of a paragraph",
        body: "The task asks for a rating; the models return explanations. Sometimes the rating is a numeral, sometimes a word, sometimes buried in a sentence of justification. Extraction had to be consistent across three models with different verbosity, because a parsing failure is indistinguishable from a wrong answer in the final score.",
      },
      {
        title: "Reviews that aren't reviews",
        body: "The dataset contains entries like the single string \"session key\" — no sentiment, nothing to rate. Counting those as errors would have measured data quality rather than model capability, so unratable reviews were dropped instead.",
      },
    ],
    results: {
      caption:
        "1,000 Yelp reviews per run. Setup 1 is causal, Setup 2 anti-causal, Setup 3 third-person. The causal framing came last for every model.",
      columns: ["Model", "Setup", "Accuracy", "F1"],
      rows: [
        ["GPT-3.5", "1 — causal", "64.03%", "62.92%"],
        ["GPT-3.5", "2 — anti-causal", "63.90%", "63.41%"],
        ["GPT-3.5", "3 — third person", "64.50%", "63.74%"],
        ["Gemini Pro", "1 — causal", "62.41%", "61.61%"],
        ["Gemini Pro", "2 — anti-causal", "64.28%", "63.33%"],
        ["Gemini Pro", "3 — third person", "64.04%", "62.86%"],
        ["Llama 3", "1 — causal", "51.51%", "48.29%"],
        ["Llama 3", "2 — anti-causal", "51.54%", "49.07%"],
        ["Llama 3", "3 — third person", "53.37%", "51.31%"],
      ],
      highlight: [2, 4, 8],
    },
    lessons: [
      "The causal framing finished last for all three models — the exact inverse of the earlier GPT-2 result, which had ranked it first. Whatever changed between GPT-2 and this generation moved the ordering, and it moved it consistently.",
      "GPT-3.5 and Llama 3 did best on the third-person prompt; Gemini Pro did best on anti-causal, with third-person close behind. Every model preferred a framing where the review comes first and the rating is inferred from it.",
      "That shared preference points at a review-to-rating habit: summarise the text, then produce a number that fits. My reading is that this comes out of RLHF — the reward model is trained on human preference data, which pushes the actor toward responses humans would have written, and a human reading a review and guessing a rating works in exactly that direction.",
      "Answering correctly and reasoning causally are different things. All three models scored respectably on a task they appear to be solving the wrong way round, which is the finding: fluent, useful output is not evidence of causal understanding.",
      "Model architecture matters more than scale here. Llama-3-8B trailed the other two by roughly ten points across every setup, but showed the same directional preference — so the ordering is not an artifact of one provider.",
    ],
    screenshots: [
      {
        alt: "Prompt table showing the three causal setups",
        caption:
          "The three prompts. Same review, same question, different stated direction of causation.",
      },
      {
        alt: "Example of a correct GPT-3.5 prediction",
        caption:
          "A correct prediction under Setup 1 — the model reads a negative review about a contractor who never called back and returns 1 star, with its reasoning attached.",
      },
      {
        alt: "Example of an incorrect prediction",
        caption:
          "A miss under Setup 2: strong dissatisfaction with the food, but the model weighs the positive comments about atmosphere and overshoots to 3 stars.",
      },
    ],
    futureWork: [
      "Widen the dataset beyond Yelp reviews. One domain and one task shape is enough to show the effect but not enough to generalise it.",
      "Re-run the sweep on frontier models — GPT-4 and later — to test whether the causal deficit narrows as capability increases, or whether it is structural.",
      "Vary the prompts further. Three framings isolate direction cleanly, but more variations would separate the causal effect from ordinary prompt sensitivity.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);
