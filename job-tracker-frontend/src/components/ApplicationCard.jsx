import PropTypes from "prop-types";

import Button from "./Button";
import Card from "./Card";
import StatusBadge from "./StatusBadge";

function ApplicationCard({
  company,
  position,
  location,
  status,
  appliedDate,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {position}
            </h2>

            <p className="mt-1 text-lg font-medium text-gray-700">
              {company}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              📍 {location}
            </p>

            {appliedDate && (
              <p className="mt-1 text-sm text-gray-500">
                Applied: {appliedDate}
              </p>
            )}
          </div>

          <StatusBadge status={status} />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={onEdit}
          >
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

ApplicationCard.propTypes = {
  company: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  appliedDate: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

ApplicationCard.defaultProps = {
  appliedDate: "",
  onEdit: () => {},
  onDelete: () => {},
};

export default ApplicationCard;