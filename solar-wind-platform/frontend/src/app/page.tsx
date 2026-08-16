import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-8 py-6 flex items-center justify-between border-b border-terrain-100">
        <span className="font-display text-lg tracking-tight text-terrain-800">
          Solar &amp; Wind Deployment Intelligence
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md text-terrain-800 text-sm font-medium hover:bg-terrain-50 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-md bg-terrain-800 text-terrain-50 text-sm font-medium hover:bg-terrain-900 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>

      <section className="flex-1 grid md:grid-cols-2 gap-10 px-8 py-16 max-w-6xl mx-auto items-center">
        <div>
          <p className="uppercase tracking-widest text-xs text-sun-600 font-semibold mb-4">
            Site intelligence for renewable deployment
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-terrain-900 leading-tight mb-6">
            Find the ground that earns its keep.
          </h1>
          <p className="text-terrain-800/80 text-lg mb-8 max-w-md">
            Score sites on irradiance, wind resource, terrain, and grid
            proximity — then rank them from Excellent to Unsuitable before
            you commit capital.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="inline-block px-6 py-3 rounded-md bg-sun-600 text-white font-medium hover:bg-sun-400 transition-colors"
            >
              Get started free
            </Link>
            <Link
              href="/login"
              className="inline-block px-6 py-3 rounded-md text-terrain-800 font-medium hover:bg-terrain-50 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-terrain-100 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-terrain-600 mb-4">
            Deployment suitability score
          </p>
          <ScoreRow label="Renewable resource availability" value={35} color="bg-sun-400" />
          <ScoreRow label="Geographic suitability" value={25} color="bg-terrain-400" />
          <ScoreRow label="Infrastructure accessibility" value={15} color="bg-sky-400" />
          <ScoreRow label="Environmental impact" value={15} color="bg-terrain-600" />
          <ScoreRow label="Economic feasibility" value={10} color="bg-sun-600" />
        </div>
      </section>
    </main>
  );
}

function ScoreRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-terrain-800">{label}</span>
        <span className="text-terrain-600 font-medium">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-terrain-50 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}