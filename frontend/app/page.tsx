import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg text-white min-h-[85vh] flex flex-col justify-end">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16 pt-160">
          <p className="text-[#dba921] font-semibold uppercase tracking-widest mb-4 text-base">
            Amity University Kolkata Presents
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-black leading-tight">
            Qiskit Fall Fest 2026
          </h1>
          <div className="w-20 h-1 bg-[#dba921] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl mb-6 text-black font-light">
            A Global Celebration of Quantum Computing
          </p>
          <p className="text-lg mb-12 text-black max-w-3xl mx-auto">
            Join students, researchers, and quantum enthusiasts worldwide in exploring the fascinating world of quantum computing through workshops, talks, and hands-on projects.
          </p>
        </div>
      </section>

      {/* Event Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0f385f] mb-4 section-heading">About the Event</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Qiskit Fall Fest is a collection of quantum computing events hosted by university students around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f3f3f3] p-8 rounded border-t-4 border-[#006690] shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#006690] rounded flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0f385f] mb-2">Learn</h3>
              <p className="text-gray-600">
                Attend workshops and tutorials on quantum computing fundamentals, Qiskit programming, and quantum algorithms.
              </p>
            </div>

            <div className="bg-[#f3f3f3] p-8 rounded border-t-4 border-[#dba921] shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#dba921] rounded flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#0f385f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0f385f] mb-2">Build</h3>
              <p className="text-gray-600">
                Work on hands-on quantum computing projects and challenges using real quantum hardware and simulators.
              </p>
            </div>

            <div className="bg-[#f3f3f3] p-8 rounded border-t-4 border-[#9f1f30] shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#9f1f30] rounded flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0f385f] mb-2">Connect</h3>
              <p className="text-gray-600">
                Network with quantum computing enthusiasts, researchers, and industry professionals from around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-[#f3f3f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0f385f] mb-4 section-heading">Event Objectives</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
            {[
              {
                title: "Democratize Quantum Education",
                desc: "Make quantum computing accessible to students and enthusiasts worldwide through free, high-quality educational content.",
              },
              {
                title: "Foster Innovation",
                desc: "Encourage creative problem-solving and innovation in quantum computing applications and algorithms.",
              },
              {
                title: "Build Community",
                desc: "Create a vibrant, supportive community of quantum computing learners and practitioners.",
              },
              {
                title: "Hands-on Experience",
                desc: "Provide practical experience with real quantum hardware and cutting-edge quantum software tools.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#006690] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0f385f] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0f385f] mb-4 section-heading">Event Highlights</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center p-6 bg-[#0f385f] rounded shadow-md">
              <div className="text-4xl font-black text-[#dba921] mb-2">10+</div>
              <p className="text-white font-semibold">Expert Speakers</p>
            </div>

            <div className="text-center p-6 bg-[#006690] rounded shadow-md">
              <div className="text-4xl font-black text-[#dba921] mb-2">20+</div>
              <p className="text-white font-semibold">Workshops &amp; Sessions</p>
            </div>

            <div className="text-center p-6 bg-[#9f1f30] rounded shadow-md">
              <div className="text-4xl font-black text-[#fecc00] mb-2">50+</div>
              <p className="text-white font-semibold">Participants Expected</p>
            </div>

            <div className="text-center p-6 bg-[#dba921] rounded shadow-md">
              <div className="text-4xl font-black text-[#0f385f] mb-2">Global</div>
              <p className="text-[#0f385f] font-semibold">Worldwide Reach</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#006690] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Join?</h2>
          <div className="w-16 h-1 bg-[#dba921] mx-auto mb-6"></div>
          <p className="text-xl text-gray-100 mb-8">
            Register now to secure your spot at Qiskit Fall Fest 2026 and be part of the quantum revolution.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-[#dba921] text-[#0f385f] rounded font-bold text-lg hover:bg-[#fecc00] transition-all duration-200 shadow-lg hover:shadow-xl uppercase tracking-wide"
          >
            Register Now — It&apos;s Free!
          </Link>
        </div>
      </section>
    </div>
  );
}
