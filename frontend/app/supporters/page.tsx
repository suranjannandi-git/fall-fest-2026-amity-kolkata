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

  const getTypeBadge = (type: string) => {
    const map: { [key: string]: string } = {
      "Platinum Sponsor": "bg-gray-200 text-gray-800",
      "Gold Sponsor": "bg-[#dba921] text-[#0f385f]",
      "Silver Sponsor": "bg-gray-300 text-gray-700",
      "Academic Partner": "bg-[#0f385f] text-white",
      "Research Partner": "bg-[#006690] text-white",
      "Community Partner": "bg-[#9f1f30] text-white",
    };
    return map[type] || "bg-gray-200 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header */}
      <section className="bg-[#0f385f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#dba921] font-semibold uppercase tracking-widest mb-2 text-sm">Qiskit Fall Fest 2026</p>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Our Supporters</h1>
          <div className="w-16 h-1 bg-[#dba921] mb-4"></div>
          {/* <p className="text-xl text-gray-200 max-w-3xl">
            We&apos;re grateful to our sponsors and partners who make Qiskit Fall Fest 2026 possible.
          </p> */}
        </div>
      </section>

      {/* Become a Sponsor */}
      <section className="py-16 bg-[#f3f3f3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#0f385f] rounded p-8 md:p-12 text-white">
            <h2 className="text-3xl font-black mb-4">Become a Sponsor</h2>
            <div className="w-16 h-1 bg-[#dba921] mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 mb-6">
              Partner with us to support quantum education and reach a global audience of quantum enthusiasts.
            </p>
            <a
              href="mailto:sponsors@qiskitfallfest.org"
              className="inline-block px-8 py-4 bg-[#dba921] text-[#0f385f] rounded font-bold hover:bg-[#fecc00] transition-all duration-200 shadow-lg uppercase tracking-wide"
            >
              Contact Us About Sponsorship
            </a>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-[#f3f3f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#006690]/10 border-l-4 border-[#006690] p-4 rounded">
            <p className="text-sm text-[#006690]">
              <strong>Note:</strong> Supporter information is placeholder content. Actual sponsors and partners will be announced as they are confirmed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
