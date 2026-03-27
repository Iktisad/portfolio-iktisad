import type { SectionKey } from "./types";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "experiences", label: "Experiences" },
  { key: "education", label: "Education" },
  { key: "publications", label: "Publications" },
  { key: "hackathons", label: "Hackathons" },
  { key: "volunteering", label: "Volunteering" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "contacts", label: "Contacts" },
];

interface AdminSidebarProps {
  activeSection: SectionKey;
  onSectionChange: (section: SectionKey) => void;
  onSave: () => void;
  loading: boolean;
  saveStatus: "idle" | "success" | "error";
  statusMessage: string | null;
}

export default function AdminSidebar({
  activeSection,
  onSectionChange,
  onSave,
  loading,
  saveStatus,
  statusMessage,
}: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white flex flex-col border-r border-gray-200 z-40">
      {/* Logo / Title */}
      <div className="px-5 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800">Admin Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => onSectionChange(s.key)}
            className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${
              activeSection === s.key
                ? "bg-orange-50 text-orange-600 border-r-2 border-orange-500"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Footer: status + save */}
      <div className="p-4 border-t border-gray-200 flex flex-col gap-3">
        {statusMessage && (
          <p
            className={`text-xs px-3 py-2 rounded-md ${
              saveStatus === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {statusMessage}
          </p>
        )}
        <button
          onClick={onSave}
          disabled={loading}
          className="w-full py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Saving…
            </span>
          ) : (
            "Save All"
          )}
        </button>
      </div>
    </aside>
  );
}
