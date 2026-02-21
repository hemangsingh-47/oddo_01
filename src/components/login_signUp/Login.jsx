import { useAuth } from '../../context/AuthContext'
import { Ship, ArrowRight } from 'lucide-react'

function Login() {
    const { ROLES, login } = useAuth()

    const handleRoleSelect = (roleId) => {
        try {
            login(roleId)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <div className="flex-1 grid lg:grid-cols-2">

                {/* Left Side: Maritime Branding */}
                <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop')` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-primary-900/40 backdrop-blur-[2px]"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-2xl border border-white/20">
                            <Ship className="w-9 h-9 text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-4 leading-tight text-white">
                            FleetFlow <br /> Control Center
                        </h1>
                        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-sm font-medium">
                            Operational access gateway for intelligent maritime surveillance and logistics.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 max-w-md shadow-2xl">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Notice</p>
                            <p className="text-sm font-medium text-slate-200 leading-relaxed">
                                Select your specialized terminal below to initialize high-fidelity operational monitoring. No credentials required for current session.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Role Selection Area */}
                <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 lg:p-16 bg-white">
                    <div className="max-w-md mx-auto w-full py-6 lg:py-12">
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="mb-8">
                                <div className="lg:hidden w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-600/20">
                                    <Ship className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tighter uppercase">Initialize Terminal</h2>
                                <p className="text-slate-500 text-[10px] sm:text-sm font-bold uppercase tracking-widest">Select Operational Perspective</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {Object.values(ROLES).map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => handleRoleSelect(role.id)}
                                        className="group relative p-6 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary-500 hover:ring-4 hover:ring-primary-500/5 text-left transition-all duration-300 cursor-pointer overflow-hidden"
                                    >
                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110">
                                                {role.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black text-sm sm:text-base text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{role.label}</p>
                                                <p className="text-[10px] sm:text-xs text-slate-500 mt-1 font-medium leading-relaxed">{role.description}</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                                <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                                    Powered by FleetFlow Intelligent Systems
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
