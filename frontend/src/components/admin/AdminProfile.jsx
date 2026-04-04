import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  Shield, 
  Mail, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Eye, 
  Edit3,
  User
} from 'lucide-react';

const AdminProfile = () => {
  // Mock Data matching your image
  const [users] = useState([
    {
      id: 1,
      name: "John Doe (You)",
      email: "john@collegedekho.com",
      role: "Super Admin",
      status: "Active",
      lastActive: "Now",
      type: "self",
      avatarType: "initials",
      initials: "JD",
      avatarColor: "bg-[#0B1C33] text-white"
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@collegedekho.com",
      role: "Editor",
      status: "Active",
      lastActive: "2 hours ago",
      type: "standard",
      avatarType: "image",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      email: "rahul@collegedekho.com",
      role: "Viewer",
      status: "Offline",
      lastActive: "2 days ago",
      type: "standard",
      avatarType: "initials",
      initials: "RK",
      avatarColor: "bg-orange-100 text-orange-600"
    },
    {
      id: 4,
      name: "new.intern@collegedekho.com",
      email: "Invitation Sent",
      isInvite: true, // Special flag for invitation styling
      role: "Editor",
      status: "Pending",
      lastActive: "--",
      type: "invite",
      avatarType: "icon"
    }
  ]);

  // Helper to render role badges with specific styles/icons
  const getRoleBadge = (role) => {
    switch (role) {
      case "Super Admin":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 uppercase tracking-wide">
            <Shield size={12} className="fill-current" /> Super Admin
          </span>
        );
      case "Editor":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase tracking-wide">
            <Edit3 size={12} /> Editor
          </span>
        );
      case "Viewer":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-wide">
            <Eye size={12} /> Viewer
          </span>
        );
      default:
        return null;
    }
  };

  // Helper for Status Dots
  const getStatusDot = (status) => {
    const color = status === "Active" ? "bg-green-500" : status === "Pending" ? "bg-yellow-500" : "bg-slate-400";
    const textColor = status === "Active" ? "text-green-700" : status === "Pending" ? "text-yellow-700" : "text-slate-500";
    
    return (
      <div className={`flex items-center gap-2 text-sm font-medium ${textColor}`}>
        <span className={`w-2 h-2 rounded-full ${color}`}></span>
        {status}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#F8FAFC] p-6 lg:p-8 min-h-screen font-sans">
      
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Users Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-3xl font-extrabold text-[#0B1C33]">12</h3>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <Users size={20} />
          </div>
        </div>

        {/* Super Admins Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Super Admins</p>
            <h3 className="text-3xl font-extrabold text-[#0B1C33]">2</h3>
          </div>
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
            <Shield size={20} className="fill-current" />
          </div>
        </div>

        {/* Pending Invites Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Invites</p>
            <h3 className="text-3xl font-extrabold text-[#0B1C33]">1</h3>
          </div>
          <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
            <Mail size={20} />
          </div>
        </div>
      </div>

      {/* 2. Action Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex w-full sm:w-auto gap-3">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search team members..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#0B1C33] focus:ring-1 focus:ring-[#0B1C33] transition-all shadow-sm placeholder:text-slate-400"
            />
          </div>

          {/* Role Filter */}
          <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 font-medium focus:outline-none cursor-pointer shadow-sm">
            <option>All Roles</option>
            <option>Super Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>

        {/* Invite Button */}
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-sm font-bold rounded-lg shadow-md transition-all active:scale-95">
          <Plus size={18} strokeWidth={3} />
          Invite User
        </button>
      </div>

      {/* 3. Users Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  
                  {/* User Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar Logic */}
                      {user.avatarType === 'image' ? (
                        <img src={user.src} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                      ) : user.avatarType === 'icon' ? (
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                          <User size={20} />
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${user.avatarColor}`}>
                          {user.initials}
                        </div>
                      )}
                      
                      <div>
                        <p className={`font-bold text-sm ${user.isInvite ? 'text-slate-500' : 'text-[#0B1C33]'}`}>
                          {user.name}
                        </p>
                        {user.isInvite ? (
                          <p className="text-xs font-bold text-orange-500 mt-0.5">{user.email}</p>
                        ) : (
                          <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Role Column */}
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">
                    {getStatusDot(user.status)}
                  </td>

                  {/* Last Active Column */}
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {user.lastActive}
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    {user.type === 'self' ? (
                      <button className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                        Edit
                      </button>
                    ) : user.type === 'invite' ? (
                      <div className="flex items-center justify-end gap-4">
                        <button className="text-xs font-bold text-[#0B1C33] hover:text-slate-600 transition-colors">
                          Resend
                        </button>
                        <button className="p-2 bg-white border border-slate-200 rounded text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm">
                          <X size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white border border-slate-200 rounded text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm">
                          <Pencil size={14} strokeWidth={2.5} />
                        </button>
                        <button className="p-2 bg-white border border-slate-200 rounded text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm">
                          <Trash2 size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;