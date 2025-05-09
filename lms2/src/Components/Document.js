import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { NavLink } from 'react-router-dom';

function Document() {
  return (
    <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px"}}>
        <Sidebar/>

        <section className='main-content-section'>

                <Header />

                <div className='header-div header-two' style={{padding: "2rem", height: "8rem"}}>
                    <div className="create-options-course">
                        <NavLink to={'/CreateNewCourse'}>
                        <div className="basic-option">
                            <h6>Basic</h6>
                        </div>
                        </NavLink>
                        <NavLink to={'/Media'}>
                        <div className="media-option" >
                            <h6>Media <br />(.mp4, .mp3)</h6>
                        </div>
                        </NavLink>
                        <div className="document-option" style={{backgroundColor: "#7A1CAC", color: "white"}}>
                            <h6>Document <br />(.pdf, .word, .jpg)</h6>
                        </div>
                        <div className="finish-div">
                            <h6>Finish</h6>
                        </div>
                    </div>
                </div>

                <div className='add-new-Catgory'>
                    <div className='adding-course-div' style={{width: "100%"}}> 
                    <h5 style={{marginBottom: "1.5rem"}}>Add Documnet files</h5>
                    <div className='upload-options' style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{width: "30%"}}>
                            <p style={{fontSize: "12px", fontWeight: "600"}}>PDF file</p>
                            <div className="upload-div" style={{marginTop: "1rem"}}>
                                <input type="file" id='file-upload' style={{display: "none"}} />
                                <p><label htmlFor="file-upload"><i class="fa-solid fa-arrow-up-from-bracket"></i></label></p>
                            </div>
                        </div>
                        <div style={{width: "30%"}}>
                            <p style={{fontSize: "12px", fontWeight: "600"}}>Word file</p>
                            <div className="upload-div" style={{marginTop: "1rem"}}>
                                <input type="file" id='file-upload' style={{display: "none"}} />
                                <p><label htmlFor="file-upload"><i class="fa-solid fa-arrow-up-from-bracket"></i></label></p>
                            </div>
                        </div>
                        <div style={{width: "30%"}}>
                            <p style={{fontSize: "12px", fontWeight: "600"}}>JPG file</p>
                            <div className="upload-div" style={{marginTop: "1rem"}}>
                                <input type="file" id='file-upload' style={{display: "none"}} />
                                <p><label htmlFor="file-upload"><i class="fa-solid fa-arrow-up-from-bracket"></i></label></p>
                            </div>
                        </div>
                    </div>
                       
                    <div className='content-div' style={{float: "right", marginTop: "1rem"}}>
                        <button id='previous-btn'> <NavLink to={'/Media'}>Previous</NavLink> </button>
                        <button id='next btn' style={{height: "3rem"}}>Next</button>
                    </div>
                    </div>

                </div>


            </section>
      
    </div>
  )
}

export default Document;
