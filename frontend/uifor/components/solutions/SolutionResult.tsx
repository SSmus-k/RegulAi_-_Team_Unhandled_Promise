import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface SolutionResultProps {
  summary: unknown;
  onDownload?: () => void;
  onSave?: () => void;
}

type LegalReference = {
  act: string;
  year: string;
  section: string;
  source_type: string;
};

type Metadata = {
  semantic_reuse: boolean;
  spam_score: number;
  model_used: string;
};

type AIResult = {
  schema_version?: string;
  canonical_question?: string;
  summary?: string;
  key_points?: string[];
  step_by_step?: string[];
  legal_references?: LegalReference[];
  final_assessment?: {
    confidence_score?: number;
    risk_level?: string;
  };
  metadata?: Metadata;
};

/**
 * Normalize AI output → clean, readable markdown
 */

function normalizeSummary(input: unknown): string {
  if (typeof input === "string") return input;
  if (!input || typeof input !== "object") return "";

  const data = input as AIResult;
  let output = '';

  // Friendly opener
  output += `Here’s what you need to know 🙂\n\n`;

  // Brief explanation
  if (data.summary) {
    output += `${data.summary}\n\n`;
  }


  // Generalized bullet list rendering with separator
  function renderBullets(items: string[], prefix: string) {
    return items.map((item) => `• **${prefix}:** ${item}\n---\n`).join("");
  }

  // Key Points
  if (data.key_points?.length) {
    output += `**Key Takeaways**\n\n`;
    output += renderBullets(data.key_points, "Key point");
    output += `\n`;
  }

  // Step-by-Step
  if (data.step_by_step?.length) {
    output += `**Step-by-Step Process**\n\n`;
    output += data.step_by_step.map((step, i) => `• **Step ${i + 1}:** ${step}\n---\n`).join("");
    output += `\n`;
  }

  // Legal References
  if (data.legal_references?.length) {
    output += `**Legal References**\n\n`;
    output += data.legal_references.map((ref, i) => `• **${ref.act} (${ref.year})**: Section ${ref.section} (${ref.source_type})\n---\n`).join("");
    output += `\n`;
  }

  // Actions
  if ((data as any).action_items?.length) {
    output += `**Recommended Actions**\n\n`;
    output += (data as any).action_items.map((item: string) => `• **Action:** ${item}\n---\n`).join("");
    output += `\n`;
  }

  // Final Assessment
  if (data.final_assessment) {
    output += `**Final Assessment**\n\n`;
    if (typeof data.final_assessment.confidence_score === "number") {
      output += `• **Confidence score:** ${Math.round(data.final_assessment.confidence_score * 100)}%\n`;
    }
    if (data.final_assessment.risk_level) {
      output += `• **Risk level:** ${data.final_assessment.risk_level}\n`;
    }
    output += `\n`;
  }

  // Metadata (optional, less prominent)
  if (data.metadata) {
    output += `**Details**\n\n`;
    output += `• **Semantic reuse:** ${data.metadata.semantic_reuse ? "Yes" : "No"}\n`;
    output += `• **Spam score:** ${data.metadata.spam_score}\n`;
    output += `• **Model used:** ${data.metadata.model_used}\n`;
    output += `\n`;
  }

  // Optional closing
  output += `Let me know if you want more details or a step-by-step breakdown!`;

  return output;
}

export default function SolutionResult({
  summary,
  onDownload,
  onSave,
}: SolutionResultProps) {
  const safeSummary = normalizeSummary(summary);

  return (
    <div className="grid gap-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-200 mb-4">
          AI Solution
        </h3>

        <div className="prose prose-invert max-w-none">
          {safeSummary ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {safeSummary}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-400">No content available.</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-cyan-700 text-white rounded-xl hover:bg-cyan-800 disabled:opacity-50"
          onClick={onDownload}
          disabled={!safeSummary}
        >
          Download as PDF
        </button>

        <button
          className="px-6 py-2 bg-purple-700 text-white rounded-xl hover:bg-purple-800 disabled:opacity-50"
          onClick={onSave}
          disabled={!safeSummary}
        >
          Save Solution
        </button>
      </div>
    </div>
  );
}
