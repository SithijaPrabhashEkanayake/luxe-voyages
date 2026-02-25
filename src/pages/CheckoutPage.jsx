import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Lock, Check, Plane, Hotel as HotelIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustBadges from '../components/TrustBadges';

const steps = ['Review', 'Passengers', 'Extras', 'Payment'];

const extras = [
    { id: 1, icon: '🛡', title: 'Travel Insurance', provider: 'Cover Genius', price: 42, desc: 'Comprehensive cover for cancellation, medical & baggage' },
    { id: 2, icon: '🚗', title: 'Airport Transfer', provider: 'Private car', price: 28, desc: 'Door-to-door private transfer from airport to hotel' },
    { id: 3, icon: '✈', title: 'Lounge Access', provider: 'Priority Pass', price: 35, desc: 'Premium airport lounge with food, drinks & WiFi' },
];

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedExtras, setSelectedExtras] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        passport: '', dob: '', nationality: '',
        cardName: '', cardNumber: '', expiry: '', cvc: '', promoCode: '',
    });

    useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

    const toggleExtra = (id) => setSelectedExtras((prev) => ({ ...prev, [id]: !prev[id] }));
    const extrasTotal = extras.reduce((sum, e) => sum + (selectedExtras[e.id] ? e.price : 0), 0);
    const subtotal = 1680, taxes = 168, total = subtotal + taxes + extrasTotal;
    const updateField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

    return (
        <div className="min-h-screen pt-[72px]" style={{ background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1526 50%, #0a1628 100%)' }}>
            <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-8">
                <Link to="/hotel/1" className="inline-flex items-center gap-2 font-body text-xs text-white/52 hover:text-white pill-transition mb-6">
                    <ArrowLeft size={14} /> Back to hotel
                </Link>

                <div className={`reveal reveal-down ${loaded ? 'in-view' : ''} glass-ultra glass-specular rounded-[20px] p-5 mb-8`}>
                    <div className="flex items-center justify-between max-w-xl mx-auto">
                        {steps.map((step, i) => (
                            <div key={step} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center pill-transition ${i < currentStep ? 'bg-gold-base text-[#3A2000]' : i === currentStep ? 'border-2 border-gold-base bg-transparent relative' : 'glass-micro'}`}>
                                        {i < currentStep && <Check size={10} />}
                                        {i === currentStep && <div className="absolute inset-0 rounded-full border-2 border-gold-base/50 animate-ping" />}
                                    </div>
                                    <span className={`font-body text-[11px] uppercase tracking-wider mt-2 ${i <= currentStep ? 'text-gold-light' : 'text-white/35'}`}>{step}</span>
                                </div>
                                {i < steps.length - 1 && <div className={`w-16 md:w-24 h-px mx-2 pill-transition ${i < currentStep ? 'bg-gold-base' : 'bg-white/18'}`} />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                    <div>
                        <div key={currentStep} className="crossfade-enter space-y-5">
                            {currentStep === 0 && (
                                <div className="glass-ultra glass-specular rounded-[20px] p-6">
                                    <h2 className="font-display text-xl text-white font-semibold mb-5">Booking Summary</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 glass-micro rounded-[14px]">
                                            <Plane size={20} className="text-gold-light mt-1 flex-shrink-0" />
                                            <div><div className="font-body text-sm text-white font-medium">LHR → DPS · Mar 14, 2025</div><div className="font-body text-xs text-white/52">Emirates EK 009 · Business Class</div></div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 glass-micro rounded-[14px]">
                                            <HotelIcon size={20} className="text-gold-light mt-1 flex-shrink-0" />
                                            <div><div className="font-body text-sm text-white font-medium">Komaneka at Bisma</div><div className="font-body text-xs text-white/52">Deluxe Pool Villa · Mar 14–21 · 7 nights · 2 Adults</div></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {currentStep === 1 && (
                                <div className="glass-ultra glass-specular rounded-[20px] p-6">
                                    <h2 className="font-display text-xl text-white font-semibold mb-5">Passenger Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[{ label: 'First Name', field: 'firstName', placeholder: 'Sarah' }, { label: 'Last Name', field: 'lastName', placeholder: 'Mitchell' }, { label: 'Email', field: 'email', placeholder: 'sarah@email.com', full: true }, { label: 'Phone', field: 'phone', placeholder: '+44 7700 000000' }, { label: 'Passport Number', field: 'passport', placeholder: '123456789' }, { label: 'Date of Birth', field: 'dob', placeholder: 'DD/MM/YYYY' }, { label: 'Nationality', field: 'nationality', placeholder: 'British' }].map((f) => (
                                            <div key={f.field} className={f.full ? 'md:col-span-2' : ''}>
                                                <label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-2">{f.label}</label>
                                                <input type="text" value={formData[f.field]} onChange={(e) => updateField(f.field, e.target.value)} placeholder={f.placeholder} className="w-full glass-micro rounded-[14px] h-12 px-4 font-body text-sm text-white outline-none placeholder-white/25 focus:border-gold-base/60 focus:shadow-[0_0_20px_rgba(180,120,40,0.15)] pill-transition" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className="glass-ultra glass-specular rounded-[20px] p-6">
                                    <h2 className="font-display text-xl text-white font-semibold mb-2">Recommended For Your Trip</h2>
                                    <p className="font-body text-sm text-white/52 mb-5">Enhance your journey with these curated add-ons</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {extras.map((extra) => (
                                            <div key={extra.id} onClick={() => toggleExtra(extra.id)} className={`rounded-[14px] p-5 cursor-pointer pill-transition hover-lift ${selectedExtras[extra.id] ? 'glass-ultra border-gold-base/50 shadow-[0_0_20px_rgba(180,120,40,0.15)]' : 'glass-micro'}`}>
                                                <span className="text-3xl block mb-3">{extra.icon}</span>
                                                <h4 className="font-body text-sm font-medium text-white mb-1">{extra.title}</h4>
                                                <p className="font-body text-xs text-white/52 mb-3">{extra.desc}</p>
                                                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                                    <span className="font-mono text-sm text-gold-light">from £{extra.price}/pp</span>
                                                    <button className={`rounded-full h-7 px-3 font-body text-[10px] uppercase tracking-wider pill-transition ${selectedExtras[extra.id] ? 'glass-gold text-[#3A2000]' : 'glass-pill text-white/75'}`}>{selectedExtras[extra.id] ? '✓ Added' : '+ Add'}</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {currentStep === 3 && (
                                <div className="glass-ultra glass-specular rounded-[20px] p-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <h2 className="font-display text-xl text-white font-semibold">Payment Details</h2>
                                        <TrustBadges compact />
                                    </div>
                                    <div className="p-4 glass-micro rounded-[14px] mb-5 flex items-center gap-2">
                                        <Lock size={14} className="text-green-400" />
                                        <span className="font-body text-xs text-green-400">Your payment is encrypted and secure</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div><label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-2">Name on Card</label><input type="text" placeholder="Sarah Mitchell" value={formData.cardName} onChange={(e) => updateField('cardName', e.target.value)} className="w-full glass-micro rounded-[14px] h-12 px-4 font-body text-sm text-white outline-none placeholder-white/25 focus:border-gold-base/60 pill-transition" /></div>
                                        <div><label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-2">Card Number</label><input type="text" placeholder="4242 4242 4242 4242" value={formData.cardNumber} onChange={(e) => updateField('cardNumber', e.target.value)} className="w-full glass-micro rounded-[14px] h-12 px-4 font-mono text-sm text-white outline-none placeholder-white/25 focus:border-gold-base/60 pill-transition" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-2">Expiry</label><input type="text" placeholder="MM/YY" value={formData.expiry} onChange={(e) => updateField('expiry', e.target.value)} className="w-full glass-micro rounded-[14px] h-12 px-4 font-mono text-sm text-white outline-none placeholder-white/25 focus:border-gold-base/60 pill-transition" /></div>
                                            <div><label className="font-body text-[11px] uppercase tracking-[0.12em] text-white/35 block mb-2">CVC</label><input type="text" placeholder="123" value={formData.cvc} onChange={(e) => updateField('cvc', e.target.value)} className="w-full glass-micro rounded-[14px] h-12 px-4 font-mono text-sm text-white outline-none placeholder-white/25 focus:border-gold-base/60 pill-transition" /></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/10">
                                        {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay'].map((m) => (<span key={m} className="glass-micro rounded-md px-3 py-1.5 font-body text-[10px] uppercase tracking-wider text-white/40">{m}</span>))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className={`glass-pill rounded-full h-11 px-6 flex items-center gap-2 font-body text-xs uppercase tracking-[0.14em] pill-transition ${currentStep === 0 ? 'opacity-38 cursor-not-allowed text-white/35' : 'text-white/75 hover:-translate-y-0.5'}`}><ArrowLeft size={14} /> Back</button>
                            {currentStep < 3 ? (
                                <button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))} className="glass-gold glass-specular rounded-full h-11 px-8 flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect relative overflow-hidden">Proceed <ArrowRight size={14} /></button>
                            ) : (
                                <button className="glass-gold glass-specular rounded-full h-12 px-8 flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.14em] text-[#3A2000] hover:-translate-y-0.5 press-effect relative overflow-hidden"><Lock size={14} /> Complete Booking — £{total.toLocaleString()}</button>
                            )}
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-[88px] self-start">
                        <div className={`reveal reveal-right ${loaded ? 'in-view' : ''} glass-ultra glass-specular rounded-[20px] p-6 space-y-4`}>
                            <h3 className="font-body text-sm font-medium text-white">Order Total</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between"><span className="font-body text-sm text-white/52">Subtotal</span><span className="font-mono text-sm text-white">£{subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="font-body text-sm text-white/52">Taxes & Fees</span><span className="font-mono text-sm text-white">£{taxes}</span></div>
                                {extrasTotal > 0 && <div className="flex justify-between"><span className="font-body text-sm text-white/52">Extras</span><span className="font-mono text-sm text-white">£{extrasTotal}</span></div>}
                            </div>
                            <div className="h-px bg-white/18" />
                            <div className="flex justify-between"><span className="font-body text-sm font-medium text-white">Total</span><span className="font-mono text-xl text-gold-light">£{total.toLocaleString()}</span></div>
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder="Promo code" value={formData.promoCode} onChange={(e) => updateField('promoCode', e.target.value)} className="flex-1 glass-micro rounded-full h-9 px-4 font-body text-xs text-white outline-none placeholder-white/25" />
                                <button className="glass-pill rounded-full h-9 px-4 font-body text-[10px] uppercase tracking-wider text-white/75 hover:-translate-y-0.5 pill-transition">Apply</button>
                            </div>
                            <p className="font-body text-[10px] text-white/35 text-center">Free cancellation before Mar 7, 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
