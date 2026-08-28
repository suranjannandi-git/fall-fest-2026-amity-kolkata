export default function Team() {
  const team = [
    {
      name: "Team Lead",
      role: "Event Coordinator",
      organization: "University Name",
      image: "/placeholder-team.jpg",
      bio: "Passionate about quantum computing and community building.",
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Technical Lead",
      role: "Technical Coordinator",
      organization: "University Name",
      image: "/placeholder-team.jpg",
      bio: "Experienced in organizing technical workshops and hackathons.",
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Content Lead",
      role: "Content & Communications",
      organization: "University Name",
      image: "/placeholder-team.jpg",
      bio: "Creating engaging content to make quantum computing accessible.",
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Logistics Lead",
      role: "Logistics Coordinator",
      organization: "University Name",
      image: "/placeholder-team.jpg",
      bio: "Ensuring smooth operations and excellent participant experience.",
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Outreach Lead",
      role: "Community Outreach",
      organization: "University Name",
      image: "/placeholder-team.jpg",
      bio: "Building partnerships and expanding our quantum community.",
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
      name: "Design Lead",
      role: "Design & Branding",
      organization: "University Name",
      image: "/placeholder-team.jpg",
      bio: "Creating visual identity and user experience for the event.",
      social: { linkedin: "#", github: "#", twitter: "#" }
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header */}
      <section className="bg-[#0f385f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#dba921] font-semibold uppercase tracking-widest mb-2 text-sm">Qiskit Fall Fest 2026</p>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Organizers</h1>
          <div className="w-16 h-1 bg-[#dba921] mb-4"></div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Meet the dedicated team of students and volunteers making Qiskit Fall Fest 2026 possible.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-[#dba921]"
              >
                {/* Member Image Placeholder */}
                <div className="h-56 bg-[#0f385f] flex items-center justify-center">
                  <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-[#0f385f] mb-1">{member.name}</h3>
                  <p className="text-[#dba921] font-bold mb-1">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-4">{member.organization}</p>

                  <p className="text-gray-700 mb-4">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-[#f3f3f3] rounded flex items-center justify-center text-[#0f385f] hover:bg-[#0f385f] hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href={member.social.github}
                      className="w-10 h-10 bg-[#f3f3f3] rounded flex items-center justify-center text-[#0f385f] hover:bg-gray-800 hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-[#f3f3f3] rounded flex items-center justify-center text-[#0f385f] hover:bg-[#006690] hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#0f385f] rounded p-8 md:p-12 text-white">
            <h2 className="text-3xl font-black mb-4">Want to Join Organizers?</h2>
            <div className="w-16 h-1 bg-[#dba921] mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 mb-6">
              We&apos;re always looking for passionate volunteers to help make Qiskit Fall Fest even better. Get in touch if you&apos;d like to contribute!
            </p>
            <a
              href="mailto:team@qiskitfallfest.org"
              className="inline-block px-8 py-4 bg-[#dba921] text-[#0f385f] rounded font-bold hover:bg-[#fecc00] transition-all duration-200 shadow-lg uppercase tracking-wide"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 bg-[#f3f3f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#006690]/10 border-l-4 border-[#006690] p-4 rounded">
            <p className="text-sm text-[#006690]">
              <strong>Note:</strong> Team member profiles are placeholders. Actual team information will be added once finalized.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
