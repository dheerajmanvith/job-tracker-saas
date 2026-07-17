import { Input } from "@/components/ui/input";

function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Search by company or role..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;