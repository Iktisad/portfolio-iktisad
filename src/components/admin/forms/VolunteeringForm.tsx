import FormInput from "../shared/FormInput";
import FormTextarea from "../shared/FormTextarea";
import type { Volunteering } from "../types";

interface Props {
  item: Volunteering;
  onChange: (updated: Volunteering) => void;
}

export default function VolunteeringForm({ item, onChange }: Props) {
  function set(field: keyof Volunteering, value: string) {
    onChange({ ...item, [field]: value });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Date" value={item.date} onChange={(e) => set("date", e.target.value)} placeholder="2023 – 2024" />
        <FormInput label="Organization" value={item.organization} onChange={(e) => set("organization", e.target.value)} placeholder="BDGSA – Concordia" />
      </div>
      <FormInput label="Title" value={item.title} onChange={(e) => set("title", e.target.value)} placeholder="Vice President Internal" />
      <FormTextarea label="Description" value={item.description} rows={4} onChange={(e) => set("description", e.target.value)} placeholder="Describe your role..." />
    </div>
  );
}
