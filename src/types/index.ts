export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  roleId: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}