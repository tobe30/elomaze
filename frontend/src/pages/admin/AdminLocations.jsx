import { useState } from "react";
import { MapPin, Plus, Edit, Trash2, Search, Tag, Building2, Wrench } from "lucide-react";
import Switch from "../../components/Switch";

const mockLocations = [
  { id: 1, name: "Lagos", areas: 45, listings: 3245, enabled: true },
  { id: 2, name: "Abuja", areas: 28, listings: 1876, enabled: true },
  { id: 3, name: "Ibadan", areas: 18, listings: 1234, enabled: true },
  { id: 4, name: "Port Harcourt", areas: 15, listings: 987, enabled: true },
  { id: 5, name: "Kano", areas: 12, listings: 654, enabled: false },
  { id: 6, name: "Benin City", areas: 10, listings: 432, enabled: true },
];

const mockAreas = [
  { id: 1, name: "Lekki Phase 1", city: "Lagos", listings: 456, enabled: true },
  { id: 2, name: "Victoria Island", city: "Lagos", listings: 389, enabled: true },
  { id: 3, name: "Yaba", city: "Lagos", listings: 234, enabled: true },
  { id: 4, name: "Wuse 2", city: "Abuja", listings: 312, enabled: true },
  { id: 5, name: "Garki", city: "Abuja", listings: 198, enabled: true },
];

const mockCategories = [{ id: 1, name: "Services", icon: Wrench, enabled: true }];

const mockAmenities = [
  { id: 1, name: "WiFi", enabled: true },
  { id: 2, name: "Parking", enabled: true },
  { id: 3, name: "Security", enabled: true },
  { id: 4, name: "Water Supply", enabled: true },
  { id: 5, name: "Generator", enabled: true },
  { id: 6, name: "Gym", enabled: false },
];

const AdminLocations = () => {
  const [locations, setLocations] = useState(mockLocations);
  const [areas, setAreas] = useState(mockAreas);
  const [categories, setCategories] = useState(mockCategories);
  const [amenities, setAmenities] = useState(mockAmenities);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("cities");

  const [newLocationName, setNewLocationName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newAmenityName, setNewAmenityName] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const toggleLocation = (id) => setLocations(
    locations.map((loc) => (loc.id === id ? { ...loc, enabled: !loc.enabled } : loc))
  );
  const toggleArea = (id) => setAreas(
    areas.map((area) => (area.id === id ? { ...area, enabled: !area.enabled } : area))
  );
  const toggleCategory = (id) => setCategories(
    categories.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
  );
  const toggleAmenity = (id) => setAmenities(
    amenities.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
  );

  const handleAdd = () => {
    if (modalType === "city" && newLocationName.trim()) {
      setLocations([
        ...locations,
        { id: locations.length + 1, name: newLocationName.trim(), areas: 0, listings: 0, enabled: true },
      ]);
      setNewLocationName("");
    }
    if (modalType === "category" && newCategoryName.trim()) {
      setCategories([...categories, { id: categories.length + 1, name: newCategoryName.trim(), icon: Tag, enabled: true }]);
      setNewCategoryName("");
    }
    if (modalType === "amenity" && newAmenityName.trim()) {
      setAmenities([...amenities, { id: amenities.length + 1, name: newAmenityName.trim(), enabled: true }]);
      setNewAmenityName("");
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Locations & Categories</h1>
          <p className="text-sm text-gray-500">Manage cities, areas, and listing categories.</p>
        </div>
      </div>

      {/* Tabs */}
<div className="flex gap-2 bg-gray-100 p-1 rounded-full w-fit">
  {[
    { name: "cities", icon: <MapPin className="h-4 w-4" /> },
    { name: "areas", icon: <MapPin className="h-4 w-4" /> },
    { name: "categories", icon: <Tag className="h-4 w-4" /> },
    { name: "amenities", icon: <Building2 className="h-4 w-4" /> },
  ].map((tab) => (
    <button
      key={tab.name}
      onClick={() => setActiveTab(tab.name)}
      className={`px-4 py-1.5 text-sm rounded-full font-semibold flex items-center gap-2 transition ${
        activeTab === tab.name
          ? "bg-white shadow text-gray-900"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {tab.icon} {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
    </button>
  ))}
</div>


      {/* Tab Content */}
      <div className="space-y-4 mt-4">
        {/* Cities Tab */}
        {activeTab === "cities" && (
          <>
            <div className="flex items-center justify-between">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-bordered pl-9 w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <button
                className="btn text-white bg-primary gap-2 hover:bg-primary"
                onClick={() => {
                  setModalType("city");
                  setModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4" /> Add City
              </button>
            </div>

            <div className="space-y-4">
              {locations
                .filter((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((loc) => (
                  <div key={loc.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{loc.name}</p>
                          {!loc.enabled && <span className="badge bg-red-500 text-white">Disabled</span>}
                        </div>
                        <p className="text-sm text-gray-500">{loc.areas} areas • {loc.listings.toLocaleString()} listings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-gray-500">
                        {loc.enabled ? "Enabled" : "Disabled"}
                         <Switch
                            checked={loc.enabled}
                            onChange={() => toggleLocation(loc.id)}
  />
                      </label>
                     <button className="btn btn-ghost btn-sm">
  <Edit className="h-4 w-4" />
</button>
<button className="btn btn-ghost btn-sm">
  <Trash2 className="h-4 w-4 text-red-500" />
</button>

                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* Areas Tab */}
        {activeTab === "areas" && (
          <div className="space-y-4">
            {areas.map((area) => (
              <div key={area.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{area.name}</p>
                    {!area.enabled && <span className="badge bg-red-500 text-white">Disabled</span>}
                  </div>
                  <p className="text-sm text-gray-500">{area.city} • {area.listings} listings</p>
                </div>
                <div className="flex items-center gap-4">
                  <Switch
                  checked={area.enabled}
                    onChange={() =>toggleArea(area.id)}
  />
                               <button className="btn btn-ghost btn-sm">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="btn btn-ghost btn-sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Manage listing categories</p>
              <button className="btn text-white bg-primary gap-2" onClick={() => { setModalType("category"); setModalOpen(true); }}>
                <Plus className="h-4 w-4" /> Add Category
              </button>
            </div>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <cat.icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-medium">{cat.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <Switch
                  checked={cat.enabled}
                    onChange={() => toggleCategory(cat.id)}
  />  <button className="btn btn-ghost btn-sm">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="btn btn-ghost btn-sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Amenities Tab */}
        {activeTab === "amenities" && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Manage property amenities</p>
              <button className="btn text-white bg-primary gap-2" onClick={() => { setModalType("amenity"); setModalOpen(true); }}>
                <Plus className="h-4 w-4" /> Add Amenity
              </button>
            </div>
            <div className="space-y-4">
              {amenities.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{a.name}</p>
                      {!a.enabled && <span className="badge bg-red-500 text-white">Disabled</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={a.enabled}
                    onChange={() => toggleAmenity(a.id)}
  />
                      <button className="btn btn-ghost btn-sm">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="btn btn-ghost btn-sm">
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
   {modalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      
      {/* Close icon */}
      <button
        onClick={() => setModalOpen(false)}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">
        Add New {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
      </h2>

      {/* Subtitle */}
      <p className="mt-1 text-sm text-gray-500">
        Add a new {modalType} to enable listings in that location.
      </p>

      {/* Input */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {modalType === "city"
            ? "City Name"
            : modalType === "category"
            ? "Category Name"
            : "Amenity Name"}
        </label>

        <input
          type="text"
          placeholder={
            modalType === "city"
              ? "e.g., Enugu"
              : modalType === "category"
              ? "e.g., Furniture"
              : "e.g., Swimming Pool"
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          value={
            modalType === "city"
              ? newLocationName
              : modalType === "category"
              ? newCategoryName
              : newAmenityName
          }
          onChange={(e) =>
            modalType === "city"
              ? setNewLocationName(e.target.value)
              : modalType === "category"
              ? setNewCategoryName(e.target.value)
              : setNewAmenityName(e.target.value)
          }
        />
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => setModalOpen(false)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Add {modalType === "city" ? "City" : "Item"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminLocations;
