import FormInput from "../shared/FormInput";
import FormTextarea from "../shared/FormTextarea";
import ArrayField from "../shared/ArrayField";
import DescriptionBlockEditor from "../shared/DescriptionBlockEditor";
import type { Project } from "../types";

interface Props {
  item: Project;
  onChange: (updated: Project) => void;
}

export default function ProjectForm({ item, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <FormInput
        label="Title"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        placeholder="Project name"
      />
      <FormInput
        label="Thumbnail URL"
        value={item.thumbnail}
        onChange={(e) => onChange({ ...item, thumbnail: e.target.value })}
        placeholder="https://..."
      />
      <FormTextarea
        label="Short Description"
        value={item.shortDescription}
        rows={3}
        onChange={(e) => onChange({ ...item, shortDescription: e.target.value })}
        placeholder="One or two sentence summary..."
      />
      <DescriptionBlockEditor
        blocks={item.fullDescription}
        onChange={(fullDescription) => onChange({ ...item, fullDescription })}
      />
      <FormTextarea
        label="Tech Stack (comma-separated)"
        value={item.tech.join(", ")}
        rows={2}
        onChange={(e) => onChange({ ...item, tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
        placeholder="React, TypeScript, Node.js..."
      />
      <ArrayField
        label="Images"
        items={item.images}
        onChange={(images) => onChange({ ...item, images })}
        placeholder="Image URL..."
        addLabel="Add image"
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Button Text"
          value={item.buttonText}
          onChange={(e) => onChange({ ...item, buttonText: e.target.value })}
          placeholder="View Live →"
        />
        <FormInput
          label="Button Link"
          value={item.buttonLink}
          onChange={(e) => onChange({ ...item, buttonLink: e.target.value })}
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
