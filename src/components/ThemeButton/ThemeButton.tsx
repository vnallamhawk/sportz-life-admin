import { MdLightMode } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "~/contexts/useThemeContext";
const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    // <nav className="flex h-20  items-center justify-end">
      <div
        onClick={toggleTheme}
        className=" flex h-[40px] w-[40px] items-center justify-center rounded-md border-2 "
      >
        {theme === "dark" ? (
          <BsFillMoonStarsFill size={20} />
        ) : (
          <MdLightMode size={20} />
          // <p>Light</p>
        )}
      </div>
    // </nav>
  );
};

export default ThemeButton;
