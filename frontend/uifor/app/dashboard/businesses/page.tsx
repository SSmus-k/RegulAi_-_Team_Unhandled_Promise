"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, MapPin, Phone, Globe, ChevronRight } from "lucide-react";

interface Business {
  id: string;
  name: string;
  type: string;
  industry: string;
  registrationNumber: string;
  location: string;
  phone: string;
  website?: string;
  status: "active" | "pending" | "inactive";
  employees: number;
  revenue: string;
  registrationDate: string;
}

export default function MyBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: "1",
      name: "TechFlow Solutions",
      type: "Private Limited",
      industry: "Software Development",
      registrationNumber: "PAN001234567",
      location: "Kathmandu, Nepal",
      phone: "+977-1-5555555",
      website: "www.techflow.com",
      status: "active",
      employees: 45,
      revenue: "50-100M NPR",
      registrationDate: "2020-03-15",
    },
    {
      id: "2",
      name: "Nepal Trade Pvt Ltd",
      type: "Private Limited",
      industry: "Import-Export",
      registrationNumber: "PAN001234568",
      location: "Lalitpur, Nepal",
      phone: "+977-1-4444444",
      website: "www.nepaltrade.com",
      status: "active",
      employees: 28,
      revenue: "30-50M NPR",
      registrationDate: "2019-06-20",
    },
    {
      id: "3",
      name: "Creative Agency Hub",
      type: "Partnership",
      industry: "Marketing & Design",
      registrationNumber: "PAN001234569",
      location: "Bhaktapur, Nepal",
      phone: "+977-1-6666666",
      website: "www.creativeagency.com",
      status: "pending",
      employees: 12,
      revenue: "10-30M NPR",
      registrationDate: "2023-01-10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    industry: "",
    registrationNumber: "",
    location: "",
    phone: "",
    website: "",
    employees: "",
    revenue: "",
  });

  const handleAddBusiness = () => {
    setEditingBusiness(null);
    setFormData({
      name: "",
      type: "",
      industry: "",
      registrationNumber: "",
      location: "",
      phone: "",
      website: "",
      employees: "",
      revenue: "",
    });
    setShowModal(true);
  };

  const handleEditBusiness = (business: Business) => {
    setEditingBusiness(business);
    setFormData({
      name: business.name,
      type: business.type,
      industry: business.industry,
      registrationNumber: business.registrationNumber,
      location: business.location,
      phone: business.phone,
      website: business.website || "",
      employees: business.employees.toString(),
      revenue: business.revenue,
    });
    setShowModal(true);
  };

  const handleDeleteBusiness = (id: string) => {
    if (confirm("Are you sure you want to delete this business?")) {
      setBusinesses(businesses.filter((b) => b.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBusiness) {
      setBusinesses(
        businesses.map((b) =>
          b.id === editingBusiness.id
            ? {
                ...b,
                name: formData.name,
                type: formData.type,
                industry: formData.industry,
                registrationNumber: formData.registrationNumber,
                location: formData.location,
                phone: formData.phone,
                website: formData.website,
                employees: parseInt(formData.employees) || 0,
                revenue: formData.revenue,
              }
            : b
        )
      );
    } else {
      const newBusiness: Business = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        industry: formData.industry,
        registrationNumber: formData.registrationNumber,
        location: formData.location,
        phone: formData.phone,
        website: formData.website,
        status: "pending",
        employees: parseInt(formData.employees) || 0,
        revenue: formData.revenue,
        registrationDate: new Date().toISOString().split("T")[0],
      };
      setBusinesses([...businesses, newBusiness]);
    }
    setShowModal(false);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-200 border border-green-500/50";
      case "pending":
        return "bg-yellow-500/20 text-yellow-200 border border-yellow-500/50";
      default:
        return "bg-gray-500/20 text-gray-200 border border-gray-500/50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Businesses</h1>
          <p className="text-cyan-100">Manage and monitor all your registered businesses</p>
        </div>
        <button
          onClick={handleAddBusiness}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Business
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Businesses", value: businesses.length, icon: "🏢", color: "from-blue-500 to-cyan-700" },
          {
            label: "Active",
            value: businesses.filter((b) => b.status === "active").length,
            icon: "✅",
            color: "from-green-500 to-teal-700",
          },
          {
            label: "Pending",
            value: businesses.filter((b) => b.status === "pending").length,
            icon: "⏳",
            color: "from-yellow-500 to-orange-700",
          },
          {
            label: "Total Employees",
            value: businesses.reduce((sum, b) => sum + b.employees, 0),
            icon: "👥",
            color: "from-purple-500 to-indigo-700",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-linear-to-br ${stat.color} rounded-xl p-6 shadow-lg`}
            style={{ backdropFilter: "blur(12px)", background: "rgba(30,41,59,0.7)" }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-sm font-medium text-gray-300">{stat.label}</div>
            <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Businesses Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Your Businesses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-cyan-500/50 transition shadow-lg"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{business.name}</h3>
                  <p className="text-sm text-cyan-300">{business.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(business.status)}`}>
                  {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                </span>
              </div>

              {/* Industry & Registration */}
              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-white/10">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Industry</p>
                  <p className="text-sm text-white font-medium">{business.industry}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Registration Number</p>
                  <p className="text-sm text-white font-medium font-mono">{business.registrationNumber}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-cyan-200">
                  <MapPin className="w-4 h-4" />
                  {business.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-cyan-200">
                  <Phone className="w-4 h-4" />
                  {business.phone}
                </div>
                {business.website && (
                  <div className="flex items-center gap-2 text-sm text-cyan-200">
                    <Globe className="w-4 h-4" />
                    <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {business.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Employees</p>
                  <p className="text-lg font-bold text-cyan-200">{business.employees}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Revenue</p>
                  <p className="text-sm font-bold text-cyan-200">{business.revenue}</p>
                </div>
              </div>

              {/* Registration Date */}
              <p className="text-xs text-gray-500 mb-4">
                Registered on {new Date(business.registrationDate).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditBusiness(business)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBusiness(business.id)}
                  className="flex-1 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg font-medium border border-red-500/30 transition"
                >
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-cyan-300 rounded-lg font-medium border border-white/20 transition">
                  <ChevronRight className="w-4 h-4" />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingBusiness ? "Edit Business" : "Add New Business"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Business Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    placeholder="Enter business name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Business Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="Public Limited">Public Limited</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Industry *</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    placeholder="e.g., Software Development"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Registration Number *</label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    placeholder="e.g., PAN123456789"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    placeholder="e.g., Kathmandu, Nepal"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    placeholder="+977-1-xxxx"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Website</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    placeholder="www.example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Number of Employees *</label>
                  <input
                    type="number"
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    placeholder="0"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-cyan-200 mb-2">Annual Revenue *</label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                    required
                  >
                    <option value="">Select revenue range</option>
                    <option value="0-10M NPR">0 - 10M NPR</option>
                    <option value="10-30M NPR">10 - 30M NPR</option>
                    <option value="30-50M NPR">30 - 50M NPR</option>
                    <option value="50-100M NPR">50 - 100M NPR</option>
                    <option value="100M+ NPR">100M+ NPR</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold shadow-lg transition"
                >
                  {editingBusiness ? "Update Business" : "Add Business"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold border border-white/20 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
