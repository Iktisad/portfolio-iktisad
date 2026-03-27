import FormInput from "../shared/FormInput";
import FormTextarea from "../shared/FormTextarea";
import type { Hackathon } from "../types";

interface Props {
  item: Hackathon;
  onChange: (updated: Hackathon) => void;
}

export default function HackathonForm({ item, onChange }: Props) {
  function set(field: keyof Hackathon, value: string) {
    onChange({ ...item, [field]: value });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Hackathon Title" value={item.title} onChange={(e) => set("title", e.target.value)} placeholder="JACHacks 2025" />
        <FormInput label="Project Name" value={item.project} onChange={(e) => set("project", e.target.value)} placeholder="Doable" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Award" value={item.award} onChange={(e) => set("award", e.target.value)} placeholder="Top 5 Finalist" />
        <FormInput label="SVG Icon Path" value={item.svg} onChange={(e) => set("svg", e.target.value)} placeholder="/imgs/trophy.svg" />
      </div>
      <FormInput label="Link" value={item.link} onChange={(e) => set("link", e.target.value)} placeholder="https://devpost.com/..." />
      <FormTextarea label="Description" value={item.description} rows={4} onChange={(e) => set("description", e.target.value)} placeholder="Describe the project..." />
    </div>
  );
}
