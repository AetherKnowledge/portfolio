"use client";

import { useEffect, useState } from "react";
import ThemeController from "../ThemeController";
import NavbarItemCenter from "./NavbarItemCenter";
import NavbarItemSidebar from "./NavbarItemSidebar";

const Navbar = () => {
  const navbarItems = [
    { section: "home", label: "Home" },
    { section: "about", label: "About" },
    { section: "projects", label: "Projects" },
    { section: "contact", label: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // store visibility ratio for each section
    const visibilityMap: Record<string, number> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap[entry.target.id] = entry.intersectionRatio;
        });

        // find section with highest visibility ratio
        let maxSection = navbarItems[0].section;
        let maxRatio = 0;

        navbarItems.forEach((item, index) => {
          const ratio = visibilityMap[item.section] ?? 0;
          const currentMaxIndex = navbarItems.findIndex(
            (i) => i.section === maxSection
          );

          if (
            ratio > maxRatio ||
            (ratio === maxRatio && index < currentMaxIndex) // prefer earlier section if tie
          ) {
            maxRatio = ratio;
            maxSection = item.section;
          }
        });

        setActiveSection(maxSection);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.25, 0.5, 1], // fewer thresholds = less callback spam
      }
    );

    navbarItems.forEach((item) => {
      const el = document.getElementById(item.section);
      if (el) observer.observe(el);
    });

    return () => {
      navbarItems.forEach((item) => {
        const el = document.getElementById(item.section);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="navbar bg-base-100 text-base-content shadow-sm z-100 sticky top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navbarItems.map((item) => (
              <li key={item.section}>
                <NavbarItemSidebar section={item.section} label={item.label} />
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">John Christian Rosuelo</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {navbarItems.map((item) => (
            <li key={item.section}>
              <NavbarItemCenter
                section={item.section}
                label={item.label}
                isActive={activeSection === item.section}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeController />
      </div>
    </div>
  );
};

export default Navbar;
