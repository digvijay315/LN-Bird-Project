import React, { useState } from 'react'
import LiveSessionContent from '../components/live-sessions-online-clinic/LiveSessionContent';
import OnlineClinic from '../components/live-sessions-online-clinic/OnlineClinic';

const Livesession = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    
    const renderContent = () => {
    switch (activeTab) {
        case 'tab1':
            return <div className='mt-4 mt-md-0'>
                <LiveSessionContent/>
            </div>
                
        case 'tab2':
        return <div className="">
      <OnlineClinic/>
        </div>;

        return null;
    }
  };
  return (
      <>
          <section className='spacing-top'>
              <div className="container ">
                  <div className="row">
                      <div className="col-lg-8 col-12">
                          <h2 className='fw-semibold '>Live Sessions and Online Clinics</h2>
                          <p>Learn from leading doctors and specialists through focused, digestible video content.</p>
                      </div>
                      <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-center"> 
                          <div className="button-container mb-lg-0  mb-4">
                              <button className={`btn btn-custom ${activeTab==='tab1' ? 'active-custom-tab' : '' }`}
                                  onClick={()=> setActiveTab('tab1')}>
                                  Live Sessions
                              </button>
                              <button className={`btn btn-custom ${activeTab==='tab2' ? 'active-custom-tab' : '' }`}
                                  onClick={()=> setActiveTab('tab2')}>
                                  Online Clinic
                              </button>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div>{renderContent()}</div>
                  </div>
                  <div className="row">
                       <div className="col-lg-8 col-12">
                          <h4 className='fw-semibold pt-2'>Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</h4>
                          <p className='mb-3 mb-lg-0'>By Doctor Malik</p>
                      </div>
                      <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-center"> 
                          <button className={`btn common-btn-dark   `}>
                              Join Now
                          </button>
                          </div>
                  </div>
              </div>
          </section>
      </>
  )
}

export default Livesession

