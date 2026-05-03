import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import DashboardStats from '../components/DashboardStats';
import RecentConversations from '../components/RecentConversations';
import { getDashboardStats, getRecentConversations } from '../services/admin.api';

const AdminPage = () => {
  const [stats, setStats] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, convRes] = await Promise.all([
          getDashboardStats(),
          getRecentConversations()
        ]);
        
        if (statsRes.success) setStats(statsRes.data);
        if (convRes.success) setConversations(convRes.data);
      } catch (error) {
        console.error("Failed to load admin data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex bg-background text-on-surface overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Header */}
        <AdminHeader />

        <div className="p-8 space-y-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <span className="w-8 h-8 rounded-full border-2 border-primary-fixed border-t-transparent animate-spin"></span>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <DashboardStats stats={stats} />

              {/* Recent Conversations Table */}
              <RecentConversations conversations={conversations} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;