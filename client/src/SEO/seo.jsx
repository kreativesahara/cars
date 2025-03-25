import React from 'react'
import { Helmet } from 'react-helmet';

const Seo = ({ title, description, canonical }) => {
  return (
    <Helmet>
      <meta
        name="description"
        content={description || "Browse through a wide range of vehicles. Find your next ride with detailed specs, competitive pricing, and a user-friendly experience."}
      />
      <title>{title || 'Vehicle Marketplace | Find Your Next Ride'}</title>
      <link rel="canonical" href={canonical || "https://example.com/vehicles"}/>
    </Helmet>
  );
}

export default Seo;
