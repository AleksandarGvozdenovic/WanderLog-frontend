import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";

const features = [
  {
    title: "Trips at a glance",
    desc: "See all your upcoming and past journeys on one clean dashboard.",
  },
  {
    title: "Activities & prices",
    desc: "Plan what to do, how much it costs and mark what you actually did.",
  },
  {
    title: "Private by design",
    desc: "Your trips are tied to your account only – no social network noise.",
  },
];

const LandingPage = () => {
  return (
    <Layout>
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center">
       
        <div>
          <p className="text-[11px] uppercase tracking-wide text-sky-500 mb-3">
            Personal travel planner
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Plan your trips,{" "}
            <span className="text-sky-600">remember every moment</span>.
          </h1>

          <p className="text-sm md:text-base text-slate-600 mb-6 max-w-md">
            WanderLog helps you keep your trips, activities and budgets in one
            simple app. Start planning your next adventure today!
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-full bg-sky-500 text-white text-sm font-medium shadow-soft hover:bg-sky-600"
            >
              Start planning
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              I already have an account
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-slate-100 rounded-2xl p-3 shadow-soft"
              >
                <h3 className="font-semibold text-slate-800 mb-1">
                  {f.title}
                </h3>
                <p className="text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desna strana – demo UI / kartice */}
        <div className="relative">
          <div className="absolute -top-4 -right-2 h-20 w-20 rounded-full bg-sky-100 blur-3xl" />
          <div className="absolute -bottom-6 -left-4 h-24 w-24 rounded-full bg-emerald-100 blur-3xl" />

          <div className="relative bg-white border border-slate-100 rounded-3xl p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Example of your dashboard
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Upcoming trips
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                Demo UI
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-white border border-slate-100 rounded-2xl p-3">
                <p className="font-semibold text-slate-800">
                  Summer in Barcelona
                </p>
                <p className="text-[11px] text-slate-500">
                  Barcelona, Spain • Jul 10 – Jul 18
                </p>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-3">
                <p className="font-semibold text-slate-800">
                  Weekend in Paris
                </p>
                <p className="text-[11px] text-slate-500">
                  Paris, France • May 3 – May 5
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                <p className="font-semibold text-slate-800">
                  Ski trip with friends
                </p>
                <p className="text-[11px] text-slate-500">
                  Kopaonik • Jan 15 – Jan 19
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
