import ArrayField from "./ArrayField";
import FormTextarea from "./FormTextarea";
import type { ProjectDescriptionBlock } from "../types";

interface DescriptionBlockEditorProps {
  blocks: ProjectDescriptionBlock[];
  onChange: (blocks: ProjectDescriptionBlock[]) => void;
}

export default function DescriptionBlockEditor({ blocks, onChange }: DescriptionBlockEditorProps) {
  function updateBlock(idx: number, updated: ProjectDescriptionBlock) {
    const next = [...blocks];
    next[idx] = updated;
    onChange(next);
  }

  function removeBlock(idx: number) {
    onChange(blocks.filter((_, i) => i !== idx));
  }

  function addParagraph() {
    onChange([...blocks, { type: "paragraph", content: "" }]);
  }

  function addPoints() {
    onChange([...blocks, { type: "points", content: [] }]);
  }

  function changeType(idx: number, newType: "paragraph" | "points") {
    const block = blocks[idx];
    let newContent: string | string[];
    if (newType === "paragraph") {
      newContent = Array.isArray(block.content) ? block.content.join("\n") : block.content;
    } else {
      newContent = typeof block.content === "string"
        ? block.content.split("\n").filter(Boolean)
        : block.content;
    }
    updateBlock(idx, { type: newType, content: newContent });
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-gray-700">Full Description Blocks</span>

      {blocks.map((block, idx) => (
        <div key={idx} className="border border-gray-200 rounded-md p-3 flex flex-col gap-3 bg-gray-50">
          <div className="flex items-center justify-between gap-2">
            <select
              value={block.type}
              onChange={(e) => changeType(idx, e.target.value as "paragraph" | "points")}
              className="text-sm px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="paragraph">Paragraph</option>
              <option value="points">Points</option>
            </select>
            <button
              type="button"
              onClick={() => removeBlock(idx)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove Block
            </button>
          </div>

          {block.type === "paragraph" ? (
            <FormTextarea
              label=""
              value={block.content as string}
              rows={4}
              onChange={(e) => updateBlock(idx, { ...block, content: e.target.value })}
              placeholder="Paragraph text..."
            />
          ) : (
            <ArrayField
              label=""
              items={block.content as string[]}
              onChange={(updated) => updateBlock(idx, { ...block, content: updated })}
              placeholder="Bullet point..."
              addLabel="Add point"
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 mt-1">
        <button
          type="button"
          onClick={addParagraph}
          className="text-sm text-indigo-600 hover:underline"
        >
          + Add Paragraph Block
        </button>
        <button
          type="button"
          onClick={addPoints}
          className="text-sm text-indigo-600 hover:underline"
        >
          + Add Points Block
        </button>
      </div>
    </div>
  );
}
