import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('organisation');

  return (
    <div className="w-full h-screen flex bg-background text-on-surface overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="px-8 py-6 border-b border-outline/10 bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="font-headline-md text-2xl">Settings</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage your organisation, plans, and team</p>
        </header>

        <div className="p-8 max-w-5xl mx-auto w-full">
          {/* Tabs */}
          <div className="flex border-b border-outline/10 mb-8 space-x-6">
            <button
              onClick={() => setActiveTab('organisation')}
              className={`pb-3 text-sm font-label-bold transition-all relative ${
                activeTab === 'organisation' ? 'text-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Organisation Details
              {activeTab === 'organisation' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-fixed rounded-t-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`pb-3 text-sm font-label-bold transition-all relative ${
                activeTab === 'plan' ? 'text-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Plan Details
              {activeTab === 'plan' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-fixed rounded-t-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 text-sm font-label-bold transition-all relative ${
                activeTab === 'users' ? 'text-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Manage Users
              {activeTab === 'users' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-fixed rounded-t-full"></span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-surface-container-lowest border border-outline/10 rounded-2xl p-6 shadow-sm">
            {/* Organisation Tab */}
            {activeTab === 'organisation' && (
              <div className="space-y-6">
                <h2 className="font-headline-md text-lg">Organisation Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-label-bold text-on-surface-variant mb-1.5">Organisation Name</label>
                    <input type="text" className="w-full px-3 py-2 bg-surface bg-background border border-outline/20 rounded-lg text-sm" value="Acme Corp" disabled />
                  </div>
                  <div>
                    <label className="block text-xs font-label-bold text-on-surface-variant mb-1.5">Support Email</label>
                    <input type="email" className="w-full px-3 py-2 bg-surface bg-background border border-outline/20 rounded-lg text-sm" value="support@acmecorp.com" disabled />
                  </div>
                </div>
                <div className="pt-4 border-t border-outline/10">
                  <button className="px-4 py-2 bg-primary-fixed text-on-primary rounded-lg text-sm font-label-bold opacity-50 cursor-not-allowed">
                    Save Changes (Coming Soon)
                  </button>
                </div>
              </div>
            )}

            {/* Plan Tab */}
            {activeTab === 'plan' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-md text-lg">Current Subscription</h2>
                  <span className="px-3 py-1 bg-primary-fixed/10 text-primary-fixed rounded-full text-xs font-label-bold">Pro Tier</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-outline/10 rounded-xl bg-background">
                    <p className="text-xs text-on-surface-variant mb-1">AI Responses Used</p>
                    <p className="font-headline-md text-xl">4,231 <span className="text-sm font-body-md text-on-surface-variant">/ 10,000</span></p>
                  </div>
                  <div className="p-4 border border-outline/10 rounded-xl bg-background">
                    <p className="text-xs text-on-surface-variant mb-1">Active Agents</p>
                    <p className="font-headline-md text-xl">4 <span className="text-sm font-body-md text-on-surface-variant">/ 5</span></p>
                  </div>
                  <div className="p-4 border border-outline/10 rounded-xl bg-background">
                    <p className="text-xs text-on-surface-variant mb-1">Renewal Date</p>
                    <p className="font-headline-md text-xl">Oct 24, 2026</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-outline/10">
                  <button className="px-4 py-2 border border-outline/20 rounded-lg text-sm font-label-bold hover:bg-surface-container transition-colors">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            )}

            {/* Manage Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-md text-lg">Team Members</h2>
                  <button className="flex items-center gap-2 bg-primary-fixed text-on-primary px-4 py-2 rounded-lg font-label-bold text-sm hover:brightness-110 transition-all shadow-md">
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    Invite Agent
                  </button>
                </div>

                <div className="overflow-hidden border border-outline/10 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container/50 border-b border-outline/10">
                        <th className="px-4 py-3 text-xs font-label-bold text-on-surface-variant">Name</th>
                        <th className="px-4 py-3 text-xs font-label-bold text-on-surface-variant">Email</th>
                        <th className="px-4 py-3 text-xs font-label-bold text-on-surface-variant">Role</th>
                        <th className="px-4 py-3 text-xs font-label-bold text-on-surface-variant">Status</th>
                        <th className="px-4 py-3 text-xs font-label-bold text-on-surface-variant text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline/5">
                      {/* Dummy User 1 */}
                      <tr className="hover:bg-surface-container/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary flex items-center justify-center text-xs font-label-bold">AD</div>
                            <span className="text-sm font-body-md">Admin User</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-on-surface-variant">admin@acmecorp.com</td>
                        <td className="px-4 py-3 text-sm">Owner</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-label-bold bg-green-500/10 text-green-500">Active</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                        </td>
                      </tr>
                      {/* Dummy User 2 */}
                      <tr className="hover:bg-surface-container/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center text-xs font-label-bold">SA</div>
                            <span className="text-sm font-body-md">Support Agent</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-on-surface-variant">agent1@acmecorp.com</td>
                        <td className="px-4 py-3 text-sm">Agent</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-label-bold bg-green-500/10 text-green-500">Active</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
