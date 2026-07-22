import { useState } from "react";

export default function JobSearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      query,
      location,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col gap-4 md:flex-row"
    >
      <input
        type="text"
        placeholder="Job title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}