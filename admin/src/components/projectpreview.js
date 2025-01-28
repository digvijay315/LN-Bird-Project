import { logDOM } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from "../api";

function Projectpreview() {

    const location=useLocation()
    const id=location.state 
 
 
    const[project,setproject]=useState([])
    useEffect(()=>
    {
        fetchproject()
    },[id])

    const fetchproject=async()=>
    {
        try {
            const resp=await api.get(`viewprojectbyid/${id}`)
            setproject(resp.data.project)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    
    const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index in fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false); // To toggle fullscreen mode visibility

  // Handle the click on the image to set it in fullscreen
  const handleImageClick = (image, index) => {
    setFullscreenImage(image);
    setCurrentImageIndex(index);
    setIsFullscreen(true); // Open fullscreen mode
  };

  // Close the fullscreen view
  const handleCloseModal = () => {
    setIsFullscreen(false);
  };

  // Handle the "Next" button click to move to the next image
  const handleNextClick = () => {
    const allImages = project.add_unit.flatMap(unit => unit.preview); // Get all preview images across all units
    const nextIndex = (currentImageIndex + 1) % allImages.length; // Cycle through images
    setCurrentImageIndex(nextIndex);
    setFullscreenImage(allImages[nextIndex]); // Update the current fullscreen image
  };

  // Ensure project and add_unit are available and the preview array exists
  const allImages = project.add_unit?.flatMap(unit => unit.preview); 


    
    
  return (
    <div style={{overflow:"hidden",paddingLeft:"120px",paddingRight:"120px",paddingTop:"50px",  backgroundImage: 'url(https://loading.io/assets/mod/background/ripple/thumbnail.jpg)',backgroundSize: 'cover',backgroundRepeat:"repeat",height:"auto"}}>
  
  <h2 style={{fontFamily:"times-new-roman"}}>{project.name}</h2>
  <h3>{project.category}</h3>
  <div style={{display:"inline-flex"}}>
  <img src='https://i.pinimg.com/474x/ac/c2/91/acc291a20c55c01932ced422bc48e602.jpg' style={{height:"20px"}}></img>
  <h5>{project.location}</h5>
  </div>
 

{allImages && allImages.length > 0 ? (
  <div style={{marginTop:"20px"}}>
    {/* Display all images from all units in a grid */}
    
      {allImages.map((image, index) => (
      
        <img
          key={index}
          src={image}
          alt={`Preview ${index}`}
          onClick={() => handleImageClick(image, index)} // Click to open in fullscreen
          style={{
            backgroundColor:"gray",
            width: '300px',
            height: '200px', // Set a consistent size for images
            objectFit: 'cover',
            cursor: 'pointer',
            marginLeft:"5px"
          }}
        />
       
      ))}
   </div>
 
) : (
  <p>No images available in the project</p>
)}

{/* Fullscreen Modal for the image */}
{isFullscreen && fullscreenImage && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}
    onClick={handleCloseModal} // Close modal when clicked outside the image
  >
    <div style={{ textAlign: 'center' }}>
      {/* Display the fullscreen image */}
      <img
        src={fullscreenImage}
        alt="Fullscreen preview"
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          objectFit: 'contain',
          cursor: 'pointer',
        }}
      />

      {/* Next Button (Arrow) */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleNextClick}
          style={{
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '20px',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&#8594;</span> {/* Right Arrow */}
        </button>
      </div>
    </div>
  </div>
)}

<div style={{marginTop:"40px"}}>
    <div className='row' >
        <div className='col-md-8' style={{height:"500px",overflowY:"scroll",marginBottom:"50px"}}>
            <div className='row' style={{width:"100%"}}>
                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjoHSjWp5fS5Vx1Hs_FzU5AA2Yz95xsdzGQ&s' style={{height:"20px"}}></img>Project Status</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.status}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://www.clipartmax.com/png/small/163-1630210_how-to-change-your-account-password-password-icon-png-green.png' style={{height:"20px"}}></img>Possession Date</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.possession}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://png.pngtree.com/png-vector/20230405/ourmid/pngtree-compass-icon-vector-compass-icon-compass-symbol-aiming-vector-web-vector-png-image_50791344.jpg' style={{height:"20px"}}></img>Facings</label>
                    <p style={{ fontSize: "12px", fontWeight: "bold",marginLeft:"20px" }}>
                        {project.add_unit?.map((item, index) => (
                            <span key={index}>{item.direction}</span>
                        ))}
                        </p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/512/5337/5337108.png' style={{height:"20px"}}></img>Project Sub-Type</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.sub_category?.join(',')}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/512/1504/1504898.png' style={{height:"20px"}}></img>Project Land Area</label>
                    <p style={{ fontSize: "12px", fontWeight: "bold",marginLeft:"20px" }}>
                        {project.land_area?.map((item, index) => (
                            <span key={index}>{item} {project.measurment1}</span>
                        ))}
                        </p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://www.citypng.com/public/uploads/preview/calendar-date-vector-flat-icon-png-7017516949739211umvfiwzkw.png' style={{height:"20px"}}></img>Start Date</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.launched_on}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/256/11339/11339990.png' style={{height:"20px"}}></img>End Date</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}>{project.expected_competion}</p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/512/2642/2642358.png' style={{height:"20px"}}></img>Bedrooms</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px"}}></p>
                    </div>

                    <div className='col-md-12'><label className='labels'><u>About Project</u></label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px",textAlign:"left"}}>
                    Located in the thriving Hebbal area, Four Seasons Private Residences at Embassy One is a premium residential complex.
                     Hebbal is the home to many IT companies and has witnessed rapid development,
                      making it a prime location. The society has great connectivity with Bellary Road, 
                      Bengaluru International Airport, and Hebbal Railway Station along with Yeshwantpur Metro.
                       The society offers an array of amenities, including a championship golf course, multiple swimming pools,
                        sports facilities, and a business centre.
                    </p>
                    </div>

                    <div className='col-md-12'><label className='labels'><u>Associated Banks</u></label>
                    <marquee direction="left" style={{ fontSize: "12px", fontWeight: "bold", marginLeft: "20px", textAlign: "left" }}>
                    {project.approved_bank?.map((bank, index) => (
                        <span key={index} style={{ marginRight: '15px' }}>
                        {bank === "Sbi" ? (
                            <>
                            <img 
                                src="https://www.freepnglogos.com/uploads/sbi-logo-png/state-bank-india-sbi-prelims-april-slot-analysis-archives-12.png" 
                                alt="SBI Icon" 
                                style={{ width: '150px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }} 
                            />
                          
                            </>
                        ) : (
                            bank
                        )}
                        </span>
                    ))}
                    </marquee>

                    </div>

                    <div className='col-md-12'><hr></hr></div>

                    <div className='col-md-12'><u>Unit Range</u></div>
                    <div className='col-md-12' style={{display:"inline-flex",gap:"20px",marginTop:"10px"}}>
                        {
                            project.add_unit?.map((unit)=>
                            (
                               
                               <button className='form-control form-control-sm' style={{width:"100px",}}>{unit.unit_no}</button>
                             
                            ))
                        }
                    </div>

                    <div className='col-md-12' style={{marginTop:"20px"}}><u>Amenities</u></div>
                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px"}}><u>Basic</u></div>
                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px"}}><u>Nearby</u></div>
                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px"}}><u>Featured</u></div>
                    <div className='col-md-12' style={{marginTop:"20px"}}><u>Project Walk-through</u></div>


            </div>
        </div>

        <div className='col-md-4'>

    </div>

</div>
</div>
</div>

  )
}

export default Projectpreview
