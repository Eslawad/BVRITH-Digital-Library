import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GoalCreation from './pages/GoalCreation';
import GoalApproval from './pages/GoalApproval';
import Analytics from './pages/Analytics';

function PrivateRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && profile && !roles.includes(profile.role)) return <Navigate to="/" />;

  return <>{children}</>;
}

function RoleHome() {
  const { profile } = useAuth();
  if (!profile) return null;
  
  switch (profile.role) {
    case 'admin': return <Navigate to="/admin" />;
    case 'manager': return <Navigate to="/manager" />;
    default: return <Navigate to="/employee" />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<RoleHome />} />
            
            {/* Employee Routes */}
            <Route path="employee" element={<PrivateRoute roles={['employee', 'manager', 'admin']}><EmployeeDashboard /></PrivateRoute>} />
            <Route path="goals/new" element={<PrivateRoute roles={['employee', 'manager', 'admin']}><GoalCreation /></PrivateRoute>} />
            
            {/* Manager Routes */}
            <Route path="manager" element={<PrivateRoute roles={['manager', 'admin']}><ManagerDashboard /></PrivateRoute>} />
            <Route path="manager/approvals" element={<PrivateRoute roles={['manager', 'admin']}><GoalApproval /></PrivateRoute>} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
            
            {/* Analytics */}
            <Route path="analytics" element={<PrivateRoute roles={['admin', 'manager']}><Analytics /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
