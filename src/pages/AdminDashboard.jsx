import React, { useState } from 'react';
import { LayoutDashboard, FileText, CreditCard, MessageSquare, Plus, Edit, Trash2, Sprout } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('reviews');

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'reviews', name: 'Manage Reviews', icon: FileText },
        { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
        { id: 'contacts', name: 'Contact Requests', icon: MessageSquare },
    ];

    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 py-8 px-4 hidden md:block">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-bold text-sm',
                                activeTab === item.id
                                    ? 'bg-green-50 text-primary-green shadow-sm'
                                    : 'text-gray-500 hover:bg-gray-50'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <header className="mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight capitalize">{activeTab.replace('-', ' ')}</h1>
                    <p className="text-gray-500 font-medium">Manage your agri-tech platform efficiently.</p>
                </header>

                {/* Content Area */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    {activeTab === 'reviews' ? (
                        <div className="py-24 text-center">
                            <MessageSquare className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-gray-900">Review Management</h2>
                            <p className="text-gray-500 mt-2">Manage customer feedback and testimonials here.</p>
                            <button className="mt-8 bg-primary-green text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-100 flex items-center mx-auto">
                                <Plus className="h-4 w-4 mr-2" /> Add New Review
                            </button>
                        </div>
                    ) : (
                        <div className="py-32 text-center text-gray-500">
                            <Sprout className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                            <p className="font-bold">No data found in {activeTab}</p>
                            <p className="text-sm mt-1">This section is currently being populated with farm insights.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// Local cn helper
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default AdminDashboard;