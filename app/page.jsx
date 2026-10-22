// "use client";
// import React from "react";
// import HeaderSlider from "@/components/HeaderSlider";
// import HomeProducts from "@/components/HomeProducts";
// import Banner from "@/components/Banner";
// import NewsLetter from "@/components/NewsLetter";
// import FeaturedProduct from "@/components/FeaturedProduct";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// const Home = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="px-6 md:px-16 lg:px-32">
//         <HeaderSlider />
//         <HomeProducts />
//         <FeaturedProduct />
//         <Banner />
//         <NewsLetter />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Home;

import React from "react";

const Home = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-16">
      <section className="w-full max-w-xl text-center">
        <span className="inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
          Website under construction
        </span>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 md:text-6xl">
          Something beautiful is coming.
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-stone-600">
          We’re busy preparing our website to give you a better shopping
          experience. Please check back soon!
        </p>

        <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-amber-600" />

        <p className="mt-8 text-sm text-stone-500">
          Thank you for your patience and support.
        </p>
      </section>
    </main>
  );
};

export default Home;