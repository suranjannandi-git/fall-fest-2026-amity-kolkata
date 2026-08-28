export default function Speakers() {
  const speakers = [
    {
      name: "Dr. Quantum Expert (placeholder)",
      role: "Quantum Computing Researcher",
      organization: "Leading Quantum Institute",
      image: "/placeholder-speaker.jpg",
      bio: "Leading researcher in quantum algorithms with 15+ years of experience in quantum computing.",
      session: "Quantum Algorithms: From Theory to Practice",
      expertise: ["Quantum Algorithms", "Quantum Error Correction", "Quantum Cryptography"]
    },
    {
      name: "Prof. Qiskit Developer (placeholder)",
      role: "Senior Software Engineer",
      organization: "IBM Quantum",
      image: "/placeholder-speaker.jpg",
      bio: "Core contributor to Qiskit with expertise in quantum software development and optimization.",
      session: "Building Quantum Applications with Qiskit",
      expertise: ["Qiskit Development", "Quantum Software", "Cloud Computing"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header */}
      <section className="bg-[#0f385f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#dba921] font-semibold uppercase tracking-widest mb-2 text-sm">Qiskit Fall Fest 2026</p>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Our Speakers</h1>
          <div className="w-16 h-1 bg-[#dba921] mb-4"></div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Learn from world-class experts in quantum computing, quantum algorithms, and quantum applications.
          </p>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker, idx) => (
              <div
                key={idx}
                className="bg-white rounded shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-[#006690]"
              >
                {/* Speaker Image Placeholder */}
                <div className="h-56 bg-[#006690] flex items-center justify-center">
                  <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-[#0f385f] mb-1">{speaker.name}</h3>
                  <p className="text-[#dba921] font-bold mb-1">{speaker.role}</p>
                  <p className="text-gray-500 text-sm mb-4">{speaker.organization}</p>

                  <p className="text-gray-700 mb-4">{speaker.bio}</p>

                  <div className="mb-4">
                    <h4 className="font-bold text-[#0f385f] mb-2">Session:</h4>
                    <p className="text-gray-700 italic">{speaker.session}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#0f385f] mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {speaker.expertise.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="px-3 py-1 bg-[#0f385f]/10 text-[#0f385f] rounded-full text-sm font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-[#f3f3f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#006690]/10 border-l-4 border-[#006690] p-4 rounded">
            <p className="text-sm text-[#006690]">
              <strong>Note:</strong> Speaker lineup is being finalized. More speakers will be announced soon. Stay tuned!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
