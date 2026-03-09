import { useState } from "react";
import SettingsLayout from "../../components/SettingsLayout";
import Switch from "../../components/Switch";

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    communityPosts: true,
    messages: true,
    servicesListings: true,
    emailUpdates: false,
  });

  const toggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SettingsLayout
      title="Notifications"
      description="Choose what notifications you want to receive"
    >
      <div className="divide-y divide-gray-200">

        {/* Community Posts */}
        <div className="flex items-center justify-between py-5">
          <div className="max-w-sm">
            <p className="text-sm font-medium text-gray-900">
              Community Posts Updates
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Get notified about replies and upvotes on your posts
            </p>
          </div>

          <Switch
            checked={notifications.communityPosts}
            onChange={() => toggle("communityPosts")}
          />
        </div>

        {/* Messages */}
        <div className="flex items-center justify-between py-5">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Messages & Chats
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Receive notifications for new messages
            </p>
          </div>

          <Switch
            checked={notifications.messages}
            onChange={() => toggle("messages")}
          />
        </div>

        {/* Services & Listings */}
        <div className="flex items-center justify-between py-5">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Services & Listings Updates
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Get notified about booking requests and listing views
            </p>
          </div>

          <Switch
            checked={notifications.servicesListings}
            onChange={() => toggle("servicesListings")}
          />
        </div>

        {/* Email Digests */}
        <div className="flex items-center justify-between py-5">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Email Digests
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Receive weekly email summaries of your activity
            </p>
          </div>

          <Switch
            checked={notifications.emailUpdates}
            onChange={() => toggle("emailUpdates")}
          />
        </div>

      </div>
    </SettingsLayout>
  );
};

export default Notifications;
