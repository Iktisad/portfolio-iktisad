import React from "react";

interface ImageUploadProps {
  value: string;
  onChange: (dataUrl: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) onChange(ev.target.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">Upload Image</span>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {value && (
        <img src={value} alt="Preview" className="h-12 w-12 rounded object-cover border border-gray-300" />
      )}
    </div>
  );
}
