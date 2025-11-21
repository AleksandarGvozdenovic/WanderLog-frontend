
import { Link } from "react-router-dom";

const TripCard = ({ trip, onDelete }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {trip.title}
          </h3>
          <p className="text-sm text-slate-500">{trip.destination}</p>
        </div>

        {trip.budget != null && (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            Budget: {trip.budget}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-500">
        {trip.startDate?.substring(0, 10)} → {trip.endDate?.substring(0, 10)}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4 text-xs">

          
          <Link
            to={`/app/trips/${trip._id}`}
            className="text-sky-500 hover:text-sky-600 font-medium"
          >
            View
          </Link>

         
          <Link
            to={`/app/trips/${trip._id}/edit`}
            className="text-amber-500 hover:text-amber-600 font-medium"
          >
            Edit
          </Link>
        </div>

        <button
          onClick={() => onDelete(trip._id)}
          className="text-xs text-red-500 hover:text-red-600 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TripCard;
