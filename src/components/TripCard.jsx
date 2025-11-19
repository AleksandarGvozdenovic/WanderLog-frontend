import { Link } from "react-router-dom";

const TripCard = ({ trip, onDelete }) => {
  const start = trip.startDate ? trip.startDate.slice(0, 10) : null;
  const end = trip.endDate ? trip.endDate.slice(0, 10) : null;

  return (
    <div className="bg-white/90 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-sky-500 mb-1">
          {start ? "Planned trip" : "Draft"}
        </p>
        <h2 className="font-semibold text-lg mb-1">{trip.title}</h2>
        <p className="text-sm text-slate-600">{trip.destination}</p>
        {(start || end) && (
          <p className="text-xs text-slate-400 mt-1">
            {start} – {end}
          </p>
        )}
        {trip.budget && (
          <p className="text-xs text-slate-500 mt-1">
            Budget: <span className="font-medium">{trip.budget}</span>
          </p>
        )}
      </div>
      <div className="flex justify-between items-center mt-3">
        <Link
          to={`/app/trips/${trip._id}`}
          className="text-xs text-sky-600 hover:underline"
        >
          View details
        </Link>
        <button
          onClick={() => onDelete(trip._id)}
          className="text-xs text-rose-500 border border-rose-200 px-2 py-1 rounded-full hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TripCard;
