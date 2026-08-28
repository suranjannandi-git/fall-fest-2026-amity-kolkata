export default function About() {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header */}
      <section className="bg-[#0f385f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#dba921] font-semibold uppercase tracking-widest mb-2 text-sm">Qiskit Fall Fest 2026</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">About Us</h1>
          <div className="w-16 h-1 bg-[#dba921] mb-4"></div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Learn about our organization, vision, and mission to democratize quantum computing education.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-[#0f385f] mb-2 section-heading">Our Story</h2>
          <div className="prose prose-lg text-gray-700 mt-8">
            <p className="mb-4">
              Qiskit Fall Fest began as a grassroots initiative by students passionate about quantum computing.
              What started as a small gathering has grown into a global movement, bringing together thousands of
              students, researchers, and quantum enthusiasts from around the world.
            </p>
            <p className="mb-4">
              Our journey reflects the rapid growth of quantum computing itself—from theoretical concepts to
              practical applications, from academic research to industry adoption. We&apos;ve witnessed firsthand
              how quantum computing is transforming technology and opening new frontiers in science and engineering.
            </p>
            <p>
              Today, Qiskit Fall Fest is more than just an event. It&apos;s a community, a learning platform, and
              a launchpad for the next generation of quantum computing pioneers.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[#f3f3f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white rounded border-t-4 border-[#0f385f] p-8 shadow-md">
              <div className="w-16 h-16 bg-[#0f385f] rounded flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#dba921]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-[#0f385f] mb-4">Vision</h2>
              <p className="text-lg text-gray-700">
                To create a world where quantum computing knowledge is accessible to everyone, regardless of
                background or location. We envision a future where quantum literacy is as fundamental as
                classical computing skills, empowering the next generation to solve humanity&apos;s greatest challenges.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded border-t-4 border-[#006690] p-8 shadow-md">
              <div className="w-16 h-16 bg-[#006690] rounded flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-[#0f385f] mb-4">Mission</h2>
              <p className="text-lg text-gray-700">
                To democratize quantum computing education through free, high-quality learning experiences.
                We provide hands-on workshops, expert-led sessions, and a supportive community that enables
                learners to explore, experiment, and excel in quantum computing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#0f385f] mb-4 section-heading">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              These principles guide everything we do and shape our community culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Accessibility", desc: "Making quantum computing education free and accessible to all, breaking down barriers to entry.", color: "bg-[#0f385f]" },
              { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", label: "Community", desc: "Building a supportive, inclusive community where everyone can learn and grow together.", color: "bg-[#006690]" },
              { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", label: "Innovation", desc: "Encouraging creative thinking and innovative approaches to quantum computing challenges.", color: "bg-[#dba921]" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Excellence", desc: "Delivering high-quality content and experiences that meet the highest educational standards.", color: "bg-[#9f1f30]" },
            ].map((v) => (
              <div key={v.label} className="text-center">
                <div className={`w-20 h-20 ${v.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={v.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0f385f] mb-2">{v.label}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#0f385f] rounded p-8 md:p-12 text-white">
            <h2 className="text-3xl font-black mb-4">Join Our Mission</h2>
            <div className="w-16 h-1 bg-[#dba921] mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 mb-6">
              Be part of the quantum revolution. Register for Qiskit Fall Fest 2026 and help us build the future of computing.
            </p>            
          </div>
        </div>
      </section>
    </div>
  );
}
