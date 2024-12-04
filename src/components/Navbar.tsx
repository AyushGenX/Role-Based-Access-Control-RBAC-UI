import React from 'react';
import { Shield, Users, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from './common/Button';

interface NavbarProps {
  activeTab: 'dashboard' | 'users' | 'roles';
  onTabChange: (tab: 'dashboard' | 'users' | 'roles') => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">RBAC Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant={activeTab === 'dashboard' ? 'primary' : 'secondary'}
              icon={LayoutDashboard}
              onClick={() => onTabChange('dashboard')}
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'users' ? 'primary' : 'secondary'}
              icon={Users}
              onClick={() => onTabChange('users')}
            >
              Users
            </Button>
            <Button
              variant={activeTab === 'roles' ? 'primary' : 'secondary'}
              icon={Settings}
              onClick={() => onTabChange('roles')}
            >
              Roles
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}