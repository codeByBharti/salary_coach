import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded routes
const Result = lazy(() => import('./pages/Result'));
const History = lazy(() => import('./pages/History'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Simple Suspense Fallback
const PageSkeleton = () => (
  <div className="min-h-screen bg-[#130608] pt-32 px-4 flex justify-center">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="h-12 w-12 border-4 border-t-[#F87171] border-[#2B1212] rounded-full animate-spin"></div>
      <div className="h-4 w-32 bg-[#2B1212] rounded-full"></div>
    </div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#130608]">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          success: { style: { borderLeft: '4px solid #F87171' } },
          error: { style: { borderLeft: '4px solid #FB923C' } },
          style: {
            padding: '16px',
            color: '#ffffff',
            background: '#1F0E0E',
            border: '1px solid rgba(248, 113, 113, 0.2)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
            borderRadius: '12px'
          }
        }}
      />
      
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageSkeleton />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/result/:id" element={<ProtectedRoute><Result /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}

export default App;
