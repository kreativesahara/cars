import React from 'react'
import Free from '../../components/plan/Free'
import Premium from '../../components/plan/Premium'

function Plan() {
  return (
    
      <div className=" flex flex-col">
        <h3 className="text-center text-4xl font-semibold py-14">
          Choose Plan
        </h3>
        <div className="plan grid mx-auto md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-8">
          < Free />
          < Premium />
       </div>
      </div>
    
  )
}

export default Plan

