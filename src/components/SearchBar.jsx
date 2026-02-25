import { useState } from 'react';
import { Search, Plane, Hotel, Package, Car } from 'lucide-react';

const tabs = [
    { icon: Plane, label: 'Flights', key: 'flights' },
    { icon: Hotel, label: 'Hotels', key: 'hotels' },
    { icon: Package, label: 'Packages', key: 'packages' },
    { icon: Car, label: 'Car Hire', key: 'car' },
];

export default function SearchBar() {
    const [activeTab, setActiveTab] = useState('packages');
    const [formData, setFormData] = useState({
        from: 'London, LHR',
        destination: 'Bali, Indonesia',
        depart: 'Mar 14, 2025',
        guests: '2 Adults',
    });

    return (
        <div className="w-full">
            {/* Main Search Bar */}
            <div className="glass-ultra glass-specular rounded-[20px] relative overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] items-center">
                    {/* From */}
                    <div className="p-4 lg:p-5 border-b sm:border-b lg:border-b-0 lg:border-r border-white/[0.18]">
                        <label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-1">
                            ✈ Flying From
                        </label>
                        <input
                            type="text"
                            value={formData.from}
                            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                            className="bg-transparent font-body text-sm text-white w-full outline-none placeholder-white/35"
                        />
                    </div>

                    {/* Destination */}
                    <div className="p-4 lg:p-5 border-b sm:border-b lg:border-b-0 lg:border-r border-white/[0.18]">
                        <label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-1">
                            📍 Destination
                        </label>
                        <input
                            type="text"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            className="bg-transparent font-body text-sm text-white w-full outline-none placeholder-white/35"
                        />
                    </div>

                    {/* Depart */}
                    <div className="p-4 lg:p-5 border-b sm:border-b-0 lg:border-r border-white/[0.18]">
                        <label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-1">
                            📅 Depart
                        </label>
                        <input
                            type="text"
                            value={formData.depart}
                            onChange={(e) => setFormData({ ...formData, depart: e.target.value })}
                            className="bg-transparent font-body text-sm text-white w-full outline-none placeholder-white/35"
                        />
                    </div>

                    {/* Guests */}
                    <div className="p-4 lg:p-5 border-b sm:border-b-0 sm:border-r lg:border-r border-white/[0.18]">
                        <label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-1">
                            👥 Guests
                        </label>
                        <input
                            type="text"
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                            className="bg-transparent font-body text-sm text-white w-full outline-none placeholder-white/35"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="p-4 flex items-center justify-center">
                        <button className="glass-gold rounded-[14px] w-12 h-12 flex items-center justify-center hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-250">
                            <Search size={20} className="text-[#3A2000]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Bar */}
            <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 h-10 px-5 rounded-full font-body text-xs uppercase tracking-[0.14em] transition-all duration-300 whitespace-nowrap ${isActive
                                    ? 'glass-gold text-[#3A2000] font-medium'
                                    : 'glass-pill text-white/75 hover:-translate-y-0.5'
                                }`}
                        >
                            <Icon size={14} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
