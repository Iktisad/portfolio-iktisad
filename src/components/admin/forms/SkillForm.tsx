import FormInput from "../shared/FormInput";
import RadioToggle from "../shared/RadioToggle";
import type { Skill } from "../types";

interface Props {
  item: Skill;
  onChange: (updated: Skill) => void;
}

export default function SkillForm({ item, onChange }: Props) {
  const iconType = item.iconType ?? "class";

  function setType(val: string) {
    onChange({ ...item, iconType: val as "class" | "url", iconClass: "", iconUrl: "" });
  }

  return (
    <div className="flex flex-col gap-4">
      <FormInput label="Name" value={item.name} onChange={(e) => onChange({ ...item, name: e.target.value })} placeholder="TypeScript" />
      <RadioToggle
        name="skill-icon-type"
        label="Icon Type"
        options={[{ value: "class", label: "Icon Class" }, { value: "url", label: "Icon URL" }]}
        value={iconType}
        onChange={setType}
      />
      {iconType === "class" ? (
        <div className="flex flex-col gap-2">
          <FormInput
            label="Icon Class"
            value={item.iconClass ?? ""}
            onChange={(e) => onChange({ ...item, iconClass: e.target.value })}
            placeholder="devicon-typescript-plain text-blue-500"
          />
          {item.iconClass && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Preview:</span>
              <i className={item.iconClass} style={{ fontSize: "1.5rem" }} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <FormInput
            label="Icon URL"
            value={item.iconUrl ?? ""}
            onChange={(e) => onChange({ ...item, iconUrl: e.target.value })}
            placeholder="https://..."
          />
          {item.iconUrl && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Preview:</span>
              <img src={item.iconUrl} alt="icon" className="h-6 w-6 object-contain" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
