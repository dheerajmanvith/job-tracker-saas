export default function LoadMoreButton({ onClick, loading }) {
  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}