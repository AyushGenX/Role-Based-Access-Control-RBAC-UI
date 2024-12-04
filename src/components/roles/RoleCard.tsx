import React from 'react';
import { Role } from '../../types';
import { Edit, Trash2, Shield } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface RoleCardProps {
  role: Role;
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
}

export function RoleCard({ role, onEdit, onDelete }: RoleCardProps) {
  const getModuleColor = (module: string) => {
    const colors = {
      Users: 'info',
      Roles: 'warning',
    };
    return colors[module as keyof typeof colors] || 'info';
  };

  return (
    <Card className="p-6 transform transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit}
            onClick={() => onEdit(role)}
          />
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(role.id)}
          />
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4">{role.description}</p>
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions</h4>
        <div className="flex flex-wrap gap-2">
          {role.permissions.map((permission) => (
            <Badge
              key={permission.id}
              variant={getModuleColor(permission.module)}
            >
              {permission.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}