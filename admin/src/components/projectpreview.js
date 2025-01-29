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
    <div style={{overflow:"hidden",paddingLeft:"120px",paddingRight:"120px",paddingTop:"50px",  backgroundImage: 'url(https://www.zmo.ai/wp-content/uploads/2023/09/powerpoint-slide-with-white-background-SB02298-min-scaled.jpg)',backgroundSize: 'cover',backgroundRepeat:"repeat",height:"auto"}}>
  
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
                    <p style={{ fontSize: "12px", fontWeight: "bold",marginLeft:"20px",wordWrap: "break-word" }}>
                        {project.add_unit?.map((item, index) => (
                            <span key={index}>{item.direction}</span>
                        ))}
                        </p>
                    </div>

                    <div className='col-md-3'>
                    <label className='labels' style={{marginLeft:"5px",fontSize:"12px"}}><img src='https://cdn-icons-png.flaticon.com/512/5337/5337108.png' style={{height:"20px"}}></img>Project Sub-Type</label>
                    <p style={{fontSize:"12px",fontWeight:"bold",marginLeft:"20px",wordWrap: "break-word"}}>{project.sub_category?.join(',')}</p>
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
                        {bank === "State Bank of India" ? (
                            <>
                            <img 
                                src="https://www.freepnglogos.com/uploads/sbi-logo-png/state-bank-india-sbi-prelims-april-slot-analysis-archives-12.png" 
                                alt="SBI Icon" 
                                style={{ width: '150px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }} 
                            />
                          
                            </>
                        ) : bank === "Axis Bank" ? (
                            <>
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/2560px-Axis_Bank_logo.svg.png" 
                                alt="SBI Icon" 
                                style={{ width: '150px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }} 
                            />
                          
                            </>
                        ) : bank === "ICICI Bank" ? (
                            <>
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/2560px-ICICI_Bank_Logo.svg.png" 
                                alt="SBI Icon" 
                                style={{ width: '150px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }} 
                            />
                          
                            </>
                        ) :(
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
                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px",fontWeight:"bold",marginBottom:"10px",color:"blue"}}><u>Basic</u></div>
                        
                    {
                    project.basic_aminities?.map((item, index) => (
                        <div className='col-md-2' key={index}>
                        {item === "24x7 Water Supply" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/waterSupply.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Car Parking" ? (
                            <>
                            <img 
                                src="	https://training.leadrat.com/assets/amenities-icons/CAR%20parking.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Intercom" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/intercom.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Multi-Purpose Hall" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/multipurpose%20hall.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Municipal Water Supply" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/waterSupply.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Garbage Management System" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/garbage.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Fire Fighting System" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/fire-protection-1724182-1464021.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Visitor Car Parking" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3420/3420275.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Earthquake Resistance" ? (
                            <>
                            <img 
                                src="https://img.icons8.com/?size=160&id=wwGvmjaFovuy&format=png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Lift" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lift-2028518-1712621.png?f=webp&w=256" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Maintenance Staff" ? (
                            <>
                            <img 
                                src="https://icons.veryicon.com/png/o/file-type/color-administrative-simple-icon/maintenance-worker.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Power Supply" ? (
                            <>
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/032/534/022/non_2x/uninterrupted-power-supply-icon-vector.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Air Condition" ? (
                            <>
                            <img 
                                src="https://previews.123rf.com/images/ylivdesign/ylivdesign2110/ylivdesign211005077/175844307-air-conditioner-icon-outline-air-conditioner-vector-icon-color-flat-isolated.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Security" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9767/9767122.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Bike Parking" ? (
                            <>
                            <img 
                                src="https://i.fbcd.co/products/resized/resized-750-500/2-aeb047d180a347464eba71fd1b87d9889c9d39b7ce48329fe258e4dde18a6754.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Others" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/8382/8382949.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :(
                            item
                        )}
                        </div>
                    ))
                    }

                       

                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px",fontWeight:"bold",marginBottom:"10px",color:"blue"}}><u>Nearby</u></div>
                    
                    {
                    project.nearby_aminities?.map((item, index) => (
                        <div className='col-md-2' key={index}>
                        {item.destination === "Bus Stop" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Bus%20stop.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : 
                        item.destination === "Atm" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/ATM.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginLeft: '-10px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : item.destination === "Airport" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Airport.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Bank" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/bank.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginLeft: '-10px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Church" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/church.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Mosque" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Mosque.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Park" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/park.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : item.destination === "Railway Station" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Railway%20station.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : item.destination === "Restaurants" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Restaurant.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) : item.destination === "School" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/school.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Super Market" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Supermarket.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :  item.destination === "Temple" ? (
                            <>
                            <img 
                                src="https://training.leadrat.com/assets/amenities-icons/Temple.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item.destination}</p>
                            </>
                        ) :   (
                        
                            item.destination
                        )}
                        </div>
                    ))
                    }

                    
                    <div className='col-md-12' style={{marginTop:"20px",marginLeft:"20px",fontWeight:"bold",marginBottom:"10px",color:"blue"}}><u>Featured</u></div>

                    {
                    project.features_aminities?.map((item, index) => (
                        <div className='col-md-2' key={index}>
                        {item === "Seniour Citizen Corner" ? (
                            <>
                            <img 
                                src="https://www.shutterstock.com/image-vector/elderly-person-icon-vector-illustration-260nw-2406157383.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : 
                        item === "Worship Place" ? (
                            <>
                            <img 
                                src="https://www.svgrepo.com/show/396643/hindu-temple.svg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "HAVC System" ? (
                            <>
                            <img 
                                src="https://static.vecteezy.com/system/resources/previews/027/362/165/non_2x/hvac-technician-icon-free-vector.jpg" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Cricket Pitch" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/cricket-pitch-1484568-1256595.png?f=webp&w=256" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Two Tier Security" ? (
                            <>
                            <img 
                                src="https://cdn3d.iconscout.com/3d/premium/preview/home-security-3d-icon-download-in-png-blend-fbx-gltf-file-formats--secure-house-protection-safe-cyber-pack-icons-4468790.png?f=webp&h=700" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Cafeteria" ? (
                            <>
                            <img 
                                src="https://img.lovepik.com/png/20231122/restaurant-icon-with-table-and-chairs-in-the-center-vector_668376_wh860.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Car Washing Area" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/1144/1144264.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "No Common Wall" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/8233/8233286.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Driver Dormitory" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3663/3663802.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "EPABX System" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/1555/1555391.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "CCTV" ? (
                            <>
                            <img 
                                src="https://img.pikbest.com/origin/09/22/57/168pIkbEsTePr.png!sw800" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Gymaasium" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/6750/6750831.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Garden" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/366/366969.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Power Back Up" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9163/9163699.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : 
                        item === "Party Lawn" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/party-1969058-1666648.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Gazebo" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-an-isometric-image-of-an-old-gazebo-vector-png-image_6963273.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Cold Storage" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/16133/16133272.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Solar Water Heater" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/solar-water-heating-3762071-3138631.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Jogging Track" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/5024/5024659.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "DTH Connection" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/free/png-256/free-dth-icon-download-in-svg-png-gif-file-formats--direct-to-home-signal-network-dish-antenna-payment-e-wallet-pack-commerce-shopping-icons-1538051.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Three Tier Security" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20250118/ourlarge/pngtree-set-of-colorful-shield-and-padlock-icons-symbolizing-security-protection-privacy-png-image_15263816.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Smoking Area" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9830/9830826.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Spa & Saloon" ? (
                            <>
                            <img 
                                src="https://w7.pngwing.com/pngs/507/668/png-transparent-free-beauty-icons-thumbnail.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Solar Power" ? (
                            <>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IQQAexEDoqwU9PhHze3WLx28zm7TG2UrGA&s" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Video Door Phone" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/8957/8957802.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Utility Shop" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/438/438560.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Steam Room" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20190701/ourmid/pngtree-steam-room-icon-for-your-project-png-image_1533387.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : 
                        item === "Amphi Theatre" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20230729/ourmid/pngtree-auditorium-clipart-theatre-stage-with-a-flat-design-cartoon-vector-png-image_6804730.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Private Car Parking" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9343/9343062.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Guest Room" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/guest-bedroom-9851918-7997063.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Internet" ? (
                            <>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ17fzKIdVl4osjm2tvTFj7rbnzq5Z_EqYcRQ&s" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Cafeteria" ? (
                            <>
                            <img 
                                src="https://img.lovepik.com/png/20231122/restaurant-icon-with-table-and-chairs-in-the-center-vector_668376_wh860.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Car Washing Area" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/1144/1144264.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "No Common Wall" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/8233/8233286.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Driver Dormitory" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3663/3663802.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "EPABX System" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/1555/1555391.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "CCTV" ? (
                            <>
                            <img 
                                src="https://img.pikbest.com/origin/09/22/57/168pIkbEsTePr.png!sw800" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Gymaasium" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/6750/6750831.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Garden" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/366/366969.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Power Back Up" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9163/9163699.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}/>
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : 
                        item === "Party Lawn" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/party-1969058-1666648.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Gazebo" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-an-isometric-image-of-an-old-gazebo-vector-png-image_6963273.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold",}}>{item}</p>
                            </>
                        ) :  item === "Cold Storage" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/16133/16133272.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Solar Water Heater" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/solar-water-heating-3762071-3138631.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Jogging Track" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/5024/5024659.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "DTH Connection" ? (
                            <>
                            <img 
                                src="https://cdn.iconscout.com/icon/free/png-256/free-dth-icon-download-in-svg-png-gif-file-formats--direct-to-home-signal-network-dish-antenna-payment-e-wallet-pack-commerce-shopping-icons-1538051.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Three Tier Security" ? (
                            <>
                            <img 
                                src="https://png.pngtree.com/png-vector/20250118/ourlarge/pngtree-set-of-colorful-shield-and-padlock-icons-symbolizing-security-protection-privacy-png-image_15263816.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Smoking Area" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/9830/9830826.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Spa & Saloon" ? (
                            <>
                            <img 
                                src="https://w7.pngwing.com/pngs/507/668/png-transparent-free-beauty-icons-thumbnail.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Solar Power" ? (
                            <>
                            <img 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IQQAexEDoqwU9PhHze3WLx28zm7TG2UrGA&s" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :  item === "Video Door Phone" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.freepik.com/512/8957/8957802.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) : item === "Utility Shop" ? (
                            <>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/438/438560.png" 
                                alt="Water Supply Icon" 
                                style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }}
                            />
                                    <p style={{fontSize:"12px",fontWeight:"bold"}}>{item}</p>
                            </>
                        ) :(
                        
                            item.destination
                        )}
                        </div>
                    ))
                    }

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
