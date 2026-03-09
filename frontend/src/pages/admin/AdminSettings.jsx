import { useState } from "react";
import { Settings, Percent, Mail, Save, ToggleRight } from "lucide-react";
import Switch from "../../components/Switch";


const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // State for switches
  const [moderationSettings, setModerationSettings] = useState([
    { label: "Auto-approve verified agents' listings", desc: "Skip manual review for verified agents", checked: true },
    { label: "Require document verification for agents", desc: "Agents must verify identity before listing", checked: true },
    { label: "Enable spam detection", desc: "Automatically flag suspicious content", checked: true },
  ]);

  const [featureToggles, setFeatureToggles] = useState([
    { label: "Community Forum", desc: "Allow users to post questions and discussions", checked: true },
    { label: "Roommate Matching", desc: "Enable roommate finder feature", checked: true },
    { label: "Services Marketplace", desc: "Allow users to list and find services", checked: true },
    { label: "In-App Messaging", desc: "Direct messaging between users", checked: true },
    { label: "Virtual Tours", desc: "360° property viewing feature", checked: false },
    { label: "Payment Escrow", desc: "Hold payments until deal completion", checked: false },
  ]);

  const toggleModeration = (index) => {
    const newSettings = [...moderationSettings];
    newSettings[index].checked = !newSettings[index].checked;
    setModerationSettings(newSettings);
  };

  const toggleFeature = (index) => {
    const newFeatures = [...featureToggles];
    newFeatures[index].checked = !newFeatures[index].checked;
    setFeatureToggles(newFeatures);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-gray-500">
            Configure platform rules, rates, and features.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn text-white bg-primary gap-2 hover:bg-primary"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-full w-fit">
          {["general", "commission", "features", "emails"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-full font-semibold flex items-center gap-2 transition ${
                activeTab === tab
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "general" && <Settings className="h-4 w-4" />}
              {tab === "commission" && <Percent className="h-4 w-4" />}
              {tab === "features" && <ToggleRight className="h-4 w-4" />}
              {tab === "emails" && <Mail className="h-4 w-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* Platform Rules */}
            <div className="card bg-base-100 shadow">
              <div className="card-body space-y-4">
                <h2 className="text-lg font-semibold">Platform Rules</h2>
                <p className="text-sm text-gray-500">General platform configuration</p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col space-y-2">
                    <label>Platform Name</label>
                    <input className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" defaultValue="Elomaze" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>Support Email</label>
                    <input className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" defaultValue="support@elomaze.com" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>Minimum Listing Price</label>
                    <input className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" defaultValue="₦10,000" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label>Maximum Images per Listing</label>
                    <input type="number" className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" defaultValue="10" />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label>Terms of Service URL</label>
                  <input className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" defaultValue="https://elomaze.com/terms" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label>Privacy Policy URL</label>
                  <input className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" defaultValue="https://elomaze.com/privacy" />
                </div>
              </div>
            </div>

            {/* Moderation Settings */}
            <div className="card bg-base-100 shadow">
              <div className="card-body space-y-4">
                <h2 className="text-lg font-semibold">Moderation Settings</h2>
                <p className="text-sm text-gray-500">Content moderation configuration</p>

                {moderationSettings.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <Switch checked={item.checked} onChange={() => toggleModeration(i)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Commission Tab */}
        {activeTab === "commission" && (
          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              <h2 className="text-lg font-semibold">Commission Rates</h2>
              <p className="text-sm text-gray-500">Configure platform fees and commissions</p>

              <div className="grid gap-4 md:grid-cols-2">
                {[ 
                  { label: "Agent Subscription (Basic)", value: "5000", suffix: "₦/month" },
                  { label: "Agent Subscription (Pro)", value: "15000", suffix: "₦/month" },
                  { label: "Seller Subscription", value: "10000", suffix: "₦/month" },
                  { label: "Featured Listing (7 days)", value: "2000", suffix: "₦" },
                  { label: "Featured Listing (30 days)", value: "5000", suffix: "₦" },
                  { label: "Transaction Fee", value: "2.5", suffix: "%" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col space-y-2">
                    <label>{item.label}</label>
                    <div className="flex gap-2">
                      <input className="input input-bordered flex-1 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" defaultValue={item.value} />
                      <span className="flex items-center text-sm text-gray-500">{item.suffix}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              <h2 className="text-lg font-semibold">Feature Toggles</h2>
              <p className="text-sm text-gray-500">Enable or disable platform features</p>

              {featureToggles.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <Switch checked={item.checked} onChange={() => toggleFeature(i)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emails Tab */}
        {activeTab === "emails" && (
          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              <h2 className="text-lg font-semibold">Email Templates</h2>
              <p className="text-sm text-gray-500">Customize automated email messages</p>

              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                  <label>Select Template</label>
                  <select className="select select-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none">
                    <option value="welcome">Welcome Email</option>
                    <option value="verification">Verification Approved</option>
                    <option value="rejection">Verification Rejected</option>
                    <option value="listing-approved">Listing Approved</option>
                    <option value="listing-rejected">Listing Rejected</option>
                    <option value="password-reset">Password Reset</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label>Subject Line</label>
                  <input className="input input-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" defaultValue="Welcome to Elomaze! 🏠" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label>Email Body</label>
                  <textarea
                    rows={10}
                    className="textarea textarea-bordered focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    defaultValue={`Hi {{user_name}},\n\nWelcome to Elomaze! We're excited to have you join our community.\n\nElomaze is your go-to platform for finding:\n• Perfect housing in your area\n• Trusted local services\n• Community insights and tips\n\nGet started by:\n1. Completing your profile\n2. Browsing available listings\n3. Connecting with verified agents\n\nIf you have any questions, our support team is here to help.\n\nBest regards,\nThe Elomaze Team`}
                  />
                </div>

                <p className="text-xs text-gray-500">
                  Available variables: {"{{user_name}}"}, {"{{user_email}}"}, {"{{listing_title}}"}, {"{{agent_name}}"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
