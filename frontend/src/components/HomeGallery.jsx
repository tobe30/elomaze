import React from "react";

const HomeGallery = () => {
  const services = [
    {
      src: "/electric1.jpg",
      title: "Electrician",
      span: "row-span-2",
    },
    { src: "/ins2.jpg", title: "Interior design", span: "row-span-1" },
    {
      src: "/carp3.jpg",
      title: "Carpenter",
      span: "row-span-2",
    },
    {
      src: "/ac3.jpg",
      title: "AC Installation",
      span: "row-span-1",
    },
    {
      src: "/pop2.jpg",
      title: "Pop",
      span: "row-span-1",
    },
    {
      src: "/painter.jpg",
      title: "Painter",
      span: "row-span-1",
    },
    { src: "/plumber.jpg", title: "Plumber", span: "row-span-1" },
    { src: "/tiles.jpg", title: "Title", span: "row-span-1" },
  ];

  return (
    <section className="relative min-h-screen">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img src="/ins3.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-6 md:px-16 py-16">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-white text-3xl md:text-5xl font-semibold">
            Elomaze Premium Services
          </h1>
            <p className="text-gray-300 mt-3 text-sm md:text-base">
            Discover reliable, high-quality services around you on{" "}
            <span className="font-semibold text-white">Elomaze</span>. 
            From essential home  repairs to <br/>  everyday professional services,  connect
            with trusted providers that get the job done efficiently and reliably.
            </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-4">
          {services.map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl ${item.span}`}
            >
              {/* IMAGE */}
              <img
                src={item.src}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>

              {/* TEXT */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-sm md:text-lg font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
