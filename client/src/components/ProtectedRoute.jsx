import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#130608] flex flex-col items-center justify-center gap-4 text-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-t-[#F87171] border-[#2B1212] rounded-full animate-spin"></div>
          <span className="text-[14px] font-[600] text-[#FECACA]/60 tracking-wider">LOADING USER PROFILE...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page but save the original destination
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
