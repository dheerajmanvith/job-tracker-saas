import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";

function WebhookSettings({ profile, setProfile }) {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile?.webhook_url) {
      setWebhookUrl(profile.webhook_url);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // TODO: Replace with your API call
      // await updateWebhook({ webhook_url: webhookUrl });

      setProfile({
        ...profile,
        webhook_url: webhookUrl,
      });

      alert("Webhook updated successfully!");
    } catch (error) {
      console.error("Webhook update failed:", error);
      alert("Failed to update webhook.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Webhook Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="url"
          placeholder="https://example.com/webhook"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Webhook"}
        </Button>
      </form>
    </div>
  );
}

export default WebhookSettings;