import doctorIcon1 from '../../assets/doc-icon.png'
import doctorIcon2 from '../../assets/doct-icon2.png'
import doctorIcon3 from '../../assets/doct-icon3.png'

const InternationalTab1 = () => {
  return (
      <>
      <div className='indian-tab-content'>
                <div className="row">
                    <div className="col-md-4 col-12 mb-3 mb-md-0">
                        <div className="stats-card1 stats-card  text-white d-flex align-items-center justify-content-between ">
                            <div>
                                <div className="mb-1 stats-title">Doctors</div>
                                 <h3 className="fw-bold stats-value">20k</h3>
                          </div>
                          <div className='stats-img'>
                               <img src={doctorIcon1} alt="doctorIcon1" />
                          </div>
                           
                        </div>
                    </div>
                    <div className="col-md-4 col-12 mb-3 mb-md-0">
                        <div className="stats-card2 stats-card  text-white d-flex align-items-center justify-content-between  ">
                            <div>
                                <div className="mb-1 stats-title">Medical Associations</div>
                                 <h3 className="fw-bold stats-value">20k</h3>
                            </div>
                           <div className='stats-img'>
                               <img src={doctorIcon2} alt="doctorIcon1" />
                          </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-12 mb-3 mb-md-0">
                        <div className="stats-card3 stats-card  d-flex  justify-content-between text-white   ">
                           
                            
                                <div>
                                     <div className="mb-1  stats-title">Partner Hospitals</div>
                                     <h3 className="fw-bold stats-value">20k</h3>
                                </div>
                              <div className='stats-img'>
                               <img src={doctorIcon3} alt="doctorIcon1" />
                          </div>
                            
                        </div>
                    </div>
                </div>
            </div>
      </>
  )
}

export default InternationalTab1