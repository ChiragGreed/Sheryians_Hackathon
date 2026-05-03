import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../auth/store/authSlice';
import UploadContextModal from './UploadContextModal';

const AdminHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const initials = user?.username ? user.username.substring(0, 2).toUpperCase() : 'AD';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      <header className="px-8 py-6 border-b border-outline/10 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div>
          <h1 className="font-headline-md text-2xl">Dashboard</h1>
          <p className="text-sm text-on-surface-variant mt-1">Overview of your support operations</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Upload Context Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary-fixed text-on-primary px-2 py-1 rounded-lg cursor-pointer font-semibold text-[13px] hover:brightness-110 transition-all shadow-md shadow-primary-fixed/20"
          >
            <span className="material-symbols-outlined">cloud_upload</span>
            Upload Context
          </button>
          
          <div className="relative pl-4 border-l border-outline/10" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer text-left ${
                isDropdownOpen ? 'bg-surface-container shadow-inner' : 'hover:bg-surface-container'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary font-label-bold shadow-sm">
                {initials}
              </div>
              <div>
                <p className="font-body-md text-sm text-on-surface">{user?.username || 'Admin User'}</p>
                <p className="text-xs text-on-surface-variant">{user?.role || 'Owner'}</p>
              </div>
              <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-surface-container-lowest/95 backdrop-blur-xl border border-outline/20 rounded-2xl shadow-2xl py-2 z-50 transform origin-top-right transition-all">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-outline/10 mb-2">
                  <p className="text-sm font-label-bold text-on-surface">{user?.username || 'Admin User'}</p>
                  <p className="text-xs text-on-surface-variant truncate">{user?.email || 'admin@example.com'}</p>
                </div>

                
                <Link 
                  to="/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-surface-container transition-colors text-sm text-on-surface group"
                >
                  <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary-fixed transition-colors">settings</span>
                  Settings
                </Link>
                
                <div className="h-px bg-outline/10 my-2"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-error/10 text-error transition-colors text-sm font-label-bold group"
                >
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">logout</span>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Render the Modal */}
      <UploadContextModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AdminHeader;
