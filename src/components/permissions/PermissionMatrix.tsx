import React from 'react';
import { Card } from '../common/Card';
import { Role, Permission } from '../../types';
import { Lock, Info } from 'lucide-react';

interface PermissionMatrixProps {
  roles: Role[];
  permissions: Permission[];
  onTogglePermission: (roleId: string, permissionId: string) => void;
}

export function PermissionMatrix({ roles, permissions, onTogglePermission }: PermissionMatrixProps) {
  const hasPermission = (role: Role, permissionId: string) => {
    return role.permissions.some(p => p.id === permissionId);
  };

  const getModuleColor = (module: string) => {
    const colors: Record<string, string> = {
      Users: 'bg-blue-50 text-blue-700',
      Roles: 'bg-purple-50 text-purple-700',
    };
    return colors[module] || 'bg-gray-50 text-gray-700';
  };

  return (
    <Card className="p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Permission Matrix</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <Info className="h-5 w-5" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-l-lg">
                Permissions
              </th>
              {roles.map((role) => (
                <th key={role.id} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {permissions.map((permission) => (
              <tr key={permission.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getModuleColor(permission.module)}`}>
                      {permission.module}
                    </span>
                    <span className="ml-2 text-sm text-gray-900">{permission.name}</span>
                  </div>
                </td>
                {roles.map((role) => (
                  <td key={role.id} className="px-6 py-4 whitespace-nowrap">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={hasPermission(role, permission.id)}
                        onChange={() => onTogglePermission(role.id, permission.id)}
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}