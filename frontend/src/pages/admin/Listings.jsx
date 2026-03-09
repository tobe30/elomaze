import { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  MoreHorizontal,
  Building2,
  Package,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";
import { createPortal } from "react-dom";

const mockListings = [
  {
    id: 1,
    title: "3 Bedroom Flat - Lekki Phase 1",
    type: "property",
    price: "₦2.5M/year",
    location: "Lekki, Lagos",
    rating: 4.7,
    reviews: 42,
    status: "pending",
    owner: "Adebayo Johnson",
    submitted: "2 hours ago",
    image: "/b-11.jpg",
  },
  {
    id: 2,
    title: "Self-Contain Studio Apartment",
    type: "property",
    price: "₦800K/year",
    location: "Yaba, Lagos",
    rating: 4.7,
    reviews: 42,
    status: "approved",
    owner: "Chioma Okafor",
    submitted: "1 day ago",
    image: "/IMG_5146.jpg",
  },
  {
    id: 3,
    title: "MacBook Pro 2023 Like New",
    type: "property",
    price: "₦1.2M",
    location: "Ibadan, Oyo",
    rating: 4.7,
    reviews: 42,
    status: "pending",
    owner: "Emeka Store",
    submitted: "3 hours ago",
    image: "/b-11.jpg",
  },
  {
    id: 4,
    title: "2 Bedroom Apartment - Wuse 2",
    type: "property",
    price: "₦3M/year",
    location: "Wuse, Abuja",
    rating: 4.7,
    reviews: 42,
    status: "rejected",
    owner: "Ibrahim Musa",
    submitted: "2 days ago",
    image: "/b-11.jpg",
    rejectionReason: "Images are low quality and misleading",
  },
];

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedListing, setSelectedListing] = useState(null);
  const [rejectDialog, setRejectDialog] = useState({ open: false, listing: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, listing: null });
  const [rejectionReason, setRejectionReason] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null); // ✅ Track which dropdown is open

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <span className="badge badge-success text-white text-xs capitalize">{status}</span>;
      case "pending":
        return <span className="badge bg-yellow-500 text-white border-none text-xs capitalize">{status}</span>;
      case "rejected":
        return <span className="badge badge-error text-white text-xs capitalize">{status}</span>;
      default:
        return <span className="badge text-xs">{status}</span>;
    }
  };

  const filterByStatus = (status) => {
    return mockListings.filter((listing) => {
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = status === "all" || listing.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  const pendingCount = mockListings.filter(
  (listing) => listing.status === "pending"
).length;


  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Listings</h1>
          <p className="text-sm text-gray-500">
            Moderate property and product listings on the platform.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">8,456</span>
          </div>
          <p className="text-xs text-gray-500">Total Listings</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-600">26</span>
          </div>
          <p className="text-xs text-gray-500">Pending Review</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">8,412</span>
          </div>
          <p className="text-xs text-gray-500">Approved</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-500">18</span>
          </div>
          <p className="text-xs text-gray-500">Rejected This Week</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search listings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full pl-9 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* Tabs */}
      <div className="space-y-4">
       <div className="flex gap-2 bg-gray-100 p-1 rounded-full w-fit">
  {["pending", "approved", "rejected", "all"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-1.5 text-sm rounded-full font-semibold flex items-center gap-2 transition ${
        activeTab === tab
          ? "bg-white shadow text-gray-900"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}

      {tab === "pending" && pendingCount > 0 && (
        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
          {pendingCount}
        </span>
      )}
    </button>
  ))}
</div>


        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filterByStatus(activeTab).map((listing) => (
            <div key={listing.id} className="bg-white shadow rounded-lg  relative">
              <div className="relative aspect-video">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 left-2">
                  <span className="badge border-none text-white bg-blue-500 text-[10px] capitalize flex items-center gap-1">
                    {listing.type === "property" ? (
                      <Building2 className="h-3 w-3" />
                    ) : (
                      <Package className="h-3 w-3" />
                    )}
                    {listing.type}
                  </span>
                </div>
                <div className="absolute top-2 right-2">{getStatusBadge(listing.status)}</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-1">{listing.title}</h3>
                <p className="text-primary font-bold mt-1">{listing.price}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <MapPin className="h-3 w-3" />
                  {listing.location}
                </div>
                 <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {listing.rating} ({listing.reviews} reviews)
                    </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="text-xs text-gray-500">
                    <p>by {listing.owner}</p>
                    <p className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {listing.submitted}
                    </p>
                  </div>

                  {/* DROPDOWN */}
                  <div className="relative">
                    <button
                      className="btn btn-ghost btn-sm rounded-full p-2"
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === listing.id ? null : listing.id)
                      }
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {openDropdownId === listing.id && (
                      <ul className="absolute right-0 bottom-full mb-2 w-44 bg-white border rounded-lg shadow-lg z-50 p-2 menu">
                        <li onClick={() => setSelectedListing(listing)}>
                          <a className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Preview
                          </a>
                        </li>
                        {listing.status === "pending" && (
                          <>
                            <li className="text-emerald-600">
                              <a className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Approve
                              </a>
                            </li>
                            <li
                              className="text-red-500"
                              onClick={() => setRejectDialog({ open: true, listing })}
                            >
                              <a className="flex items-center gap-2">
                                <XCircle className="h-4 w-4" />
                                Reject
                              </a>
                            </li>
                          </>
                        )}
                        {(listing.status === "approved" || listing.status === "rejected") && (
                          <li
                            className="text-red-500"
                            onClick={() => setDeleteDialog({ open: true, listing })}
                          >
                            <a className="flex items-center gap-2">
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </a>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>

                {listing.rejectionReason && (
                  <div className="mt-3 p-2 rounded bg-red-100 text-red-600 text-xs">
                    Reason: {listing.rejectionReason}
                  </div>
                )}
              </div>
            </div>
          ))}

          {filterByStatus(activeTab).length === 0 && (
            <div className="bg-white shadow rounded-lg p-12 text-center text-gray-400 col-span-full">
              <Building2 className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-2 text-sm">No listings found</p>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
    {selectedListing &&
  createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg 
                      max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b">
          <h2 className="text-base sm:text-lg font-semibold">
            Listing Preview
          </h2>
          <button
            onClick={() => setSelectedListing(null)}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {/* Image */}
          <div className="w-full rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={selectedListing.image}
              alt={selectedListing.title}
              className="w-full h-44 sm:h-56 object-cover"
            />
          </div>

          {/* Title + Status */}
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-sm sm:text-base">
              {selectedListing.title}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium 
                             bg-yellow-500 text-white capitalize">
              {selectedListing.status}
            </span>
          </div>

          {/* Price */}
          <p className="text-lg sm:text-xl font-bold text-primary">
            {selectedListing.price}
          </p>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm">
            <div>
              <p className="text-gray-400">Location</p>
              <p className="font-medium">{selectedListing.location}</p>
            </div>
            <div>
              <p className="text-gray-400">Type</p>
              <p className="font-medium capitalize">{selectedListing.type}</p>
            </div>
            <div>
              <p className="text-gray-400">Owner</p>
              <p className="font-medium">{selectedListing.owner}</p>
            </div>
            <div>
              <p className="text-gray-400">Ratings & reviews</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {selectedListing.rating} ({selectedListing.reviews} reviews)
              </div>
            </div>
            <div>
              <p className="text-gray-400">Submitted</p>
              <p className="font-medium">{selectedListing.submitted}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 px-4 sm:px-6 py-3 border-t">
    

          {selectedListing.status === "pending" && (
            <>
              <button
                onClick={() => {
                  setRejectDialog({ open: true, listing: selectedListing });
                  setSelectedListing(null);
                }}
                className="btn btn-error text-white w-full sm:w-auto"
              >
                Reject
              </button>
              <button className="btn btn-success text-white w-full sm:w-auto">
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}




      {rejectDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold">Reject Listing</h3>
            <p className="text-gray-500">
              Provide a reason for rejecting "{rejectDialog.listing?.title}"
            </p>
            <textarea
              className="textarea textarea-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Images are misleading or low quality..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-outline"
                onClick={() => setRejectDialog({ open: false, listing: null })}
              >
                Cancel
              </button>
              <button
                className="btn bg-red-500 text-white"
                onClick={() => {
                  setRejectDialog({ open: false, listing: null });
                  setRejectionReason("");
                }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold">Remove Listing</h3>
            <p className="text-gray-500">
              Are you sure you want to permanently remove "{deleteDialog.listing?.title}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-outline"
                onClick={() => setDeleteDialog({ open: false, listing: null })}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => setDeleteDialog({ open: false, listing: null })}
              >
                Remove Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listings;
