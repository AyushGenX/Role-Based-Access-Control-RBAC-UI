import React from 'react';
import { User, Role } from '../types';
import { Users, Plus } from 'lucide-react';
import { UserCard } from './users/UserCard';
import { Button } from './common/Button';

interface UserListProps {
  users: User[];
  roles: Role[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserList({ users, roles, onEditUser, onDeleteUser }: UserListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
        </div>
        <Button icon={Plus}>Add User</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            role={roles.find(r => r.id === user.roleId)!}
            onEdit={onEditUser}
            onDelete={onDeleteUser}
          />
        ))}
      </div>
    </div>
  );
}