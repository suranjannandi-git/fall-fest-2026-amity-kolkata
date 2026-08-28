export default function Resources() {
  const resources = [
    {
      category: "Quantum Computing Fundamentals",
      items: [
        {
          title: "Introduction to Quantum Computing",
          description: "Learn the basics of quantum mechanics and quantum computing principles.",
          link: "https://qiskit.org/learn/intro-qc-qh",
          type: "Course"
        },
        {
          title: "Quantum Computing for the Very Curious",
          description: "An interactive introduction to quantum computing by Andy Matuschak and Michael Nielsen.",
          link: "https://quantum.country/qcvc",
          type: "Interactive"
        }
      ]
    },
    {
      category: "Qiskit Learning",
      items: [
        {
          title: "Qiskit YouTube Channel",
          description: "Video tutorials, coding sessions, and quantum computing lectures.",
          link: "https://www.youtube.com/qiskit",
          type: "Video"
        }
      ]
    }
  ];

  // Amity-palette type badges
  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Course: "bg-[#006690]/15 text-[#006690]",
      Interactive: "bg-[#0f385f]/15 text-[#0f385f]",
      Book: "bg-[#9f1f30]/15 text-[#9f1f30]",
      Textbook: "bg-[#0f385f]/15 text-[#0f385f]",
      Documentation: "bg-gray-100 text-gray-700",
      Video: "bg-[#9f1f30]/15 text-[#9f1f30]",
      Event: "bg-[#dba921]/20 text-[#8a6612]",
      Library: "bg-[#006690]/15 text-[#006690]",
      Research: "bg-[#9f1f30]/15 text-[#9f1f30]",
      Challenge: "bg-[#dba921]/20 text-[#8a6612]",
      Community: "bg-[#006690]/15 text-[#006690]",
      Forum: "bg-gray-100 text-gray-700",
      Platform: "bg-[#0f385f]/15 text-[#0f385f]",
      Service: "bg-[#006690]/15 text-[#006690]",
      Tool: "bg-[#9f1f30]/15 text-[#9f1f30]"
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header */}
      <section className="bg-[#0f385f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#dba921] font-semibold uppercase tracking-widest mb-2 text-sm">Qiskit Fall Fest 2026</p>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Learning Resources</h1>
          <div className="w-16 h-1 bg-[#dba921] mb-4"></div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Curated collection of resources to help you learn quantum computing, master Qiskit, and explore quantum machine learning.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {resources.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-3xl font-black text-[#0f385f] mb-2">{section.category}</h2>
                <div className="w-12 h-1 bg-[#dba921] mb-6"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, itemIdx) => (
                    <a
                      key={itemIdx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded shadow-md hover:shadow-xl transition-all duration-200 p-6 border border-gray-200 hover:border-[#006690] group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#0f385f] group-hover:text-[#006690] transition-colors pr-2">
                          {item.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center text-[#006690] font-bold group-hover:text-[#0f385f]">
                        <span>Learn more</span>
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
