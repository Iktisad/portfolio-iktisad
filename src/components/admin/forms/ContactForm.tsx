import FormInput from "../shared/FormInput";
import RadioToggle from "../shared/RadioToggle";
import ImageUpload from "../shared/ImageUpload";
import type { Contact } from "../types";

interface Props {
  item: Contact;
  onChange: (updated: Contact) => void;
}

export default function ContactForm({ item, onChange }: Props) {
  const iconType = item.iconType ?? "icon";

  function setType(val: string) {
    onChange({ ...item, iconType: val as "icon" | "image", icon: "", image: "" });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Label" value={item.label} onChange={(e) => onChange({ ...item, label: e.target.value })} placeholder="LinkedIn" />
        <FormInput label="Color (Tailwind)" value={item.color} onChange={(e) => onChange({ ...item, color: e.target.value })} placeholder="bg-blue-600 hover:bg-blue-700" />
      </div>
      <FormInput label="URL (href)" value={item.href} onChange={(e) => onChange({ ...item, href: e.target.value })} placeholder="https://linkedin.com/in/..." />
      <RadioToggle
        name="contact-icon-type"
        label="Icon Type"
        options={[{ value: "icon", label: "Icon Class" }, { value: "image", label: "Upload Image" }]}
        value={iconType}
        onChange={setType}
      />
      {iconType === "icon" ? (
        <FormInput
          label="Icon Class"
          value={item.icon ?? ""}
          onChange={(e) => onChange({ ...item, icon: e.target.value })}
          placeholder="devicon-linkedin-plain"
        />
      ) : (
        <ImageUpload
          value={item.image ?? ""}
          onChange={(dataUrl) => onChange({ ...item, image: dataUrl })}
        />
      )}
    </div>
  );
}
