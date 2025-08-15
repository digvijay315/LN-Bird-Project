import React from 'react'
import contactBanner from '../assets/images/about/banner.png'
import CommonBanner from '../UI/CommonBanner'

import GoogleMapLocation from '../components/contact-us/GoogleMapLocation'
import FAQ from '../components/contact-us/FAQ'
import GetInTouch from '../components/contact-us/GetInTouch'
const ContactUs = () => {
     const bannerData = 
                {
                banner: contactBanner,
                title: 'Contact Us',
                desc:'Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.'
            }
  return (
    <>
      <section>
        <CommonBanner bannerData={bannerData} />
      </section>
      <section className='spacing-top'>
        <div className="container ">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className='fw-semibold '>Let’s Talk</h2>
              <p className='light-color'>Empowering hospitals, physicians, and patients with real-time communication and
                clinical collaboration—because better care starts with better connection.</p>
            </div>
          </div>

        </div>
      </section>
      <section>
        <GetInTouch />
      </section>
      <section className='pt-4 pt-md-5'>
        <GoogleMapLocation />
      </section>
      <section className='pt-5 pt-md-5'>
        <div className="container ">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className='fw-semibold '>FAQs (Frequently Asked Questions)</h2>
              <p className='light-color'>Here are some sample FAQs for a Doctor Portal, suitable for a website or app
                used by doctors for managing appointments, patients, records, collaborations, etc</p>
            </div>
          </div>

          <FAQ />
        </div>
      </section>
    </>
  )
}

export default ContactUs
