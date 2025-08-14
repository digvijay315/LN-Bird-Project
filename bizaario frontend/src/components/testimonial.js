import React from 'react'
import TestimonialCard from '../components/testimonial/testimonialcard'

const Testimonial = () => {
  return (
      <>
          <section className='spacing-top testmonial-section ' >
              <div className='testimonial-card'> 
              <div className="container ">
                  <div className="row">
                      <TestimonialCard/>
                  </div>
                  </div>
                </div>
          </section>
        </>
  )
}

export default Testimonial