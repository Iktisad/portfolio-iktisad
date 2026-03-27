import React, { useState } from "react";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import PublicationForm from "./forms/PublicationForm";
import VolunteeringForm from "./forms/VolunteeringForm";
import type {
  SectionKey,
  SectionItem,
  Experience,
  Education,
  Publication,
  Hackathon,
  Volunteering,
  Project,
  Skill,
  Contact,
  ProjectDescriptionBlock,
} from "./types";

interface SectionMeta {
  title: string;
  singular: string;
  primaryLine: (item: SectionItem) => string;
  secondaryLine: (item: SectionItem) => string;
}

const SECTION_META: Record<SectionKey, SectionMeta> = {
  experiences: {
    title: "Experiences",
    singular: "Experience",
    primaryLine: (i) => { const e = i as Experience; return `${e.title} at ${e.company}`; },
    secondaryLine: (i) => { const e = i as Experience; return `${e.date} · ${e.location}`; },
  },
  education: {
    title: "Education",
    singular: "Education",
    primaryLine: (i) => (i as Education).degree,
    secondaryLine: (i) => { const e = i as Education; return `${e.institution} · ${e.date}`; },
  },
  publications: {
    title: "Publications",
    singular: "Publication",
    primaryLine: (i) => (i as Publication).title,
    secondaryLine: (i) => { const p = i as Publication; return `${p.journal.name} · ${p.journal.publishedDate}`; },
  },
  hackathons: {
    title: "Hackathons",
    singular: "Hackathon",
    primaryLine: (i) => { const h = i as Hackathon; return `${h.title} · ${h.project}`; },
    secondaryLine: (i) => (i as Hackathon).award,
  },
  volunteering: {
    title: "Volunteering",
    singular: "Volunteering",
    primaryLine: (i) => { const v = i as Volunteering; return `${v.title} at ${v.organization}`; },
    secondaryLine: (i) => (i as Volunteering).date,
  },
  projects: {
    title: "Projects",
    singular: "Project",
    primaryLine: (i) => (i as Project).title,
    secondaryLine: (i) => {
      const desc = (i as Project).shortDescription;
      return desc.length > 80 ? desc.slice(0, 80) + "…" : desc;
    },
  },
  skills: {
    title: "Skills",
    singular: "Skill",
    primaryLine: (i) => (i as Skill).name,
    secondaryLine: (i) => {
      const s = i as Skill;
      return s.iconClass || s.iconUrl || "—";
    },
  },
  contacts: {
    title: "Contacts",
    singular: "Contact",
    primaryLine: (i) => (i as Contact).label,
    secondaryLine: (i) => (i as Contact).href,
  },
};

interface SectionViewProps {
  sectionKey: SectionKey;
  items: SectionItem[];
  onEdit: (index: number) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  onInlineSave: (sectionKey: SectionKey, item: SectionItem, index: number) => void;
}

// ── Icon buttons ───────────────────────────────────────────────────────────
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

// ── Empty state ────────────────────────────────────────────────────────────
function EmptyState({ singular, onAdd }: { singular: string; onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
      <p className="text-sm">No {singular.toLowerCase()}s yet</p>
      <button onClick={onAdd} className="mt-2 text-sm text-orange-500 hover:underline">
        Add your first {singular.toLowerCase()}
      </button>
    </div>
  );
}

// ── Inline save/cancel footer ──────────────────────────────────────────────
function InlineFooter({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  return (
    <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-gray-100">
      <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
        Cancel
      </button>
      <button onClick={onSave} className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors">
        Save
      </button>
    </div>
  );
}

// ── Shared icon action buttons ─────────────────────────────────────────────
function IconActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-1 shrink-0">
      <button onClick={onEdit} className="p-1.5 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors" aria-label="Edit">
        <EditIcon />
      </button>
      <button onClick={onDelete} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" aria-label="Delete">
        <TrashIcon />
      </button>
    </div>
  );
}

// ── Generic inline-editable section ───────────────────────────────────────
function InlineSection<T extends SectionItem>({
  items,
  onSave,
  onDelete,
  readView,
  FormComponent,
  wrapperClass = "flex flex-col gap-4",
  cardClass = "border-gray-200 hover:shadow-md",
}: {
  items: T[];
  onSave: (item: T, index: number) => void;
  onDelete: (i: number) => void;
  readView: (item: T, idx: number, onEdit: () => void, onDelete: () => void) => React.ReactNode;
  FormComponent: React.ComponentType<{ item: T; onChange: (updated: T) => void }>;
  wrapperClass?: string;
  cardClass?: string;
}) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<T | null>(null);

  function startEdit(idx: number) { setEditingIdx(idx); setDraft(structuredClone(items[idx])); }
  function cancelEdit() { setEditingIdx(null); setDraft(null); }
  function saveEdit(idx: number) {
    if (draft) { onSave(draft, idx); setEditingIdx(null); setDraft(null); }
  }

  return (
    <div className={wrapperClass}>
      {items.map((item, idx) => {
        const isEditing = editingIdx === idx;
        return (
          <div key={idx} className={`bg-white border-2 rounded-xl shadow-sm transition-shadow ${isEditing ? "border-orange-300 ring-1 ring-orange-100" : cardClass}`}>
            {isEditing && draft ? (
              <div className="p-5">
                <FormComponent item={draft} onChange={(u) => setDraft(u)} />
                <InlineFooter onCancel={cancelEdit} onSave={() => saveEdit(idx)} />
              </div>
            ) : (
              readView(item, idx, () => startEdit(idx), () => onDelete(idx))
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Read views ─────────────────────────────────────────────────────────────
function ExperienceReadView(exp: Experience, _idx: number, onEdit: () => void, onDelete: () => void) {
  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">{exp.date}</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{exp.title}</h3>
          <p className="text-sm italic text-gray-500 mt-0.5">{exp.company} — {exp.location}</p>
        </div>
        <IconActions onEdit={onEdit} onDelete={onDelete} />
      </div>
      {exp.points.length > 0 && (
        <ul className="list-disc ml-5 mt-3 space-y-1 text-sm text-gray-600">
          {exp.points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
      )}
    </div>
  );
}

function EducationReadView(edu: Education, _idx: number, onEdit: () => void, onDelete: () => void) {
  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">{edu.date}</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{edu.degree}</h3>
          <p className="text-sm italic text-gray-500 mt-0.5">{edu.institution}</p>
        </div>
        <IconActions onEdit={onEdit} onDelete={onDelete} />
      </div>
      {edu.courses.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {edu.courses.map((c, i) => <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{c}</span>)}
        </div>
      )}
    </div>
  );
}

function PublicationReadView(pub: Publication, _idx: number, onEdit: () => void, onDelete: () => void) {
  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">{pub.journal.name} · {pub.journal.publishedDate}</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{pub.title}</h3>
          {pub.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{pub.description}</p>}
        </div>
        <IconActions onEdit={onEdit} onDelete={onDelete} />
      </div>
      {pub.methods.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pub.methods.map((m, i) => <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{m}</span>)}
        </div>
      )}
    </div>
  );
}


function VolunteeringReadView(vol: Volunteering, _idx: number, onEdit: () => void, onDelete: () => void) {
  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">{vol.date}</p>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{vol.title}</h3>
          <p className="text-sm italic text-gray-500 mt-0.5">{vol.organization}</p>
          {vol.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{vol.description}</p>}
        </div>
        <IconActions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

// ── Projects: card grid + read-only detail panel ──────────────────────────
function ProjectsSection({
  items,
  onEdit,
  onDelete,
}: {
  items: Project[];
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  function handleDelete(idx: number) {
    onDelete(idx);
    if (activeIdx === idx) setActiveIdx(null);
  }

  const activeProject = activeIdx !== null ? items[activeIdx] : null;

  return (
    <div>
      {/* ── Card grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {items.map((project, idx) => (
          <div
            key={idx}
            onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
            className={`relative group bg-white border-2 rounded-2xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all ${
              activeIdx === idx ? "border-orange-400 ring-2 ring-orange-100" : "border-orange-300"
            }`}
          >
            {/* Hover action icons */}
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(idx); }}
                className="p-1.5 bg-white text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-md shadow-sm transition-colors"
                aria-label="Edit"
              >
                <EditIcon />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); if (window.confirm("Delete this project?")) handleDelete(idx); }}
                className="p-1.5 bg-white text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md shadow-sm transition-colors"
                aria-label="Delete"
              >
                <TrashIcon />
              </button>
            </div>

            {/* Thumbnail */}
            {project.thumbnail ? (
              <img src={project.thumbnail} alt={project.title} className="h-56 w-full object-cover rounded-xl mb-3" />
            ) : (
              <div className="h-56 w-full bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-xs">No image</div>
            )}

            <h3 className="text-base font-bold text-gray-900 leading-tight">{project.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.shortDescription}</p>

            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tech.slice(0, 4).map((t, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs bg-orange-100 text-orange-600 rounded-full">{t}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">+{project.tech.length - 4}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Detail panel (read-only) ── */}
      {activeProject && activeIdx !== null && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <button
              onClick={() => setActiveIdx(null)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to projects
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(activeIdx)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-orange-500 bg-orange-50 hover:bg-orange-100 rounded-md transition-colors"
              >
                <EditIcon /> Edit
              </button>
              <button
                onClick={() => { if (window.confirm("Delete this project?")) handleDelete(activeIdx); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                <TrashIcon /> Delete
              </button>
            </div>
          </div>

          {/* Panel body */}
          <div className="p-6 flex flex-col gap-5">
            {activeProject.thumbnail ? (
              <img src={activeProject.thumbnail} alt={activeProject.title} className="w-full max-h-56 object-cover rounded-xl" />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">No thumbnail</div>
            )}

            <div>
              <h2 className="text-xl font-bold text-gray-900">{activeProject.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{activeProject.shortDescription}</p>
            </div>

            {activeProject.tech.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeProject.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">{t}</span>
                ))}
              </div>
            )}

            {activeProject.fullDescription.length > 0 && (
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {activeProject.fullDescription.map((block: ProjectDescriptionBlock, i: number) =>
                  block.type === "paragraph" ? (
                    <p key={i}>{block.content as string}</p>
                  ) : (
                    <ul key={i} className="list-disc ml-5 space-y-1">
                      {(block.content as string[]).map((pt, j) => <li key={j}>{pt}</li>)}
                    </ul>
                  )
                )}
              </div>
            )}

            {activeProject.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {activeProject.images.map((img, i) => (
                  <img key={i} src={img} alt={`screenshot ${i + 1}`} className="h-24 w-36 object-cover rounded-lg border border-gray-200 shrink-0" />
                ))}
              </div>
            )}

            {activeProject.buttonLink && activeProject.buttonLink !== "#" && (
              <a
                href={activeProject.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-full w-fit transition-colors"
              >
                {activeProject.buttonText || "Visit"}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Skills: card grid ──────────────────────────────────────────────────────
function SkillsSection({
  items,
  onEdit,
  onDelete,
}: {
  items: Skill[];
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((skill, idx) => (
        <div key={idx} className="w-36 h-52 bg-white border-2 border-orange-300 rounded-xl flex flex-col items-center justify-between pt-6 pb-4 px-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center h-14 mb-2">
            {skill.iconClass ? (
              <i className={`${skill.iconClass} text-5xl`} />
            ) : skill.iconUrl ? (
              <img src={skill.iconUrl} alt={skill.name} className="w-12 h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
            )}
          </div>
          <p className="text-center text-sm font-semibold text-gray-700 mb-3 leading-tight">{skill.name}</p>
          <div className="flex gap-1">
            <button onClick={() => onEdit(idx)} className="p-1.5 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors" aria-label="Edit">
              <EditIcon />
            </button>
            <button onClick={() => onDelete(idx)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" aria-label="Delete">
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Hackathons: card grid (modal edit) ────────────────────────────────────
function HackathonsSection({
  items,
  onEdit,
  onDelete,
}: {
  items: Hackathon[];
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((hack, idx) => (
        <div key={idx} className="relative group bg-white border-2 border-orange-300 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col p-6">
          {/* Hover action icons */}
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(idx)} className="p-1.5 bg-white text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-md shadow-sm transition-colors" aria-label="Edit">
              <EditIcon />
            </button>
            <button onClick={() => onDelete(idx)} className="p-1.5 bg-white text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md shadow-sm transition-colors" aria-label="Delete">
              <TrashIcon />
            </button>
          </div>

          {/* Award badge */}
          <div className="flex items-center gap-1.5 self-start bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow mb-4">
            {hack.svg && <img src={hack.svg} alt="award" className="h-4 w-4" />}
            <span>{hack.award}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-1">{hack.title}</h3>
          <p className="text-sm font-semibold text-orange-500 mb-2">{hack.project}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{hack.description}</p>

          {hack.link && (
            <a href={hack.link} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline text-sm font-semibold mt-auto">
              View Project →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
const INLINE_SECTIONS: Partial<Record<SectionKey, true>> = {
  experiences: true,
  education: true,
  publications: true,
  volunteering: true,
};

export default function SectionView({ sectionKey, items, onEdit, onAdd, onDelete, onInlineSave }: SectionViewProps) {
  const meta = SECTION_META[sectionKey];

  function handleDelete(idx: number) {
    if (window.confirm(`Delete this ${meta.singular.toLowerCase()}?`)) {
      onDelete(idx);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{meta.title}</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add {meta.singular}
        </button>
      </div>

      {/* Projects: card grid + detail panel */}
      {sectionKey === "projects" && (
        items.length === 0
          ? <EmptyState singular={meta.singular} onAdd={onAdd} />
          : <ProjectsSection
              items={items as Project[]}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
      )}

      {/* Other inline sections */}
      {INLINE_SECTIONS[sectionKey] && sectionKey !== "projects" && (
        items.length === 0 ? <EmptyState singular={meta.singular} onAdd={onAdd} /> : (
          <>
            {sectionKey === "experiences" && (
              <InlineSection<Experience> items={items as Experience[]} onSave={(item, idx) => onInlineSave("experiences", item, idx)} onDelete={handleDelete} FormComponent={ExperienceForm} readView={ExperienceReadView} />
            )}
            {sectionKey === "education" && (
              <InlineSection<Education> items={items as Education[]} onSave={(item, idx) => onInlineSave("education", item, idx)} onDelete={handleDelete} FormComponent={EducationForm} readView={EducationReadView} />
            )}
            {sectionKey === "publications" && (
              <InlineSection<Publication> items={items as Publication[]} onSave={(item, idx) => onInlineSave("publications", item, idx)} onDelete={handleDelete} FormComponent={PublicationForm} readView={PublicationReadView} />
            )}
            {sectionKey === "volunteering" && (
              <InlineSection<Volunteering> items={items as Volunteering[]} onSave={(item, idx) => onInlineSave("volunteering", item, idx)} onDelete={handleDelete} FormComponent={VolunteeringForm} readView={VolunteeringReadView} />
            )}
          </>
        )
      )}

      {/* Hackathons: card grid + modal edit */}
      {sectionKey === "hackathons" && (
        items.length === 0
          ? <EmptyState singular={meta.singular} onAdd={onAdd} />
          : <HackathonsSection items={items as Hackathon[]} onEdit={onEdit} onDelete={handleDelete} />
      )}

      {/* Skills grid */}
      {sectionKey === "skills" && (
        items.length === 0
          ? <EmptyState singular={meta.singular} onAdd={onAdd} />
          : <SkillsSection items={items as Skill[]} onEdit={onEdit} onDelete={handleDelete} />
      )}

      {/* Contacts: pill buttons matching public style */}
      {sectionKey === "contacts" && (
        items.length === 0 ? (
          <EmptyState singular={meta.singular} onAdd={onAdd} />
        ) : (
          <div className="flex flex-wrap gap-4">
            {(items as Contact[]).map((contact, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Pill button preview */}
                <div className={`flex items-center gap-2 ${contact.color || "bg-gray-400"} text-white px-6 py-3 rounded-full shadow-md`}>
                  {contact.iconType === "image" && contact.image ? (
                    <img src={contact.image} alt={contact.label} className="h-6 w-6 object-contain" />
                  ) : contact.icon ? (
                    <i className={`${contact.icon} text-xl`} />
                  ) : null}
                  <span className="font-medium text-sm">{contact.label || "Untitled"}</span>
                </div>
                {/* Action icons below pill */}
                <div className="flex gap-1">
                  <button onClick={() => onEdit(idx)} className="p-1.5 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors" aria-label="Edit">
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDelete(idx)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" aria-label="Delete">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
