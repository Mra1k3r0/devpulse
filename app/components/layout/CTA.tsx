import Link from "next/link";

export default function CTA() {
  return (
    <section className="max-w-4xl mx-auto px-6 pb-8 text-center">
      <div className="glass-card p-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4 gradient-text">
          Ready to track your coding productivity?
        </h2>
        <p className="text-gray-400 mb-8">
          Join developers and teams competing on DevPulse.
        </p>
        <Link href="/signup" className="btn-primary inline-block px-8 py-4">
          Create Free Account
        </Link>
      </div>
    </section>
  );
}
