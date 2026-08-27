export default function Supporters() {
  const supporters = [
    {
      name: "IBM Quantum",
      type: "Platinum Sponsor",
      logo: "/placeholder-logo.jpg",
      description: "Leading provider of quantum computing systems and services.",
      website: "https://www.ibm.com/quantum"
    },
    {
      name: "University Partner",
      type: "Academic Partner",
      logo: "/placeholder-logo.jpg",
      description: "Supporting quantum education and research initiatives.",
      website: "#"
    },
    {
      name: "Tech Company",
      type: "Gold Sponsor",
      logo: "/placeholder-logo.jpg",
      description: "Advancing quantum computing applications in industry.",
      website: "#"
    },
    {
      name: "Research Institute",
      type: "Research Partner",
      logo: "/placeholder-logo.jpg",
      description: "Pioneering quantum computing research and development.",
      website: "#"
    },
    {
      name: "Quantum Startup",
      type: "Silver Sponsor",
      logo: "/placeholder-logo.jpg",
      description: "Innovative quantum software and hardware solutions.",
      website: "#"
    },
    {
      name: "Educational Foundation",
      type: "Community Partner",
      logo: "/placeholder-logo.jpg",
      description: "Promoting STEM education and quantum literacy.",
      website: "#"
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Platinum Sponsor": "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900",
      "Gold Sponsor": "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900",
      "Silver Sponsor": "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800",
      "Academic Partner": "bg-gradient-to-r from-blue-400 to-blue-500 text-blue-900",
      "Research Partner": "bg-gradient-to-r from-purple-400 to-purple-500 text-purple-900",
      "Community Partner": "bg-gradient-to-r from-green-400 to-green-500 text-green-900"
    };
    return colors[type] || "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-900";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Supporters</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            We're grateful to our sponsors and partners who make Qiskit Fall Fest 2026 possible.
          </p>
        </div>
      </section>

      {/* Supporters Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supporters.map((supporter, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Logo Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                  <div className="w-full h-full bg-white rounded-lg shadow-inner flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">LOGO</span>
                  </div>
                </div>

                {/* Supporter Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${getTypeColor(supporter.type)}`}>
                      {supporter.type}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{supporter.name}</h3>
                  <p className="text-gray-700 mb-4">{supporter.description}</p>
                  
                  <a
                    href={supporter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Visit Website
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sponsorship Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Support quantum education and help us reach more students worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Platinum */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-gray-300">
              <div className="text-center mb-6">
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 rounded-full font-bold text-lg mb-4">
                  Platinum
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">$10,000+</div>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Logo on all materials
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Keynote speaking slot
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dedicated workshop
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Recruitment opportunities
                </li>
              </ul>
            </div>

            {/* Gold */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8 border-2 border-yellow-400">
              <div className="text-center mb-6">
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 rounded-full font-bold text-lg mb-4">
                  Gold
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">$5,000+</div>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Logo on website & materials
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Speaking opportunity
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Social media mentions
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Booth space
                </li>
              </ul>
            </div>

            {/* Silver */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-gray-300">
              <div className="text-center mb-6">
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-full font-bold text-lg mb-4">
                  Silver
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">$2,500+</div>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Logo on website
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Social media recognition
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Event materials mention
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Sponsor */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Sponsor</h2>
            <p className="text-lg text-gray-600 mb-6">
              Partner with us to support quantum education and reach a global audience of quantum enthusiasts.
            </p>
            <a
              href="mailto:sponsors@qiskitfallfest.org"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us About Sponsorship
            </a>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Supporter information is placeholder content. Actual sponsors and partners will be announced as they are confirmed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
