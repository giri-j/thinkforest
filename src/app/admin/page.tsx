'use client'

import { useState } from 'react'
import { Plus, LayoutGrid, FileText, Settings } from 'lucide-react'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('posts')

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-brand-dark text-white p-6 flex flex-col gap-8">
                <div className="text-2xl font-bold px-4">기획의<span>숲</span> Admin</div>
                <nav className="flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-white/10 text-gray-400'}`}
                    >
                        <LayoutGrid size={20} /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'posts' ? 'bg-primary text-white' : 'hover:bg-white/10 text-gray-400'}`}
                    >
                        <FileText size={20} /> Posts
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-white/10 text-gray-400'}`}
                    >
                        <Settings size={20} /> Settings
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-brand-dark">Posts Management</h1>
                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        <Plus size={20} /> New Post
                    </button>
                </header>

                {/* Post Table Mock */}
                <div className="bg-white rounded-3xl border border-border overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-6 font-medium text-brand-dark">기획 프로젝트 {i} 가이드</td>
                                    <td className="px-6 py-6">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Published</span>
                                    </td>
                                    <td className="px-6 py-6 text-sm text-gray-500">2024.02.18</td>
                                    <td className="px-6 py-6">
                                        <div className="flex gap-3">
                                            <button className="text-primary hover:underline font-bold text-sm">Edit</button>
                                            <button className="text-rose-500 hover:underline font-bold text-sm">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
