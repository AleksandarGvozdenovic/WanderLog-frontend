import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/app/trips");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-white/90 border border-slate-100 rounded-2xl p-6 shadow-soft">
          <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-6">
            Log in to see and update your trips.
          </p>

          {error && (
            <div className="mb-4 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className="w-full mt-2 bg-sky-500 hover:bg-sky-600 rounded-lg py-2 text-sm font-medium text-white transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-sky-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;