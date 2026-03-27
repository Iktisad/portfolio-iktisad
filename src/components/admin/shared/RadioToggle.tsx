interface RadioToggleProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export default function RadioToggle({ name, label, options, value, onChange }: RadioToggleProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-indigo-600"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
