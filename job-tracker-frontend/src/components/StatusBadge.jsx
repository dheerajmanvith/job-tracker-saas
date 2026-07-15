import PropTypes from "prop-types";
import Badge from "./Badge";

function StatusBadge({
  status,
  size = "md",
  className = "",
}) {
  const statusConfig = {
    Applied: {
      color: "blue",
      label: "Applied",
    },
    "Phone Screen": {
      color: "yellow",
      label: "Phone Screen",
    },
    Interview: {
      color: "yellow",
      label: "Interview",
    },
    Offer: {
      color: "green",
      label: "Offer",
    },
    Rejected: {
      color: "red",
      label: "Rejected",
    },
    Archived: {
      color: "gray",
      label: "Archived",
    },
  };

  const currentStatus = statusConfig[status] || {
    color: "gray",
    label: status,
  };

  return (
    <Badge
      color={currentStatus.color}
      size={size}
      className={className}
    >
      {currentStatus.label}
    </Badge>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
  ]),
  className: PropTypes.string,
};

export default StatusBadge;