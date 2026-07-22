import { useState } from "react";
import Button from "../Button";

function DeleteAccount() {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      // TODO: Replace this with your API call
      // await deleteAccount();

      alert("Account deletion is not implemented yet.");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Permanently delete your account and all associated data.
        </p>
      </div>

      <Button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </Button>
    </div>
  );
}

export default DeleteAccount;