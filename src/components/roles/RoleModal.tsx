import React, { useState } from 'react';
import { Modal } from '../modals/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Role, Permission } from '../../types';
import { permissions } from '../../data/mockData';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (role: Omit<Role, 'id'>) => void;
  initialData?: Role;
}

export function RoleModal({ isOpen, onClose, onSubmit, initialData }: RoleModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    permissions: initialData?.permissions.map(p => p.id) || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.permissions.length === 0) newErrors.permissions = 'At least one permission is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name: formData.name,
        description: formData.description,
        permissions: permissions.filter(p => formData.permissions.includes(p.id)),
      });
      onClose();
    }
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Role' : 'Add Role'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        
        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Permissions
          </label>
          <div className="space-y-2">
            {permissions.map((permission) => (
              <label key={permission.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(permission.id)}
                  onChange={() => togglePermission(permission.id)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{permission.name}</span>
              </label>
            ))}
          </div>
          {errors.permissions && (
            <p className="text-xs text-red-600">{errors.permissions}</p>
          )}
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}