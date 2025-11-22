
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { api } from "../api/client.js";
import toast from "react-hot-toast";

function EditTripPageInner() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/api/trips/${id}`);
        const trip = res.data;

        setForm({
          title: trip.title || "",
          destination: trip.destination || "",
          startDate: trip.startDate ? trip.startDate.substring(0, 10) : "",
          endDate: trip.endDate ? trip.endDate.substring(0, 10) : "",
          budget: trip.budget ?? "",
        });
      } catch (err) {
        toast.error("Failed to load trip");
        navigate("/app/trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/trips/${id}`, {
        ...form,
        budget: form.budget ? Number(form.budget) : undefined,
      });
      toast.success("Trip updated");
      navigate("/app/trips");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-100">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-semibold mb-6 text-slate-50">
          Edit trip
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Destination
            </label>
            <input
              name="destination"
              value={form.destination}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">
                Start date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">
                End date
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Budget
            </label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/app/trips")}
              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-400 transition-colors"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const EditTripPage = () => (
  <ProtectedRoute>
    <EditTripPageInner />
  </ProtectedRoute>
);

export default EditTripPage;
