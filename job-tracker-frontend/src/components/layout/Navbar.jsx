import ThemeToggle from "../ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();

  return (
    <header
      className="
        h-16
        border-b
        bg-background
        flex
        items-center
        justify-between
        px-6
      "
    >
      {/* Page Title */}
      <div>
        <h2
          className="
            text-lg
            font-semibold
          "
        >
          {t("dashboard")}
        </h2>
      </div>

      {/* Actions */}
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        {/* Language Selector */}
        <LanguageSwitcher />

        {/* Dark Mode */}
        <ThemeToggle />

        {/* Profile */}
        <button
          className="
            rounded-lg
            bg-primary
            text-primary-foreground
            px-4
            py-2
            text-sm
            font-medium
            hover:opacity-90
            transition
          "
        >
          {t("profile")}
        </button>
      </div>
    </header>
  );
}

export default Navbar;