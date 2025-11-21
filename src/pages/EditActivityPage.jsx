
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { api } from "../api/client.js";
import toast from "react-hot-toast";

function EditActivityPageInner() {
  const { id, activityId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    currency: "EUR",
    date: "",
    isCompleted: false,
    rating: "",
    comment: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await api.get(`/api/activities/${activityId}`);
        const a = res.data;

        setForm({
          name: a.name ?? "",
          location: a.location ?? "",
          price: a.price ?? "",
          currency: a.currency ?? "EUR",
          date: a.date ? a.date.substring(0, 10) : "",
          isCompleted: a.isCompleted ?? false,
          rating: a.rating ?? "",
          comment: a.comment ?? "",
        });
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to load activity");
        navigate(`/app/trips/${id}`);
      } finally {
        setLoading(false);
      }
    };

    if (activityId) {
      fetchActivity();
    } else {
      toast.error("Invalid activity id");
      navigate("/app/trips");
    }
  }, [id, activityId, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/activities/${activityId}`, {
        ...form,
        price: form.price ? Number(form.price) : undefined,
        rating: form.rating ? Number(form.rating) : undefined,
      });
      toast.success("Activity updated");
      navigate(`/app/trips/${id}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-100">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-semibold mb-6 text-slate-50">
          Edit activity
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-200">
                Currency
              </label>
              <input
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              name="isCompleted"
              checked={form.isCompleted}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-600 bg-slate-900 accent-sky-500"
            />
            <label className="text-slate-200 text-sm">
              Completed
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={form.rating}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Comment
            </label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2.5 bg-slate-900 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(`/app/trips/${id}`)}
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

const EditActivityPage = () => (
  <ProtectedRoute>
    <EditActivityPageInner />
  </ProtectedRoute>
);

export default EditActivityPage;
