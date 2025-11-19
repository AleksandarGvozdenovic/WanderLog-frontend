import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";

const features = [
  {
    title: "Trips at a glance",
    desc: "See all your upcoming and past journeys on one clean dashboard."
  },
  {
    title: "Activities & prices",
    desc: "Plan what to do, how much it costs and mark what you actually did."
  },
  {
    title: "Private by design",
    desc: "Your trips are tied to your account only – no social network noise."
  }
];

const LandingPage = () => {
  return (
    <Layout>
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-semibold tracking-wide text-sky-500 uppercase mb-3">
            Personal travel planner
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Plan your trips,{" "}
            <span className="text-sky-600">remember every moment</span>.
          </h1>
          <p className="text-sm md:text-base text-slate-600 mb-6 max-w-md">
            WanderLog helps you plan your itineraries, activities and budgets in
            one simple app. Perfect for students and devs building their first
            full-stack project.
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
                className="bg-white/80 border border-slate-100 rounded-2xl p-3"
              >
                <p className="font-semibold text-slate-800 mb-1">{f.title}</p>
                <p className="text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-sky-200/60 via-white to-emerald-100/80 rounded-3xl blur-2xl" />
          <div className="relative bg-white border border-slate-100 rounded-3xl p-4 shadow-soft">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs font-medium text-slate-700">
                  Upcoming trips
                </p>
                <p className="text-[11px] text-slate-400">
                  Example of your dashboard
                </p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                Demo UI
              </span>
            </div>
            <div className="space-y-3">
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3">
                <p className="text-xs font-semibold text-slate-800">
                  Summer in Barcelona
                </p>
                <p className="text-[11px] text-slate-500">
                  Barcelona, Spain • Jul 10 – Jul 18
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                <p className="text-xs font-semibold text-slate-800">
                  Weekend in Paris
                </p>
                <p className="text-[11px] text-slate-500">
                  Paris, France • May 3 – May 5
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3">
                <p className="text-xs font-semibold text-slate-800">
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
