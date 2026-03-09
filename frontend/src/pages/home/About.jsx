import React from "react";

const About = () => {
  return (
    <div className="bg-background text-foreground">

      {/* HERO SECTION */}
<section className="relative min-h-[85vh] sm:min-h-[80vh] flex items-center pt-24 sm:pt-0">
  {/* Background Image */}
  <img
    src="/hero-bg2.jpeg"
    alt="Students walking near campus"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 text-center text-white">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-5">
      Finding a place to stay <br className="hidden sm:block" />
      shouldn’t feel like a struggle.
    </h1>

    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-10">
      Elomaze is a modern housing and community-driven platform built to help
      people find trusted homes and understand new places they want to live in.
      We combine verified listings with real local insights so you can move with
      clarity and confidence.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
        Explore Elomaze
      </button>

      <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 border border-white/30 font-semibold hover:bg-white/20 transition">
        List a Space
      </button>
    </div>
  </div>
</section>


      {/* WHY WE EXIST */}
      <section className="py-20 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Why We Exist
      </h2>

      <p className="text-muted-foreground text-lg mb-4">
        Elomaze was born from simple problems:
      </p>

      <ul className="list-disc list-inside space-y-3 text-muted-foreground text-lg mb-6">
        <li>Students unable to find accommodation</li>
        <li>People moving into new cities with zero guidance</li>
        <li>Individuals stuck trying to navigate unfamiliar areas</li>
        <li>Services around students or people are hard to discover</li>
      </ul>

      <p className="text-muted-foreground text-lg">
        We’re solving these problems with clarity, community, and trust.
      </p>
    </div>

    <img
      src="/elomaze-build.png"
      alt="Student checking phone"
      className="rounded-3xl shadow-xl"
    />
  </div>
</section>


      {/* WHAT MAKES US DIFFERENT */}
      <section className="bg-muted/40 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            More Than Just Listings
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Accommodation",
                text: "Browse reliable listings from trusted agents. We focus on transparency clear pricing, accurate details, and honest information so you always know what you’re getting.",
              },
              {
                title: "Roommate Matching",
                text: "Find compatible roommates based on lifestyle, preferences, and location. Safe, simple, and built for convenience.",
              },
              {
                title: "Community Guidance",
                text: "Ask questions, share experiences and provide answers about neighborhoods, housing, and local life. Real insights from real people who know the area best.",
              },
              {
                title: "Local Services & Essentials",
                text: "From repairs to movers to resident essentials, elomaze helps you find nearby services that make settling in easier",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-3xl shadow-lg border border-border/50 hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To help people settle smarter and live better by giving them the homes, insights, and local knowledge they need to feel confident anywhere.
          </p>
        </div>
      </section>

      {/* VISION */}
      <section className="bg-muted/40 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/elomaze-City.jpg"
            alt="Campus and city"
            className="rounded-3xl shadow-xl"
          />

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Vision
            </h2>
           <p>A world where everyone can move confidently, settle smarter, and live better powered by community knowledge and trusted housing options.</p>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-20 px-6">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-10">
      Our Story
    </h2>

    <div className="space-y-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
      <p>
        Elomaze started from a very real problem we experienced firsthand.
        As students, finding a place to stay around school was stressful,
        time-consuming, and often frustrating.
      </p>

      <p>
        It meant walking long distances, relying on unverified agents,
        and struggling to get accurate information about available housing
        and nearby services.
      </p>

      <p>
        We realized the problem wasn’t just housing it was the lack of
        trust, structure, and reliable local knowledge. There was no single
        place where people could find homes, discover services, ask questions,
        or get guidance about an area before settling in.
      </p>

      <p>
        That’s why we built Elomaze. What began as a solution for students
        is growing into a broader platform that helps people move confidently,
        settle smarter, and live better powered by trusted listings and
        community-driven knowledge.
      </p>
    </div>
  </div>
</section>


      {/* CTA */}
      <section className="relative py-24 px-6">
        <img
          src="/elomaze-about.jpeg"
          alt="Campus sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Your next stay starts with clarity.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold">
              Find a Place
            </button>
            <button className="px-8 py-4 rounded-2xl bg-white/10 border border-white/30 font-semibold">
              Join the Community
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
