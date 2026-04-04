import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import api from "../../Services/api";

const Login = () => {
  // --- EXISTING LOGIC (Unchanged) ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // Save token
      localStorage.setItem("adminToken", res.data.token);

      // Redirect to dashboard ✅
      navigate("/admin/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // --- NEW PROFESSIONAL UI ---
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B1C33] relative overflow-hidden font-sans">
      
      {/* Background Decor (Subtle Grid) */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}
      ></div>

      {/* Main Card Container */}
      <div className="w-full max-w-[420px] mx-4 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-[#DC2626] rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-900/20">
                {/* Simple Logo Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224c0-.131.067-.248.182-.311a54.614 54.614 0 0 1 4.02-1.947a.75.75 0 0 1 .697 1.325 53.111 53.111 0 0 0-3.398 1.626v3.18c0 .363-.169.698-.456.908a3.497 3.497 0 0 0 1.764.782a.75.75 0 0 1 .6 1.137A5.97 5.97 0 0 1 6.75 21a5.974 5.974 0 0 1-4.26-1.79.75.75 0 0 1 .6-1.138 3.496 3.496 0 0 0 1.763-.78c-.287-.211-.456-.547-.456-.91v-3.18c-1.393-.578-2.618-1.233-3.649-1.928a.75.75 0 0 1 .232-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                </svg>
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Marque<span className="text-[#DC2626]">Carrer</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Administrative Access Portal</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              Welcome Back
            </h2>

            {/* Error Message */}
            {error && (
              <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-100 p-3 rounded-lg text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0B1C33] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@collegedekho.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:border-[#0B1C33] focus:ring-4 focus:ring-[#0B1C33]/5 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-xs font-bold text-[#DC2626] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0B1C33] transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:border-[#0B1C33] focus:ring-4 focus:ring-[#0B1C33]/5 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Secure Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>
          
          {/* Footer Strip */}
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium">
              &copy; 2026 CollegeDekho. Authorized personnel only.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;