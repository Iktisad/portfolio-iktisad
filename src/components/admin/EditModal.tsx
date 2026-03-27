import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import PublicationForm from "./forms/PublicationForm";
import HackathonForm from "./forms/HackathonForm";
import VolunteeringForm from "./forms/VolunteeringForm";
import ProjectForm from "./forms/ProjectForm";
import SkillForm from "./forms/SkillForm";
import ContactForm from "./forms/ContactForm";
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
} from "./types";
import { SECTION_DEFAULTS } from "./types";

const SECTION_TITLES: Record<SectionKey, string> = {
  experiences: "Experience",
  education: "Education",
  publications: "Publication",
  hackathons: "Hackathon",
  volunteering: "Volunteering",
  projects: "Project",
  skills: "Skill",
  contacts: "Contact",
};

interface EditModalProps {
  isOpen: boolean;
  sectionKey: SectionKey | null;
  item: SectionItem | null;
  onSave: (sectionKey: SectionKey, item: SectionItem) => void;
  onCancel: () => void;
}

export default function EditModal({ isOpen, sectionKey, item, onSave, onCancel }: EditModalProps) {
  const [draft, setDraft] = useState<SectionItem | null>(null);

  useEffect(() => {
    if (isOpen && sectionKey) {
      setDraft(item ? structuredClone(item) : structuredClone(SECTION_DEFAULTS[sectionKey]));
    }
  }, [isOpen, sectionKey, item]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onCancel]);

  function handleSave() {
    if (draft && sectionKey) onSave(sectionKey, draft);
  }

  const isEditing = item !== null;
  const title = sectionKey ? `${isEditing ? "Edit" : "Add"} ${SECTION_TITLES[sectionKey]}` : "";

  return (
    <AnimatePresence>
      {isOpen && draft && sectionKey && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onCancel}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {sectionKey === "experiences" && (
                <ExperienceForm item={draft as Experience} onChange={(u) => setDraft(u)} />
              )}
              {sectionKey === "education" && (
                <EducationForm item={draft as Education} onChange={(u) => setDraft(u)} />
              )}
              {sectionKey === "publications" && (
                <PublicationForm item={draft as Publication} onChange={(u) => setDraft(u)} />
              )}
              {sectionKey === "hackathons" && (
                <HackathonForm item={draft as Hackathon} onChange={(u) => setDraft(u)} />
              )}
              {sectionKey === "volunteering" && (
                <VolunteeringForm item={draft as Volunteering} onChange={(u) => setDraft(u)} />
              )}
              {sectionKey === "projects" && (
                <ProjectForm item={draft as Project} onChange={(u) => setDraft(u)} />
              )}
              {sectionKey === "skills" && (
                <SkillForm item={draft as Skill} onChange={(u) => setDraft(u)} />
              )}
              {sectionKey === "contacts" && (
                <ContactForm item={draft as Contact} onChange={(u) => setDraft(u)} />
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
