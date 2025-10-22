import React from "react";

const Creator = () => {
  return (
    <section id="creator" className="bg-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white mb-16">
          From the Creator
        </h2>

        <div className="mb-8">
          <div className="w-50 h-50 sm:w-60 sm:h-60 rounded-full mx-auto border-4 border-purple-500 p-1 hover:scale-105 transition-transform duration-300">
            <img
              src="/sumit.jpg"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Sumit Chhablani
          </h3>
          <p className="text-purple-400 text-lg font-medium">
            Full Stack Developer | IIT (ISM) Dhanbad
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            "I built NGO Connect to bring our volunteer community together in
            one digital space. My aim is to make communication smoother,
            collaboration stronger, and our impact greater. I hope you find it
            helpful. Together, we can make a real difference in our
            communities."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Creator;
