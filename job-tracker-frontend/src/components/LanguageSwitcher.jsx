import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select
      value={i18n.resolvedLanguage || "en"}
      onChange={handleLanguageChange}
      className="px-3 py-2 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="en">🇺🇸 English</option>
      <option value="ta">🇮🇳 தமிழ்</option>
      <option value="te">🇮🇳 తెలుగు</option>
    </select>
  );
}