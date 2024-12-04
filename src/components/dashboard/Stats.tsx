import React from 'react';
import { Users, Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { Card } from '../common/Card';

interface StatsProps {
  totalUsers: number;
  activeUsers: number;
  totalRoles: number;
  recentActivities: number;
}

export function Stats({ totalUsers, activeUsers, totalRoles, recentActivities }: StatsProps) {
  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      trend: '+5%',
      trendColor: 'text-green-600',
    },
    {
      label: 'Active Users',
      value: activeUsers,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
      trend: '+12%',
      trendColor: 'text-green-600',
    },
    {
      label: 'Total Roles',
      value: totalRoles,
      icon: Shield,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      trend: 'Stable',
      trendColor: 'text-gray-600',
    },
    {
      label: 'Recent Activities',
      value: recentActivities,
      icon: Activity,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      trend: '+3',
      trendColor: 'text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className={`${stat.bg} p-3 rounded-xl`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <span className={`text-xs font-medium ${stat.trendColor}`}>
              {stat.trend}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            <p className="mt-1 text-sm font-medium text-gray-600">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}