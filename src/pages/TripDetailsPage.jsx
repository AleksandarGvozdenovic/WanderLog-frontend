import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { api } from "../api/client.js";
import toast from "react-hot-toast";

const TripDetailsInner = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activityForm, setActivityForm] = useState({
    name: "",
    location: "",
    price: "",
    currency: "EUR",
    date: "",
    isCompleted: false,
    rating: "",
    comment: ""
  });

  const fetchTripAndActivities = async () => {
    setLoading(true);
    try {
      const [tripRes, actRes] = await Promise.all([
        api.get(`/api/trips/${id}`),
        api.get(`/api/activities/trip/${id}`)
      ]);
      setTrip(tripRes.data);
      setActivities(actRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load trip");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTripAndActivities();
  }, [id]);

  const handleActivityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivityForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/activities/trip/${id}`, {
        ...activityForm,
        price: activityForm.price ? Number(activityForm.price) : undefined,
        rating: activityForm.rating ? Number(activityForm.rating) : undefined
      });
      toast.success("Activity added");
      setActivityForm({
        name: "",
        location: "",
        price: "",
        currency: "EUR",
        date: "",
        isCompleted: false,
        rating: "",
        comment: ""
      });
      fetchTripAndActivities();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add activity");
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      await api.delete(`/api/activities/${activityId}`);
      setActivities((prev) => prev.filter((a) => a._id !== activityId));
      toast.success("Activity deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete activity");
    }
  };

  const handleToggleComplete = async (activity) => {
    try {
      const updated = { ...activity, isCompleted: !activity.isCompleted };
      await api.put(`/api/activities/${activity._id}`, {
        isCompleted: updated.isCompleted
      });
      setActivities((prev) =>
        prev.map((a) => (a._id === activity._id ? updated : a))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update activity");
    }
  };

  const handleDeleteTrip = async () => {
    try {
      await api.delete(`/api/trips/${id}`);
      toast.success("Trip deleted");
      navigate("/app/trips");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete trip");
    }
  };

  if (loading) {
    return (
      <Layout>
        <p className="text-sm text-slate-500">Loading trip...</p>
      </Layout>
    );
  }

  if (!trip) {
    return (
      <Layout>
        <p className="text-sm text-slate-500">Trip not found.</p>
      </Layout>
    );
  }

  const totalCost = activities.reduce((sum, a) => sum + (a.price || 0), 0);

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-sky-500 mb-1">
            Trip details
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">{trip.title}</h1>
          <p className="text-sm text-slate-600 mt-1">{trip.destination}</p>
          <p className="text-xs text-slate-500 mt-1">
            {trip.startDate?.slice(0, 10)} – {trip.endDate?.slice(0, 10)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Budget: {trip.budget || "–"} • Spent: {totalCost}
          </p>
        </div>
        <button
          onClick={handleDeleteTrip}
          className="self-start px-3 py-1.5 rounded-full border border-rose-200 text-rose-600 text-xs hover:bg-rose-50"
        >
          Delete trip
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activities list */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white/90 border border-slate-100 rounded-2xl p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-slate-800">
                Activities
              </h2>
              <span className="text-xs text-slate-500">
                {activities.length} item(s)
              </span>
            </div>

            {activities.length === 0 ? (
              <p className="text-sm text-slate-500">
                No activities yet. Add your first one on the right.
              </p>
            ) : (
              <div className="space-y-2">
                {activities.map((a) => (
                  <div
                    key={a._id}
                    className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm text-slate-800">
                          {a.name}
                        </h3>
                        {a.isCompleted && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                            done
                          </span>
                        )}
                      </div>
                      {a.location && (
                        <p className="text-xs text-slate-500">{a.location}</p>
                      )}
                      <p className="text-xs text-slate-400 mt-1">
                        {a.date?.slice(0, 10)}
                      </p>
                      {(a.price || a.rating || a.comment) && (
                        <p className="text-xs text-slate-500 mt-1">
                          {a.price && (
                            <>
                              Price: {a.price} {a.currency || "EUR"} •{" "}
                            </>
                          )}
                          {a.rating && <>Rating: {a.rating}/5 • </>}
                          {a.comment && <>{a.comment}</>}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => handleToggleComplete(a)}
                        className="text-[11px] text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full hover:bg-emerald-50"
                      >
                        {a.isCompleted ? "Mark planned" : "Mark done"}
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(a._id)}
                        className="text-[11px] text-rose-600 border border-rose-200 px-2 py-1 rounded-full hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add activity form */}
        <div className="space-y-4">
          <div className="bg-white/90 border border-slate-100 rounded-2xl p-4 shadow-soft">
            <h2 className="text-base font-semibold text-slate-800 mb-3">
              Add activity
            </h2>
            <form onSubmit={handleAddActivity} className="space-y-2">
              <input
                name="name"
                placeholder="Activity name"
                value={activityForm.name}
                onChange={handleActivityChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
              />
              <input
                name="location"
                placeholder="Location"
                value={activityForm.location}
                onChange={handleActivityChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={activityForm.price}
                  onChange={handleActivityChange}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  name="currency"
                  placeholder="Currency"
                  value={activityForm.currency}
                  onChange={handleActivityChange}
                  className="w-24 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <input
                type="date"
                name="date"
                value={activityForm.date}
                onChange={handleActivityChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
              />
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <input
                  type="checkbox"
                  name="isCompleted"
                  checked={activityForm.isCompleted}
                  onChange={handleActivityChange}
                />
                <span>Mark as done</span>
              </div>
              <input
                type="number"
                name="rating"
                placeholder="Rating (1–5)"
                value={activityForm.rating}
                onChange={handleActivityChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
              />
              <textarea
                name="comment"
                placeholder="Comment"
                value={activityForm.comment}
                onChange={handleActivityChange}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm min-h-[60px]"
              />
              <button className="w-full mt-1 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-sm font-medium text-white">
                Add activity
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const TripDetailsPage = () => (
  <ProtectedRoute>
    <TripDetailsInner />
  </ProtectedRoute>
);

export default TripDetailsPage;