import React from "react";

import Header from "../components/common_components/Header";
import Profile from "../components/settings/Profile";
import Notification from "../components/settings/Notification";
import Security from "../components/settings/Security";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";

const SettingsPage = () => {
  return (
    // THAY ĐỔI: bg-gray-50, text-gray-900
    <div className="flex-1 overflow-auto relative z-10 bg-gray-50 text-gray-900">
      <Header title="Cài đặt" />

      <main className="max-w-4xl mx-auto py-8 px-4 lg:px-8">
        <Profile />
        <Notification />
        <Security />
        <ConnectedAccounts />
        <DangerZone />
      </main>
    </div>
  );
};

export default SettingsPage;