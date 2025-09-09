"use client";

import { motion } from "motion/react";

type NavbarItemProps = {
  section: string;
  label: string;
  isActive: boolean;
};

const NavbarItemCenter = ({ section, label, isActive }: NavbarItemProps) => {
  const handleClick = () => {
    const el = document.getElementById(section);
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="btn btn-ghost inline-flex flex-col items-center text-shadow-br rounded-2xl"
      whileHover={isActive ? {} : { scale: 1.05 }}
      whileTap={isActive ? {} : { scale: 0.95 }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      onClick={handleClick}
    >
      <div className="relative">
        <p className="text-base-content text-md">{label}</p>
        {isActive && (
          <motion.div
            layoutId="navbar-underline"
            className="absolute left-0 right-0 -bottom-2 h-[5px] bg-base-content rounded-full shadow-br"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default NavbarItemCenter;
