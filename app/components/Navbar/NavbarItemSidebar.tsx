type NavbarItemProps = {
  section: string;
  label: string;
};

const NavbarItemSidebar = ({ section, label }: NavbarItemProps) => {
  return (
    <a href={`#${section}`} className="btn btn-ghost rounded-2xl">
      {label}
    </a>
  );
};

export default NavbarItemSidebar;
