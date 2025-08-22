import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useAuth } from '@/context/AuthContext';

export const useLogout = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { logout: authLogout } = useAuth();

  const logout = async () => {
    try {
      // Call backend logout endpoint to invalidate session
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).catch(err => console.warn('Backend logout failed:', err));
      }
      
      // Sign out from Clerk if user is signed in
      if (signOut) {
        await signOut();
      }
      
      // Clear auth context (this will handle token/user cleanup)
      if (authLogout) {
        authLogout();
      } else {
        // Fallback: clear localStorage if auth context not available
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      
      // Redirect to landing page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear everything and redirect
      if (authLogout) {
        authLogout();
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      navigate('/', { replace: true });
    }
  };

  return { logout };
};
