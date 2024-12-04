import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { UserList } from './components/UserList';
import { RoleList } from './components/RoleList';
import { Stats } from './components/dashboard/Stats';
import { RecentActivity } from './components/dashboard/RecentActivity';
import { PermissionMatrix } from './components/permissions/PermissionMatrix';
import { UserModal } from './components/users/UserModal';
import { RoleModal } from './components/roles/RoleModal';
import { Search } from './components/common/Search';
import { users as initialUsers, roles as initialRoles, permissions } from './data/mockData';
import { User, Role } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'roles'>('dashboard');
  const [usersList, setUsersList] = useState(initialUsers);
  const [rolesList, setRolesList] = useState(initialRoles);
  const [search, setSearch] = useState('');
  const [activities, setActivities] = useState([
    {
      id: '1',
      user: 'John Doe',
      action: 'created a new role',
      target: 'Content Editor',
      timestamp: '5 minutes ago',
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'modified permissions for',
      target: 'User Manager',
      timestamp: '1 hour ago',
    },
  ]);
  
  // Modal states
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [editingRole, setEditingRole] = useState<Role | undefined>();

  // Stats calculations
  const stats = {
    totalUsers: usersList.length,
    activeUsers: usersList.filter(u => u.status === 'active').length,
    totalRoles: rolesList.length,
    recentActivities: activities.length,
  };

  // Filtered data based on search
  const filteredUsers = usersList.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRoles = rolesList.filter(role =>
    role.name.toLowerCase().includes(search.toLowerCase()) ||
    role.description.toLowerCase().includes(search.toLowerCase())
  );

  // Permission matrix handler
  const handleTogglePermission = (roleId: string, permissionId: string) => {
    setRolesList(roles => roles.map(role => {
      if (role.id !== roleId) return role;
      
      const hasPermission = role.permissions.some(p => p.id === permissionId);
      const newPermissions = hasPermission
        ? role.permissions.filter(p => p.id !== permissionId)
        : [...role.permissions, permissions.find(p => p.id === permissionId)!];
      
      return { ...role, permissions: newPermissions };
    }));

    // Add activity
    const role = rolesList.find(r => r.id === roleId)!;
    const permission = permissions.find(p => p.id === permissionId)!;
    addActivity('System', `updated permissions for`, role.name);
  };

  // Activity logger
  const addActivity = (user: string, action: string, target: string) => {
    const newActivity = {
      id: String(Date.now()),
      user,
      action,
      target,
      timestamp: 'just now',
    };
    setActivities([newActivity, ...activities.slice(0, 9)]);
  };

  // User handlers
  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: String(usersList.length + 1),
    };
    setUsersList([...usersList, newUser]);
    addActivity('System', 'added new user', userData.name);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserModalOpen(true);
  };

  const handleUpdateUser = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      setUsersList(usersList.map(user =>
        user.id === editingUser.id ? { ...userData, id: user.id } : user
      ));
      addActivity('System', 'updated user', userData.name);
      setEditingUser(undefined);
    }
  };

  const handleDeleteUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId)!;
    setUsersList(usersList.filter(u => u.id !== userId));
    addActivity('System', 'deleted user', user.name);
  };

  // Role handlers
  const handleAddRole = (roleData: Omit<Role, 'id'>) => {
    const newRole = {
      ...roleData,
      id: String(rolesList.length + 1),
    };
    setRolesList([...rolesList, newRole]);
    addActivity('System', 'created new role', roleData.name);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleModalOpen(true);
  };

  const handleUpdateRole = (roleData: Omit<Role, 'id'>) => {
    if (editingRole) {
      setRolesList(rolesList.map(role =>
        role.id === editingRole.id ? { ...roleData, id: role.id } : role
      ));
      addActivity('System', 'updated role', roleData.name);
      setEditingRole(undefined);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    const role = rolesList.find(r => r.id === roleId)!;
    setRolesList(rolesList.filter(r => r.id !== roleId));
    addActivity('System', 'deleted role', role.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' ? (
          <div className="space-y-6">
            <Stats {...stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity activities={activities} />
              <PermissionMatrix
                roles={rolesList}
                permissions={permissions}
                onTogglePermission={handleTogglePermission}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Search
                value={search}
                onChange={setSearch}
                placeholder={`Search ${activeTab}...`}
              />
            </div>

            {activeTab === 'users' ? (
              <>
                <UserList
                  users={filteredUsers}
                  roles={rolesList}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                  onAddUser={() => setUserModalOpen(true)}
                />
                <UserModal
                  isOpen={userModalOpen}
                  onClose={() => {
                    setUserModalOpen(false);
                    setEditingUser(undefined);
                  }}
                  onSubmit={editingUser ? handleUpdateUser : handleAddUser}
                  roles={rolesList}
                  initialData={editingUser}
                />
              </>
            ) : (
              <>
                <RoleList
                  roles={filteredRoles}
                  onEditRole={handleEditRole}
                  onDeleteRole={handleDeleteRole}
                  onAddRole={() => setRoleModalOpen(true)}
                />
                <RoleModal
                  isOpen={roleModalOpen}
                  onClose={() => {
                    setRoleModalOpen(false);
                    setEditingRole(undefined);
                  }}
                  onSubmit={editingRole ? handleUpdateRole : handleAddRole}
                  initialData={editingRole}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;