import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Qiskit Fall Fest 2026
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            A Global Celebration of Quantum Computing
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto">
            Join students, researchers, and quantum enthusiasts worldwide in exploring the fascinating world of quantum computing through workshops, talks, and hands-on projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Register Now
            </Link>
            <Link
              href="/resources"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Event Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About the Event</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Qiskit Fall Fest is a collection of quantum computing events hosted by university students around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Learn</h3>
              <p className="text-gray-600">
                Attend workshops and tutorials on quantum computing fundamentals, Qiskit programming, and quantum algorithms.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Build</h3>
              <p className="text-gray-600">
                Work on hands-on quantum computing projects and challenges using real quantum hardware and simulators.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">
                Network with quantum computing enthusiasts, researchers, and industry professionals from around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Objectives</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Democratize Quantum Education</h3>
                <p className="text-gray-600">Make quantum computing accessible to students and enthusiasts worldwide through free, high-quality educational content.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Foster Innovation</h3>
                <p className="text-gray-600">Encourage creative problem-solving and innovation in quantum computing applications and algorithms.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Community</h3>
                <p className="text-gray-600">Create a vibrant, supportive community of quantum computing learners and practitioners.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-on Experience</h3>
                <p className="text-gray-600">Provide practical experience with real quantum hardware and cutting-edge quantum software tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Highlights</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                20+
              </div>
              <p className="text-gray-600 font-medium">Expert Speakers</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-2">
                50+
              </div>
              <p className="text-gray-600 font-medium">Workshops & Sessions</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                500+
              </div>
              <p className="text-gray-600 font-medium">Participants Expected</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-2">
                Global
              </div>
              <p className="text-gray-600 font-medium">Worldwide Reach</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Register now to secure your spot at Qiskit Fall Fest 2026 and be part of the quantum revolution.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Register Now - It's Free!
          </Link>
        </div>
      </section>
    </div>
  );
}