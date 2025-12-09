import { Settings } from "@/app/generated/prisma/browser";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = ({ settings }: { settings: Settings | null }) => {
  return (
    <footer className="bg-gradient-to-t from-base-300 to-base-200 py-12 text-center border-t border-base-300">
      <div className="max-w-[1280px] mx-auto px-6">
        <p className="text-2xl font-bold mb-2">
          {settings ? settings.name : "John Christian Rosuelo"}
        </p>
        <p className="text-sm text-base-content/70 mb-8">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href={
              settings ? `mailto:${settings.email}` : "mailto:example@mail.com"
            }
            className="btn btn-circle btn-lg btn-ghost hover:btn-primary hover:scale-110 transition-all shadow-lg"
            aria-label="Email"
          >
            <MdEmail className="text-3xl" />
          </Link>
          <Link
            href={
              settings ? settings.github : "https://github.com/AetherKnowledge"
            }
            className="btn btn-circle btn-lg btn-ghost hover:btn-primary hover:scale-110 transition-all shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="text-3xl" />
          </Link>
          {settings && settings.linkedin && (
            <Link
              href={settings.linkedin}
              className="btn btn-circle btn-lg btn-ghost hover:btn-primary hover:scale-110 transition-all shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-3xl" />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
