export interface Contact {
  label: string;
  href: string;
  color: string;
  iconType?: "icon" | "image";
  icon?: string;
  image?: string;
}

export interface Education {
  date: string;
  degree: string;
  institution: string;
  courses: string[];
}

export interface Experience {
  date: string;
  title: string;
  company: string;
  location: string;
  points: string[];
}

export interface Hackathon {
  title: string;
  project: string;
  description: string;
  award: string;
  svg: string;
  link: string;
}

export interface ProjectDescriptionBlock {
  type: "paragraph" | "points";
  content: string | string[];
}

export interface Project {
  thumbnail: string;
  title: string;
  shortDescription: string;
  fullDescription: ProjectDescriptionBlock[];
  tech: string[];
  images: string[];
  buttonText: string;
  buttonLink: string;
}

export interface Skill {
  name: string;
  iconClass?: string;
  iconUrl?: string;
  iconType?: "class" | "url";
}

export interface Volunteering {
  date: string;
  title: string;
  organization: string;
  description: string;
}

export interface Publication {
  title: string;
  journal: {
    name: string;
    publishedDate: string;
  };
  description: string;
  methods: string[];
  identifiers: {
    DOI?: string;
    PMCID?: string;
  };
  links: {
    mdpi?: string;
    pmc?: string;
  };
}

export interface ProfileData {
  contacts: Contact[];
  education: Education[];
  experiences: Experience[];
  hackathons: Hackathon[];
  projects: Project[];
  skills: Skill[];
  volunteering: Volunteering[];
  publications: Publication[];
}

export type SectionKey = keyof ProfileData;

export type SectionItem =
  | Contact
  | Education
  | Experience
  | Hackathon
  | Project
  | Skill
  | Volunteering
  | Publication;

export const SECTION_DEFAULTS: Record<SectionKey, SectionItem> = {
  experiences: { date: "", title: "", company: "", location: "", points: [] },
  education: { date: "", degree: "", institution: "", courses: [] },
  publications: {
    title: "",
    journal: { name: "", publishedDate: "" },
    description: "",
    methods: [],
    identifiers: { DOI: "", PMCID: "" },
    links: { mdpi: "", pmc: "" },
  },
  hackathons: { title: "", project: "", description: "", award: "", svg: "", link: "" },
  volunteering: { date: "", title: "", organization: "", description: "" },
  projects: {
    thumbnail: "",
    title: "",
    shortDescription: "",
    fullDescription: [],
    tech: [],
    images: [],
    buttonText: "",
    buttonLink: "",
  },
  skills: { name: "", iconType: "class", iconClass: "", iconUrl: "" },
  contacts: { label: "", href: "", color: "", iconType: "icon", icon: "", image: "" },
};
