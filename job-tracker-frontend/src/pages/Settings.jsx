import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getProfile } from "../services/profileService";

import ProfileForm from "../components/Settings/ProfileForm";
import PasswordChange from "../components/Settings/PasswordChange";
import WebhookSettings from "../components/Settings/WebhookSettings";
import DeleteAccount from "../components/Settings/DeleteAccount";

import Card from "../components/Card";

function Settings() {
  const { t } = useTranslation();

  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Profile loading failed", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) {
    return (
      <div>
        {t("loadingProfile")}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        {t("accountSettings")}
      </h1>

      <Card>
        <ProfileForm
          profile={profile}
          setProfile={setProfile}
        />
      </Card>

      <Card>
        <PasswordChange />
      </Card>

      <Card>
        <WebhookSettings
          profile={profile}
          setProfile={setProfile}
        />
      </Card>

      <Card>
        <DeleteAccount />
      </Card>
    </div>
  );
}

export default Settings;