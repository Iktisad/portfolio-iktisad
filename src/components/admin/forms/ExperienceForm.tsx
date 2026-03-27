import FormInput from "../shared/FormInput";
import ArrayField from "../shared/ArrayField";
import type { Experience } from "../types";

interface Props {
  item: Experience;
  onChange: (updated: Experience) => void;
}

export default function ExperienceForm({ item, onChange }: Props) {
  function set(field: keyof Experience, value: string) {
    onChange({ ...item, [field]: value });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Date" value={item.date} onChange={(e) => set("date", e.target.value)} placeholder="Oct 2025 – Present" />
        <FormInput label="Location" value={item.location} onChange={(e) => set("location", e.target.value)} placeholder="Montreal, Canada" />
      </div>
      <FormInput label="Title" value={item.title} onChange={(e) => set("title", e.target.value)} placeholder="Backend Engineer" />
      <FormInput label="Company" value={item.company} onChange={(e) => set("company", e.target.value)} placeholder="Cognitai" />
      <ArrayField
        label="Bullet Points"
        items={item.points}
        onChange={(points) => onChange({ ...item, points })}
        placeholder="Describe a responsibility or achievement..."
        addLabel="Add point"
      />
    </div>
  );
}
