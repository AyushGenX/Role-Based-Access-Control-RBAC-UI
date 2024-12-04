import { User, Role, Permission } from '../types';

export const permissions: Permission[] = [
  { id: '1', name: 'read:users', description: 'View users', module: 'Users' },
  { id: '2', name: 'write:users', description: 'Create/Edit users', module: 'Users' },
  { id: '3', name: 'delete:users', description: 'Delete users', module: 'Users' },
  { id: '4', name: 'read:roles', description: 'View roles', module: 'Roles' },
  { id: '5', name: 'write:roles', description: 'Create/Edit roles', module: 'Roles' },
  { id: '6', name: 'delete:roles', description: 'Delete roles', module: 'Roles' },
];

export const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: permissions,
  },
  {
    id: '2',
    name: 'User Manager',
    description: 'Manage users only',
    permissions: permissions.filter(p => p.module === 'Users'),
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    roleId: '1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    roleId: '2',
  },
];