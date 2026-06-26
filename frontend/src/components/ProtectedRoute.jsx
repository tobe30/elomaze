import { Navigate, Outlet } from "react-router-dom";

const AccessDenied = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-4">You don't have permission to access this page</p>
      <a href="/" className="btn btn-primary">Go Home</a>
    </div>
  </div>
);

const ProtectedRoute = ({ authUser, isLoading, requiredRole = [] }) => {
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3 bg-base-100">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-base-300"></div>
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin absolute top-0 left-0"></div>
        </div>

        <p className="text-sm text-base-content/60 animate-pulse">
          Loading your experience...
        </p>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole.length > 0 && !requiredRole.includes(authUser.role)) {
    return <AccessDenied />;
  }

  return <Outlet />;
};

export default ProtectedRoute;