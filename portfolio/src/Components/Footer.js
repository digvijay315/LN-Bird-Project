import React from 'react'

function Footer() {
  return (
    <div>

<div>
        <div className='container-fluid bg-dark'>
            <div className='container  mt-5'>
                <div className='row'>

                  <div className='col-lg-3 col-sm-12 '>
                    <div className='p-2 pt-5'>
                        <img src="./img/logo.svg" alt="" className='bg-white   'style={{width:"100px" , padding:"10px" , borderRadius:"50%"}} />
                        <p className='pt-2 text-white' style={{fontSize:"15px"}}>At Ashbury International, we understand the importance of reliable and durable roofing materials that not only protect your property but also enhance its aesthetic appeal. With years of experience in the industry, we have established ourselves as trusted importers of high-quality roof shingles and stone-coated metal roofs.</p>
                    </div>

                  </div>
                  <div className='col-lg-3 col-sm-12'>

                    <div className='p-5 '>
                    <h4 className='pt-3  text-white'>Quick Links</h4>
                        <p>  <a className='text-decoration-none fw-bold text-white' href="#">Home</a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">About US</a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Gallery</a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Projects</a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Blog</a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Contacts</a></p>

                    </div>

                  </div>
                  <div className='col-lg-3 col-sm-12'>

                  <div className='p-5 '>
                    <h4 className='pt-3 pb-3 text-white'>Location</h4>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Dehradun</a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Pune</a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Delhi </a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Mumbai</a></p>
                        <p><a className='text-decoration-none fw-bold text-white' href="#">Banglore</a></p>


                    </div>


                  </div>
                  <div className='col-lg-3 col-sm-6'>
                    <div className='p-5'>
                        <h4 className='pt-3 pb-3 text-white'>Reach US</h4>
                        <p className='text-white'>Address: Curzon Rd, Dalanwala, <br /> Dehradun, Uttarakhand 248001</p>
                        <div className='pe-5  pt-3'>
                        <p className="bg-light text-danger rounded-pill p-2"> <i class="fa-solid fa-phone bg-danger p-1 text-white rounded-circle"></i> 9012301234</p>
                        <p className="bg-light text-danger rounded-pill  p-2"> <i class="fa-solid fa-phone bg-danger p-1 text-white rounded-circle"></i> 9917373000</p>

                        </div>


                    </div>

                  </div>


                </div>

            </div>

            <div className=' d-flex px-5 p-3 ' style={{justifyContent:"space-between"}}>
                <div className='text-white'>
                    <p>2024 All rights reserved</p>
                </div>
                <div className='text-white'>
                <i class="fa-brands fa-facebook fs-3 pe-3"></i>
                <i class="fa-brands fa-instagram fs-3"></i>
                </div>

            </div>



        </div>


    </div>

    </div>
  )
}

export default Footer