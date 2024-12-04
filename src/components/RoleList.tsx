import React from 'react';
import { Role } from '../types';
import { Shield, Plus } from 'lucide-react';
import { RoleCard } from './roles/RoleCard';
import { Button } from './common/Button';

interface RoleListProps {
  roles: Role[];
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
}

export function RoleList({ roles, onEditRole, onDeleteRole }: RoleListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Roles</h2>
        </div>
        <Button icon={Plus}>Add Role</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onEdit={onEditRole}
            onDelete={onDeleteRole}
          />
        ))}
      </div>
    </div>
  );
}