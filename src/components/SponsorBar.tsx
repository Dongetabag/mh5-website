const SponsorBar = () => {
  // Placeholder sponsors - will be replaced with real logos
  const sponsors = [
    { name: 'Partner 1', placeholder: true },
    { name: 'Partner 2', placeholder: true },
    { name: 'Partner 3', placeholder: true },
    { name: 'Partner 4', placeholder: true },
    { name: 'Partner 5', placeholder: true },
  ]

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
      {sponsors.map((sponsor, index) => (
        <div
          key={index}
          className="w-32 h-16 bg-smoke rounded-lg flex items-center justify-center text-offwhite/30 hover:text-offwhite/50 transition-colors duration-300 cursor-pointer"
        >
          {sponsor.placeholder ? (
            <div className="text-center">
              <svg
                className="w-8 h-8 mx-auto mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-xs">Logo</span>
            </div>
          ) : (
            <span className="font-semibold">{sponsor.name}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default SponsorBar
