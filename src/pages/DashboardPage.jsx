import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { api } from "../api/client.js";
import TripCard from "../components/TripCard.jsx";
import toast from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const DashboardPageInner = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: ""
  });

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/trips");
      setTrips(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/trips", {
        ...form,
        budget: form.budget ? Number(form.budget) : undefined
      });
      toast.success("Trip created");
      setForm({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        budget: ""
      });
      fetchTrips();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create trip");
    }
  };

  const handleDeleteTrip = async (id) => {
    try {
      await api.delete(`/api/trips/${id}`);
      setTrips((prev) => prev.filter((t) => t._id !== id));
      toast.success("Trip deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete trip");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-sky-500 mb-1">
            Dashboard
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">Your trips</h1>
          <p className="text-sm text-slate-600 mt-1">
            Create trips and keep all activities in one place.
          </p>
        </div>
      </div>

      {/* Add trip form */}
      <div className="bg-white/90 border border-slate-100 rounded-2xl p-4 mb-6 shadow-soft">
        <h2 className="text-sm font-semibold text-slate-800 mb-3">
          Add a new trip
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-5 gap-3"
        >
          <input
            name="title"
            placeholder="Trip title"
            value={form.title}
            onChange={handleChange}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
          <input
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={form.budget}
            onChange={handleChange}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
          <div className="md:col-span-5 flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-sm font-medium text-white">
              Save trip
            </button>
          </div>
        </form>
      </div>

      {/* Trips grid */}
      {loading ? (
        <p className="text-sm text-slate-500">Loading trips...</p>
      ) : trips.length === 0 ? (
        <p className="text-sm text-slate-500">
          You don't have any trips yet. Create your first one above.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} onDelete={handleDeleteTrip} />
          ))}
        </div>
      )}
    </Layout>
  );
};

const DashboardPage = () => (
  <ProtectedRoute>
    <DashboardPageInner />
  </ProtectedRoute>
);

export default DashboardPage;
