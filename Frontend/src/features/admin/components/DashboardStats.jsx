import React from 'react';

const DashboardStats = ({ stats }) => {
  const data = stats || {
    openTickets: 0,
    aiResolutionRate: "0%",
    avgResponseTime: "N/A",
    csatScore: "N/A"
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Stat Card 1 */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline/10 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="font-label-bold uppercase tracking-wider text-xs">Open Tickets</span>
          <span className="material-symbols-outlined">confirmation_number</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="font-headline-md text-4xl">{data.openTickets}</span>
        </div>
      </div>

      {/* Stat Card 2 */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline/10 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="font-label-bold uppercase tracking-wider text-xs">Avg Response Time</span>
          <span className="material-symbols-outlined">timer</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="font-headline-md text-4xl">{data.avgResponseTime}</span>
        </div>
      </div>

      {/* Stat Card 3 */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline/10 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="font-label-bold uppercase tracking-wider text-xs">AI Resolution Rate</span>
          <span className="material-symbols-outlined">smart_toy</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="font-headline-md text-4xl">{data.aiResolutionRate}</span>
        </div>
      </div>

      {/* Stat Card 4 */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline/10 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="font-label-bold uppercase tracking-wider text-xs">CSAT Score</span>
          <span className="material-symbols-outlined">sentiment_very_satisfied</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="font-headline-md text-4xl">{data.csatScore}</span>
          <span className="text-on-surface-variant text-sm font-label-bold">/ 5.0</span>
        </div>
      </div>
    </section>
  );
};

export default DashboardStats;
