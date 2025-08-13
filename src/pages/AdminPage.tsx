import { useState, useEffect, useCallback } from "react";

interface Contact {
  label: string;
  href: string;
  color: string;
  iconType?: "icon" | "image";
  icon?: string;
  image?: string;
}

interface Education {
  date: string;
  degree: string;
  institution: string;
  courses: string[];
}
interface Experience {
  date: string;
  title: string;
  company: string;
  location: string;
  points: string[];
}
interface Hackathon {
  title: string;
  project: string;
  description: string;
  award: string;
  svg: string;
  link: string;
}
interface ProjectDescriptionBlock {
  type: "paragraph" | "points";
  content: string | string[];
}

interface Project {
  thumbnail: string;
  title: string;
  shortDescription: string;
  fullDescription: ProjectDescriptionBlock[];
  tech: string[];
  images: string[];
  buttonText: string;
  buttonLink: string;
}
interface Skill {
  name: string;
  iconClass?: string;
  iconUrl?: string;
  iconType?: "class" | "url";
}
// Add or update these interfaces in your types block
interface Volunteering {
  date: string;
  title: string;
  organization: string;
  description: string;
}

interface Publication {
  title: string;
  journal: {
    name: string;
    publishedDate: string;
  };
  description: string;
  methods: string[]; // comma input -> array
  identifiers: {
    DOI?: string;
    PMCID?: string;
  };
  links: {
    mdpi?: string;
    pmc?: string;
  };
}

interface ProfileData {
  contacts: Contact[];
  education: Education[];
  experiences: Experience[];
  hackathons: Hackathon[];
  projects: Project[];
  skills: Skill[];
  volunteering: Volunteering[];
  publications: Publication[];
}

const defaultData: ProfileData = {
  education: [],
  experiences: [],
  hackathons: [],
  projects: [],
  skills: [],
  volunteering: [],
  publications: [],
  contacts: [],
};

// --- JSON syntax highlighting helpers ---
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function syntaxHighlight(json: string) {
  const escaped = escapeHtml(json);
  return escaped.replace(
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "";
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? "font-semibold text-indigo-700" : "font-normal text-teal-700"; // key vs string
      } else if (/true|false/.test(match)) {
        cls = "text-red-500";
      } else if (/null/.test(match)) {
        cls = "text-purple-500";
      } else {
        cls = "text-amber-500";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

export default function ProfileEditor() {
  const [data, setData] = useState<ProfileData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch initial data from backend
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((json) => setData({ ...defaultData, ...json }))
      .catch((err: any) => setError("Failed to load data"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  type SectionKey = keyof ProfileData;

  type ChangeHandler = (
    section: SectionKey,
    index: number,
    field: string,
    value: any
  ) => void;

  const handleChange: ChangeHandler = useCallback(
    (section, index, field, value) => {
      setData((prev) => {
        const updated = [...prev[section]];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, [section]: updated };
      });
    },
    []
  );

  interface HandleAdd {
    (section: SectionKey, newEntry: any): void;
  }

  // Update handleAdd to include iconType
  const handleAdd: HandleAdd = useCallback((section, newEntry) => {
    setData((prev) => ({ ...prev, [section]: [...prev[section], newEntry] }));
  }, []);

  const handleRemove = useCallback(
    (section: keyof ProfileData, index: number) => {
      setData((prev) => ({
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index),
      }));
    },
    []
  );

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("http://localhost:3000/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.status === "success") {
        setSuccess("Profile saved successfully!");
        setData(result.data);
      } else {
        setError(result.message || "Failed to save profile");
      }
    } catch (e: any) {
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-gray-900 dark:text-white">
        🛠️ Profile Editor
      </h1>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Form */}
        <div className="flex-1 min-w-0">
          {loading && (
            <div className="text-blue-600 text-center mb-4">Loading...</div>
          )}
          {error && (
            <div className="text-red-600 text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-center mb-4">{success}</div>
          )}

          {/* EXPERIENCES */}
          <Section title="Experiences">
            {data.experiences.length === 0 && (
              <div className="text-gray-400 italic text-sm mb-2">
                No experiences added yet.
              </div>
            )}
            {data.experiences.map((exp, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-0 mb-6 shadow-sm transition hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-base">
                    Experience #{i + 1}
                  </span>
                  <button
                    onClick={() => handleRemove("experiences", i)}
                    className="text-gray-400 hover:text-red-600 bg-transparent p-1 rounded-full transition"
                    type="button"
                    title="Remove experience"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
                {/* Card Body */}
                <div className="flex flex-col gap-4 px-6 py-6">
                  <Input
                    label="Date"
                    value={(exp as Experience).date || ""}
                    placeholder="e.g. Aug 2024 – Present"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("experiences", i, "date", e.target.value)
                    }
                  />
                  <Input
                    label="Title"
                    value={(exp as Experience).title || ""}
                    placeholder="e.g. Full Stack Developer"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("experiences", i, "title", e.target.value)
                    }
                  />
                  <Input
                    label="Company"
                    value={(exp as Experience).company || ""}
                    placeholder="e.g. Rainier Technologies"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("experiences", i, "company", e.target.value)
                    }
                  />
                  <Input
                    label="Location"
                    value={(exp as Experience).location || ""}
                    placeholder="e.g. Montreal, Canada"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("experiences", i, "location", e.target.value)
                    }
                  />

                  {/* Points/bullets */}
                  <div>
                    <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1 font-medium">
                      Bullet Points
                    </span>
                    <div className="space-y-2">
                      {(exp as Experience).points?.map((pt, pi) => (
                        <div key={pi} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={pt}
                            placeholder={`Point ${pi + 1}`}
                            onChange={(e) =>
                              handleChange(
                                "experiences",
                                i,
                                "points",
                                (exp as Experience).points.map((p, idx) =>
                                  idx === pi ? e.target.value : p
                                )
                              )
                            }
                            className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                          />
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 px-2 py-1 rounded transition"
                            title="Remove point"
                            onClick={() =>
                              handleChange(
                                "experiences",
                                i,
                                "points",
                                (exp as Experience).points.filter(
                                  (_, idx) => idx !== pi
                                )
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium transition"
                        onClick={() =>
                          handleChange("experiences", i, "points", [
                            ...((exp as Experience).points || []),
                            "",
                          ])
                        }
                      >
                        + Add Point
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                handleAdd("experiences", {
                  date: "",
                  title: "",
                  company: "",
                  location: "",
                  points: [],
                } as Experience)
              }
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition flex items-center gap-2"
              type="button"
            >
              Add Experience
            </button>
          </Section>

          {/* EDUCATION */}
          <Section title="Education">
            {data.education.length === 0 && (
              <div className="text-gray-400 italic text-sm mb-2">
                No education entries added yet.
              </div>
            )}
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-0 mb-6 shadow-sm transition hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-base">
                    Education #{i + 1}
                  </span>
                  <button
                    onClick={() => handleRemove("education", i)}
                    className="text-gray-400 hover:text-red-600 bg-transparent p-1 rounded-full transition"
                    type="button"
                    title="Remove education"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
                {/* Card Body */}
                <div className="flex flex-col gap-4 px-6 py-6">
                  <Input
                    label="Date"
                    value={(edu as Education).date || ""}
                    placeholder="e.g. 2023 – 2024"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("education", i, "date", e.target.value)
                    }
                  />
                  <Input
                    label="Degree"
                    value={(edu as Education).degree || ""}
                    placeholder="e.g. Master of Engineering in Quality Systems Engineering"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("education", i, "degree", e.target.value)
                    }
                  />
                  <Input
                    label="Institution"
                    value={(edu as Education).institution || ""}
                    placeholder="e.g. Concordia University — Montreal, QC"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(
                        "education",
                        i,
                        "institution",
                        e.target.value
                      )
                    }
                  />
                  <div>
                    <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1 font-medium">
                      Relevant Courses
                    </span>
                    <div className="space-y-2">
                      {(edu as Education).courses?.map((course, ci) => (
                        <div key={ci} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={course}
                            placeholder={`Course ${ci + 1}`}
                            onChange={(e) =>
                              handleChange(
                                "education",
                                i,
                                "courses",
                                (edu as Education).courses.map((c, idx) =>
                                  idx === ci ? e.target.value : c
                                )
                              )
                            }
                            className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                          />
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700 px-2 py-1 rounded transition"
                            title="Remove course"
                            onClick={() =>
                              handleChange(
                                "education",
                                i,
                                "courses",
                                (edu as Education).courses.filter(
                                  (_, idx) => idx !== ci
                                )
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium transition"
                        onClick={() =>
                          handleChange("education", i, "courses", [
                            ...((edu as Education).courses || []),
                            "",
                          ])
                        }
                      >
                        + Add Course
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                handleAdd("education", {
                  date: "",
                  degree: "",
                  institution: "",
                  courses: [],
                } as Education)
              }
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition flex items-center gap-2"
              type="button"
            >
              Add Education
            </button>
          </Section>

          {/* PUBLICATIONS */}
          <Section title="Publications">
            {data.publications.length === 0 && (
              <div className="text-gray-400 italic text-sm mb-2">
                No publications added yet.
              </div>
            )}

            {data.publications.map((pub, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-0 mb-6 shadow-sm transition hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-base">
                    Publication #{i + 1}
                  </span>
                  <button
                    onClick={() => handleRemove("publications", i)}
                    className="text-gray-400 hover:text-red-600 bg-transparent p-1 rounded-full transition"
                    type="button"
                    title="Remove publication"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="sr-only">Remove</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-4 px-6 py-6">
                  <Input
                    label="Title"
                    value={pub.title || ""}
                    placeholder="e.g. SHAP-based Analysis for Dengue Severity Prediction"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("publications", i, "title", e.target.value)
                    }
                  />

                  {/* Journal nested fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Journal Name"
                      value={pub.journal?.name || ""}
                      placeholder="e.g. Journal of MDPI"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("publications", i, "journal", {
                          ...pub.journal,
                          name: e.target.value,
                          publishedDate: pub.journal?.publishedDate || "",
                        })
                      }
                    />
                    <Input
                      label="Published Date"
                      value={pub.journal?.publishedDate || ""}
                      placeholder="e.g. 26 August 2022"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("publications", i, "journal", {
                          ...pub.journal,
                          name: pub.journal?.name || "",
                          publishedDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Textarea
                    label="Description"
                    value={pub.description || ""}
                    placeholder="Abstract or summary of the work..."
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(
                        "publications",
                        i,
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                  />

                  {/* Methods array */}
                  <Textarea
                    label="Methods (comma-separated)"
                    value={(pub.methods || []).join(", ")}
                    placeholder="e.g. Python, SHAP, XGBoost, Hierarchical Clustering"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const arr = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                      handleChange("publications", i, "methods", arr);
                    }}
                    rows={2}
                  />

                  {/* Identifiers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="DOI"
                      value={pub.identifiers?.DOI || ""}
                      placeholder="e.g. 10.339/jimaging8090229"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("publications", i, "identifiers", {
                          ...pub.identifiers,
                          DOI: e.target.value,
                          PMCID: pub.identifiers?.PMCID || "",
                        })
                      }
                    />
                    <Input
                      label="PMCID"
                      value={pub.identifiers?.PMCID || ""}
                      placeholder="e.g. PMC9506144"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("publications", i, "identifiers", {
                          ...pub.identifiers,
                          DOI: pub.identifiers?.DOI || "",
                          PMCID: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Links */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="MDPI Link"
                      value={pub.links?.mdpi || ""}
                      placeholder="https://..."
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("publications", i, "links", {
                          ...pub.links,
                          mdpi: e.target.value,
                          pmc: pub.links?.pmc || "",
                        })
                      }
                    />
                    <Input
                      label="PMC Link"
                      value={pub.links?.pmc || ""}
                      placeholder="https://..."
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("publications", i, "links", {
                          ...pub.links,
                          mdpi: pub.links?.mdpi || "",
                          pmc: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() =>
                handleAdd("publications", {
                  title: "",
                  journal: { name: "", publishedDate: "" },
                  description: "",
                  methods: [],
                  identifiers: { DOI: "", PMCID: "" },
                  links: { mdpi: "", pmc: "" },
                } as Publication)
              }
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition flex items-center gap-2"
              type="button"
            >
              Add Publication
            </button>
          </Section>
          {/* HACKATHONS */}
          <Section title="Hackathons">
            {data.hackathons.length === 0 && (
              <div className="text-gray-400 italic text-sm mb-2">
                No hackathons added yet.
              </div>
            )}
            {data.hackathons.map((hack, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-0 mb-6 shadow-sm transition hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-base">
                    Hackathon #{i + 1}
                  </span>
                  <button
                    onClick={() => handleRemove("hackathons", i)}
                    className="text-gray-400 hover:text-red-600 bg-transparent p-1 rounded-full transition"
                    type="button"
                    title="Remove hackathon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
                {/* Card Body */}
                <div className="flex flex-col gap-4 px-6 py-6">
                  <Input
                    label="Title"
                    value={hack.title || ""}
                    placeholder="e.g. JACHacks 2025"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("hackathons", i, "title", e.target.value)
                    }
                  />
                  <Input
                    label="Project"
                    value={hack.project || ""}
                    placeholder="e.g. Doable"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("hackathons", i, "project", e.target.value)
                    }
                  />
                  <Textarea
                    label="Description"
                    value={hack.description || ""}
                    placeholder="Brief description of the project and stack..."
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange("hackathons", i, "description", e.target.value)
                    }
                    rows={3}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Award / Recognition"
                      value={hack.award || ""}
                      placeholder="e.g. Top 5 Finalist"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("hackathons", i, "award", e.target.value)
                      }
                    />
                    <Input
                      label="SVG Icon Path"
                      value={hack.svg || ""}
                      placeholder="/imgs/trophy.svg"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("hackathons", i, "svg", e.target.value)
                      }
                    />
                  </div>
                  <Input
                    label="Link"
                    value={hack.link || ""}
                    placeholder="https://..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("hackathons", i, "link", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                handleAdd("hackathons", {
                  title: "",
                  project: "",
                  description: "",
                  award: "",
                  svg: "",
                  link: "",
                } as Hackathon)
              }
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition flex items-center gap-2"
              type="button"
            >
              Add Hackathon
            </button>
          </Section>
          {/* VOLUNTEERING */}
          <Section title="Volunteering">
            {data.volunteering.length === 0 && (
              <div className="text-gray-400 italic text-sm mb-2">
                No volunteering entries added yet.
              </div>
            )}

            {data.volunteering.map((vol, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-0 mb-6 shadow-sm transition hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-base">
                    Volunteering #{i + 1}
                  </span>
                  <button
                    onClick={() => handleRemove("volunteering", i)}
                    className="text-gray-400 hover:text-red-600 bg-transparent p-1 rounded-full transition"
                    type="button"
                    title="Remove volunteering"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="sr-only">Remove</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-4 px-6 py-6">
                  <Input
                    label="Date"
                    value={vol.date || ""}
                    placeholder="e.g. 2023 – 2024"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("volunteering", i, "date", e.target.value)
                    }
                  />
                  <Input
                    label="Title"
                    value={vol.title || ""}
                    placeholder="e.g. Vice President Internal"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("volunteering", i, "title", e.target.value)
                    }
                  />
                  <Input
                    label="Organization"
                    value={vol.organization || ""}
                    placeholder="e.g. BDGSA – Concordia University"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(
                        "volunteering",
                        i,
                        "organization",
                        e.target.value
                      )
                    }
                  />
                  <Textarea
                    label="Description"
                    value={vol.description || ""}
                    placeholder="Describe your responsibilities and impact..."
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(
                        "volunteering",
                        i,
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() =>
                handleAdd("volunteering", {
                  date: "",
                  title: "",
                  organization: "",
                  description: "",
                } as Volunteering)
              }
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition flex items-center gap-2"
              type="button"
            >
              Add Volunteering
            </button>
          </Section>

          {/* PROJECTS */}
          <Section title="Projects">
            {data.projects.length === 0 && (
              <div className="text-gray-400 italic text-sm mb-2">
                No projects added yet.
              </div>
            )}
            {data.projects.map((proj, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-0 mb-6 shadow-sm transition hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-base">
                    Project #{i + 1}
                  </span>
                  <button
                    onClick={() => handleRemove("projects", i)}
                    className="text-gray-400 hover:text-red-600 bg-transparent p-1 rounded-full transition"
                    type="button"
                    title="Remove project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Remove</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-4 px-6 py-6">
                  <Input
                    label="Title"
                    value={(proj as Project).title || ""}
                    placeholder="e.g. EHR Cloud System"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("projects", i, "title", e.target.value)
                    }
                  />
                  <Input
                    label="Thumbnail URL"
                    value={(proj as Project).thumbnail || ""}
                    placeholder="/imgs/cloudehr.png"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange("projects", i, "thumbnail", e.target.value)
                    }
                  />
                  <Textarea
                    label="Short Description"
                    value={(proj as Project).shortDescription || ""}
                    placeholder="Brief summary of the project"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange("projects", i, "shortDescription", e.target.value)
                    }
                    rows={3}
                  />

                  {/* Full Description Blocks */}
                  <div>
                    <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1 font-medium">
                      Full Description Blocks
                    </span>
                    <div className="space-y-4">
                      {((proj as Project).fullDescription || []).map((block, bi) => {
                        const b = block as ProjectDescriptionBlock;
                        const blockType = b.type || "paragraph";
                        return (
                          <div key={bi} className="border rounded-lg p-4 dark:border-gray-700">
                            <div className="flex items-center justify-between gap-4">
                              <label className="text-sm font-medium">Block Type</label>
                              <select
                                value={blockType}
                                onChange={(e) => {
                                  const newType = e.target.value as "paragraph" | "points";
                                  const updatedBlocks = [...((proj as Project).fullDescription || [])];
                                  const currentContent = updatedBlocks[bi]?.content;
                                  updatedBlocks[bi] = {
                                    type: newType,
                                    content: newType === "points"
                                      ? Array.isArray(currentContent)
                                        ? currentContent
                                        : (currentContent ? [String(currentContent)] : [])
                                      : Array.isArray(currentContent)
                                        ? (currentContent.join("\n"))
                                        : (currentContent || "")
                                  } as ProjectDescriptionBlock;
                                  handleChange("projects", i, "fullDescription", updatedBlocks);
                                }}
                                className="px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                              >
                                <option value="paragraph">Paragraph</option>
                                <option value="points">Points</option>
                              </select>
                            </div>

                            {/* Content Editor */}
                            {blockType === "paragraph" ? (
                              <Textarea
                                label="Paragraph Content"
                                value={typeof b.content === "string" ? b.content : (b.content || []).join("\n")}
                                placeholder="Write paragraph text..."
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                  const updatedBlocks = [...((proj as Project).fullDescription || [])];
                                  updatedBlocks[bi] = { type: "paragraph", content: e.target.value };
                                  handleChange("projects", i, "fullDescription", updatedBlocks);
                                }}
                                rows={4}
                              />
                            ) : (
                              <div className="mt-3">
                                <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1 font-medium">
                                  Points
                                </span>
                                <div className="space-y-2">
                                  {(Array.isArray(b.content) ? b.content : []).map((pt, pi) => (
                                    <div key={pi} className="flex gap-2 items-center">
                                      <input
                                        type="text"
                                        value={pt}
                                        placeholder={`Point ${pi + 1}`}
                                        onChange={(e) => {
                                          const updatedBlocks = [...((proj as Project).fullDescription || [])];
                                          const pts = Array.isArray(updatedBlocks[bi].content) ? [...(updatedBlocks[bi].content as string[])] : [];
                                          pts[pi] = e.target.value;
                                          updatedBlocks[bi] = { type: "points", content: pts };
                                          handleChange("projects", i, "fullDescription", updatedBlocks);
                                        }}
                                        className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                      />
                                      <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700 px-2 py-1 rounded transition"
                                        title="Remove point"
                                        onClick={() => {
                                          const updatedBlocks = [...((proj as Project).fullDescription || [])];
                                          const pts = Array.isArray(updatedBlocks[bi].content) ? [...(updatedBlocks[bi].content as string[])] : [];
                                          updatedBlocks[bi] = { type: "points", content: pts.filter((_, idx) => idx !== pi) };
                                          handleChange("projects", i, "fullDescription", updatedBlocks);
                                        }}
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    className="mt-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium transition"
                                    onClick={() => {
                                      const updatedBlocks = [...((proj as Project).fullDescription || [])];
                                      const pts = Array.isArray(updatedBlocks[bi]?.content) ? [...(updatedBlocks[bi].content as string[])] : [];
                                      pts.push("");
                                      updatedBlocks[bi] = { type: "points", content: pts };
                                      handleChange("projects", i, "fullDescription", updatedBlocks);
                                    }}
                                  >
                                    + Add Point
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Remove block */}
                            <div className="mt-3 text-right">
                              <button
                                type="button"
                                className="text-red-500 hover:text-red-700 text-sm"
                                onClick={() => {
                                  const updatedBlocks = [...((proj as Project).fullDescription || [])];
                                  updatedBlocks.splice(bi, 1);
                                  handleChange("projects", i, "fullDescription", updatedBlocks);
                                }}
                              >
                                Remove Block
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                          onClick={() => {
                            const blocks = [...((proj as Project).fullDescription || [])];
                            blocks.push({ type: "paragraph", content: "" });
                            handleChange("projects", i, "fullDescription", blocks);
                          }}
                        >
                          + Add Paragraph Block
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                          onClick={() => {
                            const blocks = [...((proj as Project).fullDescription || [])];
                            blocks.push({ type: "points", content: [] });
                            handleChange("projects", i, "fullDescription", blocks);
                          }}
                        >
                          + Add Points Block
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <Textarea
                    label="Tech (comma-separated)"
                    value={((proj as Project).tech || []).join(", ")}
                    placeholder="e.g. Node.js, VueJS, Docker"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const arr = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                      handleChange("projects", i, "tech", arr);
                    }}
                    rows={2}
                  />

                  {/* Images */}
                  <Textarea
                    label="Images (one per line)"
                    value={((proj as Project).images || []).join("\n")}
                    placeholder="/assets/ehr/sample-1.png\n/assets/ehr/sample-2.png"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const arr = e.target.value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
                      handleChange("projects", i, "images", arr);
                    }}
                    rows={3}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Button Text"
                      value={(proj as Project).buttonText || ""}
                      placeholder="e.g. View Live →"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("projects", i, "buttonText", e.target.value)
                      }
                    />
                    <Input
                      label="Button Link"
                      value={(proj as Project).buttonLink || ""}
                      placeholder="https://..."
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("projects", i, "buttonLink", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                handleAdd("projects", {
                  thumbnail: "",
                  title: "",
                  shortDescription: "",
                  fullDescription: [],
                  tech: [],
                  images: [],
                  buttonText: "",
                  buttonLink: "",
                } as Project)
              }
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition flex items-center gap-2"
              type="button"
            >
              Add Project
            </button>
          </Section>

          {/* SKILLS */}
          <Section title="Skills">
            {data.skills.length === 0 && (
              <div className="text-gray-400 italic text-sm mb-2">
                No skills added yet.
              </div>
            )}
            {data.skills.map((skill, i) => {
              const iconType =
                skill.iconType || (skill.iconUrl ? "url" : "class");
              return (
                <div
                  key={i}
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-0 mb-6 shadow-sm transition hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 text-base">
                      Skill #{i + 1}
                    </span>
                    <button
                      onClick={() => handleRemove("skills", i)}
                      className="text-gray-400 hover:text-red-600 bg-transparent p-1 rounded-full transition"
                      type="button"
                      title="Remove skill"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                  {/* Card Body */}
                  <div className="flex flex-col gap-4 px-6 py-6">
                    <Input
                      label="Skill Name"
                      value={skill.name || ""}
                      placeholder="e.g. TypeScript"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("skills", i, "name", e.target.value)
                      }
                    />

                    {/* Icon type switch */}
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`skill-icon-type-${i}`}
                          checked={iconType === "class"}
                          onChange={() => {
                            handleChange("skills", i, "iconType", "class");
                            handleChange("skills", i, "iconUrl", "");
                          }}
                          className="accent-blue-600"
                        />
                        <span className="text-sm font-medium">Icon Class</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`skill-icon-type-${i}`}
                          checked={iconType === "url"}
                          onChange={() => {
                            handleChange("skills", i, "iconType", "url");
                            handleChange("skills", i, "iconClass", "");
                          }}
                          className="accent-blue-600"
                        />
                        <span className="text-sm font-medium">Icon URL</span>
                      </label>
                    </div>

                    {iconType === "class" ? (
                      <div className="space-y-2">
                        <Input
                          label="Icon Class (e.g. devicon-typescript-plain text-blue-500)"
                          value={skill.iconClass || ""}
                          placeholder="devicon-..."
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(
                              "skills",
                              i,
                              "iconClass",
                              e.target.value
                            )
                          }
                        />
                        {/* Preview for class-based icon (uses <i>) */}
                        {skill.iconClass && (
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Preview:</span>
                            <i className={skill.iconClass} aria-hidden="true" />
                            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                              {skill.iconClass}
                            </code>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Input
                          label="Icon URL"
                          value={skill.iconUrl || ""}
                          placeholder="https://.../icon.svg"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange("skills", i, "iconUrl", e.target.value)
                          }
                        />
                        {/* Preview for URL icon */}
                        {skill.iconUrl && (
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Preview:</span>
                            <img
                              src={skill.iconUrl}
                              alt={skill.name || "icon"}
                              className="h-6 w-6 object-contain rounded"
                            />
                            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded text-xs break-all">
                              {skill.iconUrl}
                            </code>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <button
              onClick={() =>
                handleAdd("skills", {
                  name: "",
                  iconClass: "",
                  iconUrl: "",
                  iconType: "class",
                } as Skill)
              }
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition flex items-center gap-2"
              type="button"
            >
              Add Skill
            </button>
          </Section>
          {/* CONTACTS */}
          <Section title="Contact Links">
            {data.contacts.length === 0 && (
              <div className="text-gray-400 italic text-sm mb-2">
                No contacts added yet.
              </div>
            )}
            {data.contacts.map((contact, i) => {
              const iconOrImage = contact.iconType || "icon";
              return (
                <div
                  key={i}
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-0 mb-6 shadow-sm transition hover:shadow-md"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 rounded-t-xl bg-gray-50 dark:bg-gray-900">
                    <span className="font-semibold text-gray-700 dark:text-gray-200 text-base">
                      Contact #{i + 1}
                    </span>
                    <button
                      onClick={(): void => handleRemove("contacts", i)}
                      className="text-gray-400 hover:text-red-600 bg-transparent p-1 rounded-full transition"
                      type="button"
                      title="Remove contact"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="sr-only">Remove</span>
                    </button>
                  </div>
                  {/* Card Body */}
                  <div className="flex flex-col gap-4 px-6 py-6">
                    <Input
                      label="Platform"
                      value={contact.label}
                      placeholder="e.g. LinkedIn"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("contacts", i, "label", e.target.value)
                      }
                    />
                    <Input
                      label="Link"
                      value={contact.href}
                      placeholder="https://..."
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("contacts", i, "href", e.target.value)
                      }
                    />
                    <Input
                      label="Color Classes (Tailwindcss)"
                      value={contact.color}
                      placeholder="e.g. bg-blue-600 text-white"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("contacts", i, "color", e.target.value)
                      }
                    />
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`iconOrImage-${i}`}
                          checked={iconOrImage === "icon"}
                          onChange={() => {
                            handleChange("contacts", i, "iconType", "icon");
                            handleChange("contacts", i, "image", "");
                          }}
                          className="accent-blue-600"
                        />
                        <span className="text-sm font-medium">Icon Class</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`iconOrImage-${i}`}
                          checked={iconOrImage === "image"}
                          onChange={() => {
                            handleChange("contacts", i, "iconType", "image");
                            handleChange("contacts", i, "icon", "");
                          }}
                          className="accent-blue-600"
                        />
                        <span className="text-sm font-medium">
                          Upload Image
                        </span>
                      </label>
                    </div>
                    {iconOrImage === "icon" ? (
                      <Input
                        label="Icon Class"
                        value={contact.icon || ""}
                        placeholder="e.g. fa-brands fa-linkedin"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange("contacts", i, "icon", e.target.value)
                        }
                      />
                    ) : (
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1 font-medium">
                          Image Upload
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                handleChange(
                                  "contacts",
                                  i,
                                  "image",
                                  ev.target?.result as string
                                );
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {contact.image && (
                          <img
                            src={contact.image}
                            alt="Contact"
                            className="mt-3 max-h-16 rounded shadow border border-gray-200 dark:border-gray-700"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <button
              onClick={() =>
                handleAdd("contacts", {
                  label: "",
                  href: "",
                  color: "",
                  iconType: "icon",
                  icon: "",
                  image: "",
                })
              }
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition flex items-center gap-2"
              type="button"
            >
              Add Contact
            </button>
          </Section>

          {/* Add other sections similarly... */}

          <div className="text-center mt-10">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold shadow-lg transition"
              disabled={loading}
              type="button"
            >
              💾 Save Profile
            </button>
          </div>
        </div>
        {/* Right: JSON Data */}
        <div className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 overflow-auto border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800 dark:text-gray-100">
            Current JSON
          </h2>
          <pre
            className="text-xs md:text-sm whitespace-pre break-words font-mono rounded-lg p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 overflow-auto shadow-inner"
            style={{ maxHeight: 700 }}
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(JSON.stringify(data, null, 2)),
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="mt-15 mb-15">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...props }: InputProps) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </span>
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      />
    </label>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function Textarea({ label, ...props }: TextareaProps) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      />
    </label>
  );
}