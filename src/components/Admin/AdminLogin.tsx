import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Mail, AlertCircle, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ADMIN_IMAGE = '/assets/images/mushahid_admin_profile.jpg';

interface AdminLoginProps {
  onLoginSuccess?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('Mushahid Hussain');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password.trim()) {
      setErrorMsg('Pehle password enter karein! Password ke baghair admin panel show nahi hoga.');
      return;
    }

    setLoading(true);

    try {
      const payload = { username: username.trim(), email: username.trim(), password: password.trim() };
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success) {
        const token = data.token || `adm_${Date.now()}`;
        sessionStorage.setItem('admin_token', token);
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify(data.user || { name: 'Mushahid Hussain', username: 'Mushahid Hussain' }));
        
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/admin');
        }
        return;
      }

      // Fallback local verification
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      const userOk =
        cleanUser.includes('mushahid') ||
        cleanUser === 'admin' ||
        cleanUser === 'mushahid hussain' ||
        cleanUser === 'mushahidrafiqe744@gmail.com';

      const passOk =
        cleanPass === 'Mushahid6611@' ||
        cleanPass.toLowerCase() === 'mushahid6611@' ||
        cleanPass === '7860';

      if (userOk && passOk) {
        const token = `adm_verified_${Date.now()}`;
        sessionStorage.setItem('admin_token', token);
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify({ name: 'Mushahid Hussain', role: 'Administrator' }));
        
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/admin');
        }
      } else {
        setErrorMsg('Ghalat password ya username! Sahih password enter karein.');
      }
    } catch (err) {
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      const userOk = cleanUser.includes('mushahid') || cleanUser === 'admin';
      const passOk = cleanPass === 'Mushahid6611@' || cleanPass.toLowerCase() === 'mushahid6611@' || cleanPass === '7860';

      if (userOk && passOk) {
        const token = `adm_offline_${Date.now()}`;
        sessionStorage.setItem('admin_token', token);
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_user', JSON.stringify({ name: 'Mushahid Hussain', role: 'Administrator' }));
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/admin');
        }
      } else {
        setErrorMsg('Ghalat password! Access denied. Sahih password enter karein.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-radial from-[#F8FAF9] to-[#E8F2EC] p-4">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleLogin}
          className="p-8 sm:p-9 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Top lock badge indicator */}
          <div className="w-full flex items-center justify-between mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0A3D22] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Lock className="w-3 h-3 text-amber-600" />
              <span>Protected Admin</span>
            </div>
          </div>

          <div className="relative mb-3">
            <img
              src={ADMIN_IMAGE}
              alt="Mushahid Hussain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = ADMIN_IMAGE;
              }}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#50E364] shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0A3D22] border-2 border-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#50E364]" />
            </div>
          </div>

          <h2 className="text-xl font-black text-[#0A3D22] mb-0.5">Admin Security Lock</h2>
          <p className="text-xs text-gray-600 font-medium mb-4">
            Admin panel open karne ke liye password enter karein
          </p>

          {errorMsg && (
            <div className="w-full mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="w-full space-y-3.5 mb-5 text-left">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Mushahid Hussain"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-semibold text-gray-900 focus:outline-hidden focus:border-[#0A3D22] focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  Admin Password <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-gray-400 font-medium">Required to view</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Password enter karein..."
                  autoFocus
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#0A3D22]/20 focus:border-[#0A3D22] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A3D22] hover:bg-[#114D2C] text-[#50E364] p-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:scale-[1.01]"
          >
            <Mail className="w-4 h-4" />
            <span>{loading ? 'Verifying Password...' : 'Unlock & Open Admin'}</span>
            <ArrowRight className="w-4 h-4 text-[#50E364]" />
          </button>
        </form>
      </div>
    </div>
  );
};
