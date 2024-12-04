import React from 'react';
import { User, Role } from '../../types';
import { UserCog, Trash2, Mail, Shield, User as UserIcon } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface UserCardProps {
  user: User;
  role: Role;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UserCard({ user, role, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="p-6 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-100 rounded-full p-2">
              <UserIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <Badge variant={user.status === 'active' ? 'success' : 'error'}>
                {user.status}
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              {user.email}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Shield className="h-4 w-4 mr-2 text-gray-400" />
              {role.name}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={UserCog}
            onClick={() => onEdit(user)}
            className="hover:bg-indigo-50"
          />
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(user.id)}
            className="hover:bg-red-50"
          />
        </div>
      </div>
    </Card>
  );
}