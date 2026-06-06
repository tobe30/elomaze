import React from "react";

const AgentCard = () => {
  return (
    <section className="bg-white py-16 px-4 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8">
        {/* Image */}
        <div className="w-full lg:flex-1 h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-lg">
          <img
            src="/b-11.jpg"
            alt="Modern luxury property with pool"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:flex-1 bg-primary text-white p-6 sm:p-10 lg:p-12 rounded-2xl lg:-ml-20 shadow-2xl z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            Earn more as a property agent
          </h2>

          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
  List your properties on{" "}
  <span className="font-semibold text-white">Elomaze</span> and get them
  seen by serious renters and buyers in your area. Increase visibility,
  close deals faster, and maximize your earnings as an agent.
</p>
          <button className="bg-secondary hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg transition duration-200 w-full sm:w-auto">
            Start Listing
          </button>
        </div>
      </div>
    </section>
  );
};

export default AgentCard;
