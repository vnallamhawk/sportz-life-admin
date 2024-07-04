import { MdLightMode } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "~/contexts/useThemeContext";
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="flex h-20  items-center justify-end">
      <div
        onClick={toggleTheme}
        className="flex h-[40px] w-[40px] items-center justify-center rounded-md border-2 border-darkmode dark:border-white"
      >
        {theme === "dark" ? (
          <BsFillMoonStarsFill size={20} />
        ) : (
          <MdLightMode size={20} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
