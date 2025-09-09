import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-base-300 py-6 text-center">
      <p className="font-bold">John Christian Rosuelo</p>
      <p className="text-sm">All rights reserved for John Christian Rosuelo.</p>
      <div className="flex justify-center gap-6 mt-4">
        <Link href="mailto:example@mail.com" className="hover:text-primary">
          <MdEmail className="text-4xl rounded-full" />
        </Link>
        <Link
          href="https://github.com/AetherKnowledge"
          className="hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-4xl rounded-full" />
        </Link>
        <Link
          href="https://linkedin.com"
          className="hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-4xl rounded-full" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
