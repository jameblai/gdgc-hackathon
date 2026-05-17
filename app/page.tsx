import Link from "next/link";
// import shadcn libarries

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <style>{`

        @keyframes floatUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
        .card { animation: floatUp 0.5s ease both; }
        .card-1 { animation-delay: 0.1s; }
        .card-2 { animation-delay: 0.2s; }
        .card-3 { animation-delay: 0.3s; }
        .card-4 { animation-delay: 0.4s; }
        .card-5 { animation-delay: 0.5s; }
        .card-6 { animation-delay: 0.6s; }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
        .sparkle-2 { animation-delay: 0.4s; }
        .sparkle-3 { animation-delay: 0.8s; }
        .sparkle-4 { animation-delay: 1.2s; }

        .btn-claims:hover  { background: #6d28d9; }
        .btn-listings:hover { background: #1d4ed8; }
        .btn-contact:hover  { background: #166534; }
        .btn-property:hover { background: #b45309; }
        .btn-skills:hover   { background: #0f766e; }
        .btn-challenge:hover { background: #991b1b; }
      `}</style>

      {/* ── Outer card ── */}
      <div className="w-full max-w-5xl rounded-3xl bg-white px-10 py-14 shadow-lg">
        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-black tracking-tight text-gray-900">
            How can we help you?
          </h1>
        </div>

        {/* ── Cards grid ── */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* ── Claims card ── */}
          <div className="card card-1 group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Blob bg */}
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-16 translate-y-16 rounded-full bg-purple-100 opacity-60 transition-opacity group-hover:opacity-80" />

            <div className="relative flex flex-1 flex-col items-center px-7 pt-10 pb-8">
              {/* Icon circle */}
              <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-purple-50 transition-colors group-hover:bg-purple-100">
                {/* Sparkles */}
                <svg
                  viewBox="0 0 8 8"
                  fill="#a78bfa"
                  className="sparkle absolute top-4 left-5 h-3 w-3"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#a78bfa"
                  className="sparkle sparkle-2 absolute top-6 right-5 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#c4b5fd"
                  className="sparkle sparkle-3 absolute bottom-5 left-7 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>

                {/* Clipboard + Shield SVG */}
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="h-20 w-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Clipboard body */}
                  <rect
                    x="16"
                    y="14"
                    width="40"
                    height="50"
                    rx="4"
                    fill="#ede9fe"
                    stroke="#7c3aed"
                    strokeWidth="2.5"
                  />
                  {/* Clip top */}
                  <rect
                    x="30"
                    y="10"
                    width="20"
                    height="10"
                    rx="3"
                    fill="#7c3aed"
                  />
                  {/* Lines */}
                  <rect
                    x="24"
                    y="30"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.5"
                  />
                  <rect
                    x="37"
                    y="30"
                    width="12"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.5"
                  />
                  <rect
                    x="24"
                    y="39"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.5"
                  />
                  <rect
                    x="37"
                    y="39"
                    width="12"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.5"
                  />
                  <rect
                    x="24"
                    y="48"
                    width="10"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.5"
                  />
                  <rect
                    x="37"
                    y="48"
                    width="12"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.5"
                  />
                  {/* Checkboxes */}
                  <rect
                    x="23"
                    y="29"
                    width="7"
                    height="7"
                    rx="1.5"
                    stroke="#7c3aed"
                    strokeWidth="1.5"
                    fill="white"
                  />
                  <rect
                    x="23"
                    y="38"
                    width="7"
                    height="7"
                    rx="1.5"
                    stroke="#7c3aed"
                    strokeWidth="1.5"
                    fill="white"
                  />
                  <rect
                    x="23"
                    y="47"
                    width="7"
                    height="7"
                    rx="1.5"
                    stroke="#7c3aed"
                    strokeWidth="1.5"
                    fill="white"
                  />
                  {/* Shield */}
                  <path
                    d="M48 50 C48 50 38 56 38 63 C38 68 42 72 48 72 C54 72 58 68 58 63 C58 56 48 50 48 50Z"
                    fill="#7c3aed"
                  />
                  {/* Check on shield */}
                  <path
                    d="M43 63 l3 3 6-6"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-purple-700">
                Claims
              </h2>
              <p className="mb-8 flex-1 text-center text-sm leading-relaxed text-gray-500">
                Verify your qualifications and belongings with our claims
                section. Remember to verify the claims of those close to you.
              </p>

              <Link
                className="btn-claims flex w-full items-center justify-center gap-3 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200"
                href="/claims"
              >
                Claims
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h9.586L11.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Listings card ── */}
          <div className="card card-2 group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute right-0 bottom-0 h-48 w-48 translate-x-16 translate-y-16 rounded-full bg-blue-100 opacity-60 transition-opacity group-hover:opacity-80" />

            <div className="relative flex flex-1 flex-col items-center px-7 pt-10 pb-8">
              <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-blue-50 transition-colors group-hover:bg-blue-100">
                <svg
                  viewBox="0 0 8 8"
                  fill="#60a5fa"
                  className="sparkle absolute top-4 right-6 h-3 w-3"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#93c5fd"
                  className="sparkle sparkle-2 absolute bottom-6 left-5 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#60a5fa"
                  className="sparkle sparkle-4 absolute top-7 left-4 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>

                {/* Shop / storefront SVG */}
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="h-20 w-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Building */}
                  <rect
                    x="16"
                    y="36"
                    width="36"
                    height="28"
                    rx="2"
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  {/* Door */}
                  <rect
                    x="28"
                    y="48"
                    width="12"
                    height="16"
                    rx="2"
                    fill="#2563eb"
                  />
                  {/* Window */}
                  <rect
                    x="19"
                    y="42"
                    width="9"
                    height="8"
                    rx="1"
                    fill="white"
                    stroke="#93c5fd"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="40"
                    y="42"
                    width="9"
                    height="8"
                    rx="1"
                    fill="white"
                    stroke="#93c5fd"
                    strokeWidth="1.5"
                  />
                  {/* Awning stripes */}
                  <path d="M13 36 Q20 28 27 36" fill="#2563eb" />
                  <path d="M20 36 Q27 28 34 36" fill="white" />
                  <path d="M27 36 Q34 28 41 36" fill="#2563eb" />
                  <path d="M34 36 Q41 28 48 36" fill="white" />
                  <path d="M41 36 Q48 28 55 36" fill="#2563eb" />
                  <line
                    x1="13"
                    y1="36"
                    x2="55"
                    y2="36"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  {/* Sign board top */}
                  <rect
                    x="13"
                    y="33"
                    width="42"
                    height="5"
                    rx="1"
                    fill="#bfdbfe"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                  />
                  {/* Bag */}
                  <rect
                    x="50"
                    y="46"
                    width="16"
                    height="18"
                    rx="3"
                    fill="#dbeafe"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M54 46 Q54 40 58 40 Q62 40 62 46"
                    stroke="#2563eb"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-blue-600">
                Listings
              </h2>
              <p className="mb-8 flex-1 text-center text-sm leading-relaxed text-gray-500">
                Buy and sell services and offers with our listings page.
              </p>

              <Link
                className="btn-listings flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200"
                href="/listings"
              >
                Browse Listings
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h9.586L11.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Contact card ── */}
          <div className="card card-3 group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-16 translate-y-16 rounded-full bg-green-100 opacity-60 transition-opacity group-hover:opacity-80" />

            <div className="relative flex flex-1 flex-col items-center px-7 pt-10 pb-8">
              <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-green-50 transition-colors group-hover:bg-green-100">
                <svg
                  viewBox="0 0 8 8"
                  fill="#4ade80"
                  className="sparkle absolute top-5 right-5 h-3 w-3"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#86efac"
                  className="sparkle sparkle-3 absolute right-6 bottom-6 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#4ade80"
                  className="sparkle sparkle-4 absolute top-6 left-5 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>

                {/* Chat bubbles SVG */}
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="h-20 w-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Back bubble */}
                  <rect
                    x="10"
                    y="12"
                    width="46"
                    height="34"
                    rx="8"
                    fill="#dcfce7"
                    stroke="#16a34a"
                    strokeWidth="2"
                  />
                  {/* Lines in back bubble */}
                  <rect
                    x="18"
                    y="22"
                    width="24"
                    height="3"
                    rx="1.5"
                    fill="#16a34a"
                    opacity="0.4"
                  />
                  <rect
                    x="18"
                    y="30"
                    width="16"
                    height="3"
                    rx="1.5"
                    fill="#16a34a"
                    opacity="0.4"
                  />
                  {/* Back bubble tail */}
                  <path
                    d="M22 46 L16 54 L32 46Z"
                    fill="#dcfce7"
                    stroke="#16a34a"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Front bubble with heart */}
                  <rect
                    x="30"
                    y="34"
                    width="38"
                    height="30"
                    rx="8"
                    fill="#16a34a"
                  />
                  {/* Heart inside */}
                  <path
                    d="M49 44 C49 44 44 40 44 45.5 C44 49 47 51 49 53 C51 51 54 49 54 45.5 C54 40 49 44 49 44Z"
                    fill="white"
                  />
                  {/* Front bubble tail */}
                  <path d="M58 64 L64 72 L50 64Z" fill="#16a34a" />
                </svg>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-green-700">
                Contact
              </h2>
              <p className="mb-8 flex-1 text-center text-sm leading-relaxed text-gray-500">
                Socialise and have fun with your loved ones, with our messaging
                system!
              </p>

              <Link
                className="btn-contact flex w-full items-center justify-center gap-3 rounded-xl bg-green-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200"
                href="/features/chats"
              >
                Message
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h9.586L11.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Property card ── */}
          <div className="card card-4 group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute right-0 bottom-0 h-48 w-48 translate-x-16 translate-y-16 rounded-full bg-amber-100 opacity-60 transition-opacity group-hover:opacity-80" />

            <div className="relative flex flex-1 flex-col items-center px-7 pt-10 pb-8">
              <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-amber-50 transition-colors group-hover:bg-amber-100">
                <svg
                  viewBox="0 0 8 8"
                  fill="#fbbf24"
                  className="sparkle absolute top-4 left-5 h-3 w-3"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#fcd34d"
                  className="sparkle sparkle-2 absolute top-6 right-5 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#fbbf24"
                  className="sparkle sparkle-3 absolute bottom-5 left-7 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>

                {/* House SVG */}
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="h-20 w-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* House body */}
                  <rect
                    x="16"
                    y="32"
                    width="48"
                    height="32"
                    rx="2"
                    fill="#fef3c7"
                    stroke="#d97706"
                    strokeWidth="2.5"
                  />
                  {/* Roof */}
                  <path
                    d="M8 32 L40 8 L72 32Z"
                    fill="#d97706"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  {/* Door */}
                  <rect
                    x="34"
                    y="48"
                    width="12"
                    height="16"
                    rx="1"
                    fill="#d97706"
                  />
                  {/* Door knob */}
                  <circle cx="43" cy="56" r="1.5" fill="white" />
                  {/* Window left */}
                  <rect
                    x="22"
                    y="40"
                    width="10"
                    height="10"
                    rx="1"
                    fill="white"
                    stroke="#d97706"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="27"
                    y1="40"
                    x2="27"
                    y2="50"
                    stroke="#d97706"
                    strokeWidth="1"
                  />
                  <line
                    x1="22"
                    y1="45"
                    x2="32"
                    y2="45"
                    stroke="#d97706"
                    strokeWidth="1"
                  />
                  {/* Window right */}
                  <rect
                    x="48"
                    y="40"
                    width="10"
                    height="10"
                    rx="1"
                    fill="white"
                    stroke="#d97706"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="53"
                    y1="40"
                    x2="53"
                    y2="50"
                    stroke="#d97706"
                    strokeWidth="1"
                  />
                  <line
                    x1="48"
                    y1="45"
                    x2="58"
                    y2="45"
                    stroke="#d97706"
                    strokeWidth="1"
                  />
                  {/* Chimney */}
                  <rect
                    x="52"
                    y="14"
                    width="8"
                    height="14"
                    rx="1"
                    fill="#d97706"
                  />
                </svg>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-amber-700">
                Property
              </h2>
              <p className="mb-8 flex-1 text-center text-sm leading-relaxed text-gray-500">
                Browse and manage property listings with our real estate tools.
              </p>

              <Link
                className="btn-property flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200"
                href="/property"
              >
                View Properties
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h9.586L11.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Skills card ── */}
          <div className="card card-5 group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute bottom-0 left-0 h-48 w-48 -translate-x-16 translate-y-16 rounded-full bg-teal-100 opacity-60 transition-opacity group-hover:opacity-80" />

            <div className="relative flex flex-1 flex-col items-center px-7 pt-10 pb-8">
              <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-teal-50 transition-colors group-hover:bg-teal-100">
                <svg
                  viewBox="0 0 8 8"
                  fill="#2dd4bf"
                  className="sparkle absolute top-5 right-5 h-3 w-3"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#5eead4"
                  className="sparkle sparkle-2 absolute right-6 bottom-6 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#2dd4bf"
                  className="sparkle sparkle-4 absolute top-6 left-5 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>

                {/* Star / badge SVG */}
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="h-20 w-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Star */}
                  <path
                    d="M40 6 L48 30 L74 30 L54 46 L62 70 L40 56 L18 70 L26 46 L6 30 L32 30Z"
                    fill="#ccfbf1"
                    stroke="#0d9488"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Check mark inside star */}
                  <path
                    d="M30 38 L38 46 L52 32"
                    stroke="#0d9488"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-teal-700">
                Skills
              </h2>
              <p className="mb-8 flex-1 text-center text-sm leading-relaxed text-gray-500">
                Verify and showcase your skills with our proof-based system.
              </p>

              <Link
                className="btn-skills flex w-full items-center justify-center gap-3 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200"
                href="/skills"
              >
                Prove Skills
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h9.586L11.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Challenge card ── */}
          <div className="card card-6 group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute right-0 bottom-0 h-48 w-48 translate-x-16 translate-y-16 rounded-full bg-red-100 opacity-60 transition-opacity group-hover:opacity-80" />

            <div className="relative flex flex-1 flex-col items-center px-7 pt-10 pb-8">
              <div className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-red-50 transition-colors group-hover:bg-red-100">
                <svg
                  viewBox="0 0 8 8"
                  fill="#f87171"
                  className="sparkle absolute top-4 left-5 h-3 w-3"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#fca5a5"
                  className="sparkle sparkle-2 absolute top-6 right-5 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>
                <svg
                  viewBox="0 0 8 8"
                  fill="#f87171"
                  className="sparkle sparkle-3 absolute bottom-5 left-7 h-2 w-2"
                >
                  <path d="M4 0l.5 3.5L8 4l-3.5.5L4 8l-.5-3.5L0 4l3.5-.5z" />
                </svg>

                {/* Target / Challenge SVG */}
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="h-20 w-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer ring */}
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="#fee2e2"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                  />
                  {/* Middle ring */}
                  <circle
                    cx="40"
                    cy="40"
                    r="18"
                    fill="white"
                    stroke="#dc2626"
                    strokeWidth="2"
                  />
                  {/* Inner bullseye */}
                  <circle
                    cx="40"
                    cy="40"
                    r="8"
                    fill="#dc2626"
                  />
                  {/* Arrow */}
                  <line
                    x1="58"
                    y1="22"
                    x2="46"
                    y2="34"
                    stroke="#991b1b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <polygon
                    points="58,22 52,24 54,28"
                    fill="#991b1b"
                  />
                </svg>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-red-700">
                Challenge
              </h2>
              <p className="mb-8 flex-1 text-center text-sm leading-relaxed text-gray-500">
                Assess and verify skills with our interactive challenge system.
              </p>

              <Link
                className="btn-challenge flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200"
                href="/challenge"
              >
                Start Challenge
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h9.586L11.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Safety footer ── */}
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
          {/* Shield check icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
            className="h-6 w-6 shrink-0"
          >
            <path
              d="M12 2l7 3v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V5l7-3z"
              strokeLinejoin="round"
            />
            <path
              d="M9 12l2 2 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>
            <span className="font-bold text-gray-800">
              Your safety is our priority.
            </span>{" "}
            We&apos;re here to support and protect our community.
          </p>
        </div>
      </div>
    </div>
  );
}
