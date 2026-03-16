export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20 py-10 text-center text-sm text-gray-500">
      <p className="font-medium text-gray-400">
        © {new Date().getFullYear()} DevPulse
      </p>
      <p className="mt-1">
        A creation by{" "}
        <span className="text-indigo-400 font-medium">Hall of Codes</span>
      </p>
      <p className="mt-1 text-gray-600">
        Open source on{" "}
        <a
          href="https://github.com/hallofcodes/devpulse"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-400 underline-offset-4 hover:underline transition"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
