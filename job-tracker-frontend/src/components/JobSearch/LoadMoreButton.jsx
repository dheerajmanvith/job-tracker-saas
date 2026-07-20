import PropTypes from "prop-types";

function LoadMoreButton({ onClick, loading }) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-black disabled:opacity-50"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

LoadMoreButton.defaultProps = {
  loading: false,
};

export default LoadMoreButton;