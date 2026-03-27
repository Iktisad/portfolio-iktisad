import FormInput from "../shared/FormInput";
import ArrayField from "../shared/ArrayField";
import type { Education } from "../types";

interface Props {
  item: Education;
  onChange: (updated: Education) => void;
}

export default function EducationForm({ item, onChange }: Props) {
  function set(field: keyof Education, value: string) {
    onChange({ ...item, [field]: value });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Date" value={item.date} onChange={(e) => set("date", e.target.value)} placeholder="2023 – 2024" />
        <FormInput label="Institution" value={item.institution} onChange={(e) => set("institution", e.target.value)} placeholder="Concordia University" />
      </div>
      <FormInput label="Degree" value={item.degree} onChange={(e) => set("degree", e.target.value)} placeholder="Master of Engineering in..." />
      <ArrayField
        label="Relevant Courses"
        items={item.courses}
        onChange={(courses) => onChange({ ...item, courses })}
        placeholder="Course name..."
        addLabel="Add course"
      />
    </div>
  );
}
