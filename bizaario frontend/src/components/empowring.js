import React, { useState } from 'react'
import EmpoweringContent1 from '../empowering-doctors/EmpoweringContent1';

const Empowering = () => {
     const [activeTab, setActiveTab] = useState('tab1');
        
        const renderContent = () => {
        switch (activeTab) {
            case 'tab1': return <div> <EmpoweringContent1/> </div>
                    
            case 'tab2':return <div> <EmpoweringContent1/> </div>
            return null;
        }
      };



return (
<>
    <section className='empoering-section spacing-top'>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-12">
                    <h2 className='fw-semibold '>Empowering Doctors with Evidence-Based Knowledge</h2>
                    <p className='light-color'>Learn from leading doctors and specialists through focused, digestible video content.</p>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-center">
                    <div className="button-container">
                              <button className={`btn btn-custom ${activeTab==='tab1' ? 'active-custom-tab' : '' }`}
                                  onClick={()=> setActiveTab('tab1')}>
                                  For Doctor
                              </button>
                              <button className={`btn btn-custom ${activeTab==='tab2' ? 'active-custom-tab' : '' }`}
                                  onClick={()=> setActiveTab('tab2')}>
                                  For Patients
                              </button>
                          </div>
                </div>
                </div>

                <div className="row">
                      <div className="bg-white ">{renderContent()}</div>
                </div>
                
            <div className="row">
               
            </div>
        </div>
    </section>
</>
)
}

export default Empowering