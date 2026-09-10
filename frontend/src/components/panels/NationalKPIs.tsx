import React from "react";
import { ShieldAlert, CheckCircle2, Clock, Activity } from "lucide-react";
import { NationalKPIs as NationalKPIsType } from "../../types/alert";

interface NationalKPIsProps {
  kpis: NationalKPIsType;
}

export const NationalKPIs: React.FC<NationalKPIsProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Total Incidents */}
      <div className="bg-white p-2.5 rounded-xl border border-border shadow-card">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wider">India Incidents</span>
          <Activity className="w-3.5 h-3.5 text-accent-blue" />
        </div>
        <div className="text-xl font-bold text-navy-900 tracking-tight">
          {kpis.totalEvents}
        </div>
        <div className="text-[10px] text-navy-400 mt-0.5">
          Across 28 States & 8 UTs
        </div>
      </div>

      {/* Verified Percentage */}
      <div className="bg-white p-2.5 rounded-xl border border-border shadow-card">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wider">Verified</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />
        </div>
        <div className="text-xl font-bold text-accent-green tracking-tight">
          {kpis.verifiedPercentage}%
        </div>
        <div className="text-[10px] text-navy-400 mt-0.5">
          {kpis.verifiedCount} corroborated
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-white p-2.5 rounded-xl border border-border shadow-card">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wider">Critical Alerts</span>
          <ShieldAlert className="w-3.5 h-3.5 text-alert-critical" />
        </div>
        <div className="text-xl font-bold text-alert-critical tracking-tight">
          {kpis.criticalAlertsCount}
        </div>
        <div className="text-[10px] text-alert-critical font-medium mt-0.5">
          NDRF / SDRF action needed
        </div>
      </div>

      {/* Pending Review */}
      <div className="bg-white p-2.5 rounded-xl border border-border shadow-card">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-navy-400 uppercase tracking-wider">Pending</span>
          <Clock className="w-3.5 h-3.5 text-accent-amber" />
        </div>
        <div className="text-xl font-bold text-accent-amber tracking-tight">
          {kpis.pendingReviewCount}
        </div>
        <div className="text-[10px] text-navy-400 mt-0.5">
          Awaiting verification
        </div>
      </div>
    </div>
  );
};
