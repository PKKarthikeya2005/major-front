import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { usePhotographers, type Photographer } from "../context/PhotographerContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Plus, Edit2, Trash2, Calendar, Users, Camera, X, Search } from "lucide-react";

export const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const { photographers, pendingPhotographers, bookings, addPhotographer, updatePhotographer, deletePhotographer, approvePhotographer, rejectPhotographer, stats } = usePhotographers();

    // Safety check for context data
    if (!stats || !photographers) return <div className="pt-32 text-center text-white">Loading Admin Panel...</div>;
    const [activeTab, setActiveTab] = useState<'photographers' | 'bookings' | 'approvals'>('photographers');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Photographer>>({});

    // Filtering
    const [searchTerm, setSearchTerm] = useState("");

    const handleAdd = () => {
        setEditingId(null);
        setFormData({
            name: "",
            role: "Cinematic Photographer",
            city: "",
            price: "",
            image: "https://images.unsplash.com/photo-1556103255-4443dbae8e5a?q=80&w=1000",
            description: "",
            rating: 5.0,
            reviews: 0,
            specialty: "Weddings & Events",
            whyChosen: "Exceptional visual storytelling.",
            mapQuery: "",
            portfolio: []
        });
        setIsModalOpen(true);
    };

    const handleEdit = (p: Photographer) => {
        setEditingId(p.id);
        setFormData(p);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this photographer?")) {
            deletePhotographer(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updatePhotographer({ ...formData, id: editingId } as Photographer);
        } else {
            addPhotographer({ ...formData, id: Date.now().toString() } as Photographer);
        }
        setIsModalOpen(false);
    };

    const filteredPhotographers = photographers.filter(p =>
        (p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (p.city?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    );

    return (
        <div className="min-h-screen bg-rich-black text-white pt-24 pb-20 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none fixed" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="font-playfair text-4xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-gray-400">Welcome back, {user?.name}. Manage your platform.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-full px-6 py-2 flex items-center gap-4 text-sm text-gray-300">
                            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-gold-leaf" /> {stats.totalPhotographers} Photographers</span>
                            <span className="w-px h-4 bg-white/20" />
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold-leaf" /> {stats.totalBookings} Bookings</span>
                            <span className="w-px h-4 bg-white/20" />
                            <span className="flex items-center gap-2 text-gold-leaf font-bold"> {stats.pendingRequests} Pending</span>
                        </div>
                        <Button variant="outline" onClick={logout} className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50">
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('photographers')}
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'photographers' ? 'bg-gold-leaf text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        Manage Photographers
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'bookings' ? 'bg-gold-leaf text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        View Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('approvals')}
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'approvals' ? 'bg-gold-leaf text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        Approvals
                        {stats.pendingRequests > 0 && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'approvals' ? 'bg-black text-white' : 'bg-gold-leaf text-black'}`}>
                                {stats.pendingRequests}
                            </span>
                        )}
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'photographers' ? (
                        <motion.div
                            key="photographers"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {/* ... (Existing Photographer Content) ... */}
                            <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search photographers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gold-leaf/50 w-64 transition-all"
                                    />
                                </div>
                                <Button onClick={handleAdd} className="bg-gold-leaf text-black hover:bg-white font-bold rounded-full gap-2">
                                    <Plus className="w-4 h-4" /> Add Photographer
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPhotographers.map((p) => (
                                    <Card key={p.id} className="bg-white/[0.03] border-white/10 hover:border-gold-leaf/30 transition-all group overflow-hidden relative">
                                        <div className="h-48 overflow-hidden relative">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <h3 className="font-playfair text-xl font-bold">{p.name}</h3>
                                                <p className="text-xs text-gray-300 flex items-center gap-1"><Camera className="w-3 h-3" /> {p.city}</p>
                                            </div>
                                            {/* Status Badge */}
                                            {p.status === 'pending' && (
                                                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider">
                                                    Pending
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex justify-between items-center border-t border-white/5">
                                            <span className="text-gold-leaf font-medium text-sm">{p.price}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(p)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-blue-400 transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-red-400 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    ) : activeTab === 'bookings' ? (
                        <motion.div
                            key="bookings"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Card className="bg-white/[0.02] border-white/10 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="p-4 font-medium">Date</th>
                                            <th className="p-4 font-medium">Photographer</th>
                                            <th className="p-4 font-medium">Client ID</th>
                                            <th className="p-4 font-medium">Status</th>
                                            <th className="p-4 font-medium text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                                        {bookings.length > 0 ? bookings.map((b) => (
                                            <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-4 font-mono text-xs">{b.date}</td>
                                                <td className="p-4 text-white font-medium">{b.photographerName}</td>
                                                <td className="p-4 text-gray-500 text-xs">{b.userId}</td>
                                                <td className="p-4">
                                                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/20">
                                                        {b.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right text-gold-leaf font-bold">₹{b.totalAmount.toLocaleString()}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-gray-500">No bookings found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </Card>
                        </motion.div>
                    ) : (
                        // APPROVALS TAB
                        <motion.div
                            key="approvals"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-playfair mb-6">Pending Applications ({pendingPhotographers.length})</h2>

                            {pendingPhotographers.length === 0 ? (
                                <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
                                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400">No pending applications.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {pendingPhotographers.map((p) => (
                                        <Card key={p.id} className="bg-white/[0.03] border-white/10 p-6 flex gap-6 items-start">
                                            <img src={p.image} alt={p.name} className="w-24 h-24 rounded-lg object-cover bg-gray-800" />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-playfair text-xl font-bold">{p.name}</h3>
                                                        <p className="text-xs text-gray-400">{p.city} • {p.specialty}</p>
                                                    </div>
                                                    <span className="text-gold-leaf font-mono text-sm">{p.price}</span>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{p.description}</p>

                                                <div className="flex gap-3">
                                                    <Button
                                                        onClick={() => approvePhotographer(p.id)}
                                                        className="flex-1 bg-green-600 hover:bg-green-500 text-white text-xs uppercase tracking-wider"
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        onClick={() => rejectPhotographer(p.id)}
                                                        variant="outline"
                                                        className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs uppercase tracking-wider"
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <Card className="w-full max-w-lg bg-rich-black border-white/10 shadow-2xl relative">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-6 border-b border-white/10">
                                <h2 className="font-playfair text-2xl font-bold">{editingId ? "Edit Photographer" : "Add New Photographer"}</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400 uppercase">Name</label>
                                        <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:border-gold-leaf outline-none"
                                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400 uppercase">City</label>
                                        <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:border-gold-leaf outline-none"
                                            value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="Hyderabad" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 uppercase">Image URL (Public/Unsplash)</label>
                                    <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:border-gold-leaf outline-none"
                                        value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400 uppercase">Price</label>
                                        <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:border-gold-leaf outline-none"
                                            value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="₹50,000 / day" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400 uppercase">Specialty</label>
                                        <input required className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:border-gold-leaf outline-none"
                                            value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })} placeholder="Weddings" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 uppercase">Description</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:border-gold-leaf outline-none h-24 resize-none"
                                        value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Brief bio..." />
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="border-white/10 hover:bg-white/5">Cancel</Button>
                                    <Button type="submit" className="bg-gold-leaf text-black font-bold hover:bg-white shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                        {editingId ? "Save Changes" : "Create Photographer"}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                )}


            </div>
        </div>
    );
};
