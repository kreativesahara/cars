import React from 'react'
import { Helmet } from 'react-helmet';

const seo = () => {
  return (
    <div>
          <Helmet>
              <title>Vehicle Marketplace | Find Your Next Ride</title>
              <meta
                  name="description"
                  content="Browse and filter through a wide range of vehicles. Find your next ride with detailed specs, competitive pricing, and a user-friendly experience."
              />
              <meta
                  name="keywords"
                  content="vehicles, cars, marketplace, filter, used cars, new cars, auto"
              />
          </Helmet>
    </div>
  )
}

export default seo