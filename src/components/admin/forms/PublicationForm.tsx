import FormInput from "../shared/FormInput";
import FormTextarea from "../shared/FormTextarea";
import type { Publication } from "../types";

interface Props {
  item: Publication;
  onChange: (updated: Publication) => void;
}

export default function PublicationForm({ item, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <FormInput
        label="Title"
        value={item.title}
        onChange={(e) => onChange({ ...item, title: e.target.value })}
        placeholder="Publication title..."
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Journal Name"
          value={item.journal.name}
          onChange={(e) => onChange({ ...item, journal: { ...item.journal, name: e.target.value } })}
          placeholder="MDPI Diagnostics"
        />
        <FormInput
          label="Published Date"
          value={item.journal.publishedDate}
          onChange={(e) => onChange({ ...item, journal: { ...item.journal, publishedDate: e.target.value } })}
          placeholder="26 August 2022"
        />
      </div>
      <FormTextarea
        label="Description"
        value={item.description}
        rows={4}
        onChange={(e) => onChange({ ...item, description: e.target.value })}
        placeholder="Abstract or summary..."
      />
      <FormTextarea
        label="Methods (comma-separated)"
        value={item.methods.join(", ")}
        rows={2}
        onChange={(e) => onChange({ ...item, methods: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
        placeholder="SVM, Random Forest, Python..."
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="DOI"
          value={item.identifiers.DOI ?? ""}
          onChange={(e) => onChange({ ...item, identifiers: { ...item.identifiers, DOI: e.target.value } })}
          placeholder="10.3390/..."
        />
        <FormInput
          label="PMCID"
          value={item.identifiers.PMCID ?? ""}
          onChange={(e) => onChange({ ...item, identifiers: { ...item.identifiers, PMCID: e.target.value } })}
          placeholder="PMC1234567"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="MDPI Link"
          value={item.links.mdpi ?? ""}
          onChange={(e) => onChange({ ...item, links: { ...item.links, mdpi: e.target.value } })}
          placeholder="https://mdpi.com/..."
        />
        <FormInput
          label="PMC Link"
          value={item.links.pmc ?? ""}
          onChange={(e) => onChange({ ...item, links: { ...item.links, pmc: e.target.value } })}
          placeholder="https://ncbi.nlm.nih.gov/..."
        />
      </div>
    </div>
  );
}
