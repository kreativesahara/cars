import React from 'react'
import { Helmet } from 'react-helmet';

const Seo = ({ title, description, keywords, canonical }) => {
  return (
    <Helmet>
      <title>{title || 'Vehicle Marketplace | Find Your Next Ride'}</title>
      <meta
        name="description"
        content={description || "Browse through a wide range of vehicles. Find your next ride with detailed specs, competitive pricing, and a user-friendly experience."}
      />
      <meta
        name="keywords"
        content={keywords || "vehicles, cars, marketplace, filter, used cars, new cars, auto"}
      />
      <link rel="canonical" href={canonical || "https://example.com/vehicles"} />
    </Helmet>
  );
}

export default Seo;
