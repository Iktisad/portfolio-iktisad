"use client";

import { useTheme } from "../context/ThemeContext";

interface SocialItem {
  href: string;
  label: string;
  iconClass?: string;
  imageUrl?: string;
}
interface FloatingDockProps {
  className?: string;
}

export function FloatingDock({ className = "" }: FloatingDockProps) {
  const { theme } = useTheme();
  const socials: SocialItem[] = [
    {
      label: "Mail",
      href: "mailto:iktisad.rashid@gmail.com",
      imageUrl: theme === "light" ? "/imgs/mail.svg" : "/imgs/mail_2.svg",
    },
    {
      label: "Linkedin",
      href: "https://linkedin.com/in/iktisad-rashid",
      iconClass:
        theme === "light"
          ? "devicon-linkedin-plain colored"
          : "devicon-linkedin-plain",
    },
    {
      label: "Github",
      href: "https://github.com/Iktisad",
      iconClass: "devicon-github-plain",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/Iktisad",
      iconClass:
        theme === "light"
          ? "devicon-facebook-plain colored"
          : "devicon-facebook-plain",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/iktisad_rashid/",
      imageUrl:
        theme === "light" ? "/imgs/instagram.svg" : "/imgs/instagram_2.svg",
    },
  ];

  return (
    <div className={`flex items-center justify-center gap-5 mt-2 ${className}`}>
      <div className="flex gap-4 px-6 py-2 rounded-full backdrop-blur-xs bg-white/30 dark:bg-gray-800/30 shadow-lg border border-white/20">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-700/20 dark:border-white/20 bg-white/20 dark:bg-gray-700 shadow-md transform-gpu will-change-transform transition-transform duration-150 ease-in-out hover:scale-[1.05] hover:-translate-y-[2px]">
              {social.iconClass ? (
                <i
                  className={`${social.iconClass} text-gray-700 dark:text-gray-300 text-2xl`}
                />
              ) : social.imageUrl ? (
                <img
                  src={social.imageUrl}
                  alt={social.label}
                  className="w-6 h-6 object-contain"
                />
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
