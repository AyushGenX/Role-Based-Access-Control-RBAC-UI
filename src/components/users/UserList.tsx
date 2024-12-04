import React from 'react';
import { User, Role } from '../../types';
import { Users, Plus, UserPlus } from 'lucide-react';
import { UserCard } from './UserCard';
import { Button } from '../common/Button';

interface UserListProps {
  users: User[];
  roles: Role[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onAddUser: () => void;
}

export function UserList({ users, roles, onEditUser, onDeleteUser, onAddUser }: UserListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
        </div>
        <Button 
          icon={UserPlus} 
          onClick={onAddUser}
          className="shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-0.5"
        >
          Add User
        </Button>
      </div>
      
      {users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No users</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new user</p>
          <div className="mt-6">
            <Button onClick={onAddUser} icon={Plus}>
              Add User
            </Button>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}