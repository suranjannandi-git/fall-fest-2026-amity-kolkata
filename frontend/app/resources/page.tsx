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
        },
        {
          title: "Quantum Computing: A Gentle Introduction",
          description: "Comprehensive textbook covering quantum computing fundamentals.",
          link: "#",
          type: "Book"
        }
      ]
    },
    {
      category: "Qiskit Learning",
      items: [
        {
          title: "Qiskit Textbook",
          description: "Open-source textbook teaching quantum computing with Qiskit.",
          link: "https://qiskit.org/textbook",
          type: "Textbook"
        },
        {
          title: "Qiskit Documentation",
          description: "Official Qiskit documentation with tutorials and API references.",
          link: "https://qiskit.org/documentation",
          type: "Documentation"
        },
        {
          title: "Qiskit YouTube Channel",
          description: "Video tutorials, coding sessions, and quantum computing lectures.",
          link: "https://www.youtube.com/qiskit",
          type: "Video"
        },
        {
          title: "Qiskit Global Summer School",
          description: "Annual two-week intensive summer school on quantum computing.",
          link: "https://qiskit.org/events/summer-school",
          type: "Event"
        }
      ]
    },
    {
      category: "Quantum Machine Learning",
      items: [
        {
          title: "Quantum Machine Learning Course",
          description: "Learn how to implement quantum machine learning algorithms.",
          link: "https://qiskit.org/learn/course/machine-learning-course",
          type: "Course"
        },
        {
          title: "PennyLane",
          description: "Python library for quantum machine learning and optimization.",
          link: "https://pennylane.ai",
          type: "Library"
        },
        {
          title: "Quantum Machine Learning Papers",
          description: "Collection of research papers on quantum machine learning.",
          link: "#",
          type: "Research"
        }
      ]
    },
    {
      category: "Practice & Challenges",
      items: [
        {
          title: "IBM Quantum Challenges",
          description: "Hands-on quantum programming challenges and competitions.",
          link: "https://quantum-computing.ibm.com/challenges",
          type: "Challenge"
        },
        {
          title: "Qiskit Advocate Program",
          description: "Join the global community of Qiskit advocates and contributors.",
          link: "https://qiskit.org/advocates",
          type: "Community"
        },
        {
          title: "Quantum Computing Stack Exchange",
          description: "Q&A community for quantum computing questions.",
          link: "https://quantumcomputing.stackexchange.com",
          type: "Forum"
        }
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        {
          title: "IBM Quantum Experience",
          description: "Access real quantum computers and simulators in the cloud.",
          link: "https://quantum-computing.ibm.com",
          type: "Platform"
        },
        {
          title: "Qiskit Runtime",
          description: "Quantum computing service for executing quantum programs efficiently.",
          link: "https://qiskit.org/documentation/partners/qiskit_ibm_runtime",
          type: "Service"
        },
        {
          title: "Quantum Composer",
          description: "Visual quantum circuit builder for creating quantum programs.",
          link: "https://quantum-computing.ibm.com/composer",
          type: "Tool"
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Course: "bg-blue-100 text-blue-800",
      Interactive: "bg-purple-100 text-purple-800",
      Book: "bg-green-100 text-green-800",
      Textbook: "bg-indigo-100 text-indigo-800",
      Documentation: "bg-gray-100 text-gray-800",
      Video: "bg-red-100 text-red-800",
      Event: "bg-pink-100 text-pink-800",
      Library: "bg-cyan-100 text-cyan-800",
      Research: "bg-orange-100 text-orange-800",
      Challenge: "bg-yellow-100 text-yellow-800",
      Community: "bg-teal-100 text-teal-800",
      Forum: "bg-lime-100 text-lime-800",
      Platform: "bg-violet-100 text-violet-800",
      Service: "bg-fuchsia-100 text-fuchsia-800",
      Tool: "bg-rose-100 text-rose-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Resources</h1>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, itemIdx) => (
                    <a
                      key={itemIdx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border border-gray-200 hover:border-purple-300 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {item.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
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

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need More Help?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Join our community channels to connect with other learners, ask questions, and share your quantum computing journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
              >
                Join Discord
              </a>
              <a
                href="#"
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-all duration-200"
              >
                Slack Community
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
