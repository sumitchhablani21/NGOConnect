import React from "react";

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700 transition hover:-translate-y-2">
    <div className="text-purple-400 mb-4">{icon}</div>
    <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
    <p className="text-gray-300">{children}</p>
  </div>
);

const About = () => {
  return (
    <section id="about" className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold text-white sm:text-4xl">
          What is NGO Connect?
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          NGO Connect isn't just a platform. It's a place where we come together
          to create real change.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard
            icon={
              <svg
                className="w-8 h-10 text-purple-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            title="Connect with NGOs"
          >
            Find and connect with NGOs that align with your values and
            interests. Discover opportunities across various causes and build
            meaningful relationships with organizations making a difference.
          </FeatureCard>

          <FeatureCard
            icon={
              <svg
                className="w-8 h-10 text-purple-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            }
            title="Share Impact"
          >
            Document and share your volunteer experiences, track your
            contributions, and inspire others. Help build a community where
            stories of change motivate more people to get involved.
          </FeatureCard>

          <FeatureCard
            icon={
              <svg
                className="w-8 h-10 text-purple-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            title="Stay Updated"
          >
            Never miss an opportunity to make a difference. From community
            drives to awareness campaigns, stay informed about everything
            happening in the volunteer ecosystem.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default About;
