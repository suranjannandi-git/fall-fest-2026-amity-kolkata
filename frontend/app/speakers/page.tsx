export default function Speakers() {
  const speakers = [
    {
      name: "Dr. Quantum Expert",
      role: "Quantum Computing Researcher",
      organization: "Leading Quantum Institute",
      image: "/placeholder-speaker.jpg",
      bio: "Leading researcher in quantum algorithms with 15+ years of experience in quantum computing.",
      session: "Quantum Algorithms: From Theory to Practice",
      expertise: ["Quantum Algorithms", "Quantum Error Correction", "Quantum Cryptography"]
    },
    {
      name: "Prof. Qiskit Developer",
      role: "Senior Software Engineer",
      organization: "IBM Quantum",
      image: "/placeholder-speaker.jpg",
      bio: "Core contributor to Qiskit with expertise in quantum software development and optimization.",
      session: "Building Quantum Applications with Qiskit",
      expertise: ["Qiskit Development", "Quantum Software", "Cloud Computing"]
    },
    {
      name: "Dr. ML Quantum",
      role: "Quantum Machine Learning Specialist",
      organization: "Quantum AI Lab",
      image: "/placeholder-speaker.jpg",
      bio: "Pioneer in quantum machine learning research and applications in real-world problems.",
      session: "Quantum Machine Learning: Current State and Future",
      expertise: ["Quantum ML", "Neural Networks", "Optimization"]
    },
    {
      name: "Prof. Hardware Expert",
      role: "Quantum Hardware Engineer",
      organization: "Quantum Systems Corp",
      image: "/placeholder-speaker.jpg",
      bio: "Expert in quantum hardware design and superconducting qubit systems.",
      session: "Understanding Quantum Hardware",
      expertise: ["Quantum Hardware", "Superconducting Qubits", "Quantum Control"]
    },
    {
      name: "Dr. Education Leader",
      role: "Quantum Education Director",
      organization: "Global Quantum Education Initiative",
      image: "/placeholder-speaker.jpg",
      bio: "Dedicated to making quantum computing education accessible to everyone worldwide.",
      session: "Teaching Quantum Computing Effectively",
      expertise: ["Education", "Curriculum Development", "Community Building"]
    },
    {
      name: "Industry Pioneer",
      role: "Quantum Solutions Architect",
      organization: "Quantum Enterprise Solutions",
      image: "/placeholder-speaker.jpg",
      bio: "Leading the development of enterprise quantum computing solutions and applications.",
      session: "Quantum Computing in Industry",
      expertise: ["Enterprise Solutions", "Business Applications", "Quantum Strategy"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Speakers</h1>
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
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Speaker Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
                  <p className="text-purple-600 font-semibold mb-1">{speaker.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{speaker.organization}</p>
                  
                  <p className="text-gray-700 mb-4">{speaker.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Session:</h4>
                    <p className="text-gray-700 italic">{speaker.session}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {speaker.expertise.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
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

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Learn from These Experts?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Register now to attend all sessions and interact with our amazing speakers.
            </p>
            <a
              href="/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Register for Free
            </a>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Speaker lineup is being finalized. More speakers will be announced soon. Stay tuned!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
