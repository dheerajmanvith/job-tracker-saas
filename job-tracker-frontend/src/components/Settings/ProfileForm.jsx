import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";

function ProfileForm({ profile, setProfile }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    timezone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        email: profile.email || "",
        timezone: profile.timezone || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // TODO: Replace with your API call
      // const updated = await updateProfile(formData);

      setProfile({
        ...profile,
        ...formData,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Profile Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          name="timezone"
          placeholder="Timezone"
          value={formData.timezone}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}

export default ProfileForm;