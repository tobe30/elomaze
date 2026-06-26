import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import PropertyListing from './pages/property/PropertyListing'
import PropertyDetail from './pages/property/PropertyDetail'
import Roomates from './pages/roomates/Roomates'
import RoommateDetail from './pages/roomates/RoommateDetail'
import Services from './pages/Services/Services'
import ServiceDetail from './pages/Services/ServiceDetail'
import Layout from './components/Layouts'
import Community from './pages/community/Community'
import Profile from './pages/profiles/Profile'
import MyProfile from './pages/profiles/MyProfile'
import PersonalInfo from './pages/settings/PersonalInfo'
import Verification from './pages/settings/Verification'
import Security from './pages/settings/Security'
import Notifications from './pages/settings/Notifications'
import ListProperty from './pages/property/ListProperty'
import ListService from './pages/Services/ListService'
import ListRoommate from './pages/roomates/ListRoommate'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import About from './pages/home/About'
import HelpSupport from './pages/home/HelpSupport'
import Privacy from './pages/home/Privacy'
import Terms from './pages/home/Terms'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import Agents from './pages/admin/Agents'
import Listings from './pages/admin/Listings'
import AdminServices from './pages/admin/AdminServices'
import AdminRoommates from './pages/admin/AdminRoommates'
import AdminReports from './pages/admin/AdminReports'
import AdminPayments from './pages/admin/AdminPayments'
import AdminLocations from './pages/admin/AdminLocations'
import AdminCommunity from './pages/admin/AdminCommunity'
import AdminSettings from './pages/admin/AdminSettings'
import AdminRoles from './pages/admin/AdminRoles'
import Messages from './pages/home/Messages'
import LayoutNoFooter from './components/LayoutNoFooter'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import GoogleSuccess from './pages/auth/GoogleSuccess'
import { getAuthUser, logout } from './lib/api'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });

  const authUser = data?.user || data;


  console.log("authUser:", authUser);

  if (isLoading) return null;

  return (
    <div>
     <Routes>
  {/* PUBLIC AUTH ROUTES */}
  <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/profile" />} />
  <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/profile" />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/google-success" element={<GoogleSuccess />} />

  {/* PUBLIC BROWSING ROUTES (NO AUTH NEEDED) */}
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about-us" element={<About />} />
    <Route path="/help" element={<HelpSupport />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/listings" element={<PropertyListing />} />
    <Route path="/listing/:id" element={<PropertyDetail />} />
    <Route path="/roomates/" element={<Roomates />} />
    <Route path="/roommates/:id" element={<RoommateDetail />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/:id" element={<ServiceDetail />} />
    <Route path="/community/" element={<Community />} />
    <Route path="/agents/:id" element={<Profile />} />

    {/* PROTECTED USER ROUTES */}
    <Route element={<ProtectedRoute authUser={authUser} isLoading={isLoading} />}>
      <Route path="/profile"  element={<MyProfile />} />
      <Route path="/settings" element={<PersonalInfo />} />
      <Route path="/settings/verification" element={<Verification />} />
      <Route path="/settings/security" element={<Security />} />
      <Route path="/settings/notifications" element={<Notifications />} />
    </Route>
  </Route>

  {/* PROTECTED - NO FOOTER */}
  <Route element={<LayoutNoFooter />}>
    <Route element={<ProtectedRoute authUser={authUser} isLoading={isLoading} />}>
      <Route path="/messages" element={<Messages />} />
    </Route>
  </Route>

  {/* PROTECTED - CREATE/LIST ROUTES (AGENTS ONLY) */}
  <Route element={<ProtectedRoute authUser={authUser} isLoading={isLoading} requiredRole={["agent"]} />}>
    <Route path="/list/property" element={<ListProperty />} />
    <Route path="/list/service" element={<ListService />} />
    <Route path="/list/roommate" element={<ListRoommate />} />
  </Route>

  {/* ADMIN ROUTES - PROTECTED */}
  <Route element={<ProtectedRoute authUser={authUser} isLoading={isLoading} requiredRole={["admin"]} />}>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path='users' element={<Users />} />
      <Route path='agents' element={<Agents />} />
      <Route path='listings' element={<Listings />} />
      <Route path='services' element={<AdminServices />} />
      <Route path='roommates' element={<AdminRoommates />} />
      <Route path='reports' element={<AdminReports />} />
      <Route path='payments' element={<AdminPayments />} />
      <Route path='locations' element={<AdminLocations />} />
      <Route path='community' element={<AdminCommunity />} />
      <Route path='settings' element={<AdminSettings />} />
      <Route path='roles' element={<AdminRoles />} />
    </Route>
  </Route>
</Routes>
    <Toaster/>

    </div>
  )
}

export default App