import React, { useState } from 'react';
import Navbar from './Navbar'
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Menubar from './Navbar';


function Home() {

  const cardData = [
    {
      id: 1,
      category: "web",
      title: "Digital Agency Template",
      src: "https://viavilab.com/codecanyon/mobility/upload/portfolio/digital-agency-template_1661849931-b.jpg",
      description: "Web Design",
    },
    {
      id: 2,
      category: "web",
      title: "Chatbot Web Template",
      src: "https://viavilab.com/codecanyon/mobility/upload/portfolio/chatbot-web-template_1661849953-b.jpg",
      description: "Web Design",
    },
    {
      id: 3,
      category: "graphics",
      title: "Digital Products Design",
      src: "https://viavilab.com/codecanyon/mobility/upload/portfolio/digital-products-design_1661849970-b.jpg",
      description: "Graphics Design",
    },
    {
      id: 4,
      category: "branding",
      title: "Corporate Branding",
      src: "https://viavilab.com/codecanyon/mobility/upload/portfolio/digital-agency-template_1661849998-b.jpg",
      description: "Branding Design",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  // Filter cards by category
  const filteredCards =
    activeCategory === "all"
      ? cardData
      : cardData.filter((card) => card.category === activeCategory);

  const handleFilter = (category) => {
    setActiveCategory(category);
  };


  

  const stats = [
    { id: 1, number: '900 +', description: 'Happy Clients' },
    { id: 2, number: '4000 +', description: 'Project Complete' },
    { id: 3, number: '25 +', description: 'Years Of Experience' },
    { id: 4, number: '140 +', description: 'Winning Awards' },
  ];




  return (
    <div>
<div>
    <Menubar/>
</div>
<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>
      <div className="carousel-inner">
      <div className="carousel-item active">
  <img
    src="https://viavilab.com/codecanyon/mobility/upload/slider/creative-modern-agency_1661838280-b.jpg"
    className="d-block w-100   image1"
    alt="Slide 1"
  />
  <div className="carousel-caption text-start " style={{marginBottom:"10rem"}}>
    <h5 className="display-5 fw-bold quicksand">Empowering Digital Transformation</h5>
    <p className="lead quicksand">
      We provide cutting-edge IT solutions to help businesses grow and innovate.
    </p>
    <button className="btn btn-primary btn-lg">Get Started</button>
  </div>
</div>

        <div className="carousel-item">
          <img
            src="https://viavilab.com/codecanyon/mobility/upload/slider/build-your-website_1661837514-b.jpg"
            className="d-block w-100  image1"
            alt="Slide 2"
          />
          <div className="carousel-caption quicksand" style={{marginBottom:"12rem", marginRight:"20rem"}}>
            <span style={{fontSize:"60px",fontWeight:"bold"}}>Innovative Solutions</span>
            <p>Providing unique strategies to achieve your goals effectively.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
        
        
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" style={{backgroundColor:"black",color:"white"}}></span>
        <span className="visually-hidden" >Next</span>
      </button>
    </div>


    {/* about us section start--------------------------------------------------------------------------- */}

    <div className='container' style={{marginTop:"3rem"}}>
    <div className="row" style={{display:"flex"}}>
  <div className="col-md-6">
    <img
      className="img-fluid animated-image"
      src="https://viavilab.com/codecanyon/mobility/upload/about_image.png"
      alt="About"
      style={{height:"35rem"}}
    />
  </div>
  <div className='col-md-6'>
    <span className='quicksand'  style={{fontSize:"30px",fontWeight:"bold",color:"#0e1970"}}>We Transform Ideas</span>
    <h5 className='quicksand' style={{marginTop:"2rem",color:"#0e1970"}}>25 Years Of Experience We Provide Solutions Agency</h5>
    <p className='quicksand'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur! totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur. recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam.</p>

    <p className='quicksand'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur.</p>

    

  </div>
</div>

    </div>


    {/* about us section end------------------------------------------------------------------------------- */}

    {/* service section start-------------------------------------------------------------------------------- */}

    <div className="container" style={{marginTop:"3rem"}}>
  <div
    className="row"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center", // Centers text inside the column
    }}
  >
    <div className="col">
      <h1 style={{color:"#0e1970"}}>Your Business Dreams</h1>
      <p style={{color:"#0e1970"}}>Lorem Ipsum has been the industry's standard dummy</p>
    </div>
  </div>
</div>




       <div className='container' style={{marginTop:"3rem"}}>
        <div className='row custom-row'>
          {/* 1 container */}
    <div
      className="col-md-4 service-box"
      style={{ display: "flex", gap: "15px" }}
    >
      <div className="image-container">
        <img
          className="service-image"
          src="https://viavilab.com/codecanyon/mobility/upload/service/1661848696.png"
          alt="Service"
        />
      </div>
      <div>
        <h3 style={{color:"#0e1970"}}>Modern Design</h3>
        <p style={{color:"black"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum dolor sit ame consectetur adipisicing.
        </p>
      </div>
    </div>
    {/* 2 container */}
    <div
      className="col-md-4 service-box"
      style={{ display: "flex", gap: "15px" }}
    >
      <div className="image-container">
        <img
          className="service-image"
          src="https://viavilab.com/codecanyon/mobility/upload/service/1661848763.png"
          alt="Service"
        />
      </div>
      <div>
        <h3 style={{color:"#0e1970"}}>Seo Marketing</h3>
        <p style={{color:"black"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum dolor sit ame consectetur adipisicing.
        </p>
      </div>
    </div>
    {/* 3 container */}
    <div
      className="col-md-4 service-box"
      style={{ display: "flex", gap: "15px" }}
    >
      <div className="image-container">
        <img
          className="service-image"
          src="https://viavilab.com/codecanyon/mobility/upload/service/1661848807.png"
          alt="Service"
        />
      </div>
      <div>
        <h3 style={{color:"#0e1970"}}>Easily Customize</h3>
        <p style={{color:"black"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum dolor sit ame consectetur adipisicing.
        </p>
      </div>
    </div>
    </div>

    {/* 2 row */}
    <div className='row custom-row' style={{marginTop:"2rem"}}>
          {/* 1 container */}
    <div
      className="col-md-4 service-box"
      style={{ display: "flex", gap: "15px" }}
    >
      <div className="image-container">
        <img
          className="service-image"
          src="https://viavilab.com/codecanyon/mobility/upload/service/1661848843.png"
          alt="Service"
        />
      </div>
      <div>
        <h3 style={{color:"#0e1970"}}>Social Media Marketing</h3>
        <p style={{color:"black"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum dolor sit ame consectetur adipisicing.
        </p>
      </div>
    </div>
    
    {/* 2 container */}
   
    <div
      className="col-md-4 service-box"
      style={{ display: "flex", gap: "15px" }}
    >
      <div className="image-container">
        <img
          className="service-image"
          src="https://viavilab.com/codecanyon/mobility/upload/service/1661848868.png"
          alt="Service"
        />
      </div>
      <div>
        <h3 style={{color:"#0e1970"}}>Strategy Business</h3>
        <p style={{color:"black"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum dolor sit ame consectetur adipisicing.
        </p>
      </div>
    </div>
    {/* 3 container */}
    <div
      className="col-md-4 service-box"
      style={{ display: "flex", gap: "15px" }}
    >
      <div className="image-container">
        <img
          className="service-image"
          src="https://viavilab.com/codecanyon/mobility/upload/service/1661848877.png"
          alt="Service"
        />
      </div>
      <div>
        <h3 style={{color:"#0e1970"}}>Market Analysis</h3>
        <p style={{color:"black"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum dolor sit ame consectetur adipisicing.
        </p>
      </div>
    </div>
    </div>
    </div>
   

     {/* service section end--------------------------------------------------------------------------------- */}

     {/* portfolio section start------------------------------------------------------------------------------ */}


    
      
     <div className="container" style={{marginTop:"8rem"}}>
  <div
    className="row"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center", 
    }}
  >
    <div className="col">
      <h1 style={{color:"#0e1970"}}>Our Portfolio</h1>
      <div className="button-group">
        <button
          className={`btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleFilter("all")}
        >
          Show All
        </button>
        <button
          className={`btn ${activeCategory === "branding" ? "active" : ""}`}
          onClick={() => handleFilter("branding")}
        >
          Branding Design
        </button>
        <button
          className={`btn ${activeCategory === "graphics" ? "active" : ""}`}
          onClick={() => handleFilter("graphics")}
        >
          Graphics Design
        </button>
        <button
          className={`btn ${activeCategory === "web" ? "active" : ""}`}
          onClick={() => handleFilter("web")}
        >
          Web Design
        </button>
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        {filteredCards.map((card) => (
          <div key={card.id} className="card">
            <img src={card.src} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

 {/* portfolio section end---------------------------------------------------------------------------------- */}


 {/* Features section start----------------------------------------------------------------------------------- */}

<section className='features-main' style={{marginTop:"3rem"}}>
<div className="container">
  <div
    className="row "
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center", // Centers text inside the column
    }}
  >
    <div className="col" style={{marginTop:"7rem"}}>
      <h1 style={{color:"#0e1970"}}>Awesome Features</h1>
      <p style={{color:"#0e1970"}}>Lorem ipsum dolor sit amet</p>
    </div>
  </div>

  <div className="row custom-row1" style={{  margin: "2rem 0" }}>
    {/* first card */}
  <div
    className="col-md-4 feature-card"
    style={{
      backgroundColor: "#F8F3E9",
      borderRadius: "15px",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <i
      className="fas fa-mobile"
      style={{
        fontSize: "4rem",
        color: "#007BFF",
        marginBottom: "1rem",
      }}
    ></i>
    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0e1970", marginBottom: "1rem" }}>
      100% Responsive
    </h1>
    <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut
      voluptatum reiciendis temporibus qui quibusdam.
    </p>
  </div>
  {/* second card */}
  <div
    className="col-md-4 feature-card"
    style={{
      backgroundColor: "#f1380026",
      borderRadius: "15px",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <i
      className="fas fa-lightbulb"
      style={{
        fontSize: "4rem",
        color: "#007BFF",
        marginBottom: "1rem",
      }}
    ></i>
    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0e1970", marginBottom: "1rem" }}>
    Creative Ideas
    </h1>
    <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut
      voluptatum reiciendis temporibus qui quibusdam.
    </p>
  </div>

  {/* third card */}

  <div
    className="col-md-4 feature-card"
    style={{
      backgroundColor: "#20B71426",
      borderRadius: "15px",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <i
      className="fas fa-gift"
      style={{
        fontSize: "4rem",
        color: "#007BFF",
        marginBottom: "1rem",
      }}
    ></i>
    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0e1970", marginBottom: "1rem" }}>
    Easy Options
    </h1>
    <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut
      voluptatum reiciendis temporibus qui quibusdam.
    </p>
  </div>
</div>

{/* second row ------------------------------------------------------------------------------------------------ */}

<div className="row custom-row1" style={{  margin: "2rem 0" }}>
    {/* first card */}
  <div
    className="col-md-4 feature-card"
    style={{
      backgroundColor: "#7800FF26",
      borderRadius: "15px",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <i
      className="fas fa-magic"
      style={{
        fontSize: "4rem",
        color: "#007BFF",
        marginBottom: "1rem",
      }}
    ></i>
    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0e1970", marginBottom: "1rem" }}>
     
Great Animations
    </h1>
    <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut
      voluptatum reiciendis temporibus qui quibusdam.
    </p>
  </div>
  {/* second card */}
  <div
    className="col-md-4 feature-card"
    style={{
      backgroundColor: "#2667FF26",
      borderRadius: "15px",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <i
      className="fas fa-cogs"
      style={{
        fontSize: "4rem",
        color: "#007BFF",
        marginBottom: "1rem",
      }}
    ></i>
    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0e1970", marginBottom: "1rem" }}>
    Multi-Purpose
    </h1>
    <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut
      voluptatum reiciendis temporibus qui quibusdam.
    </p>
  </div>

  {/* third card */}

  <div
    className="col-md-4 feature-card"
    style={{
      backgroundColor: "#FF32AB26",
      borderRadius: "15px",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <i
      className="fas fa-life-ring"
      style={{
        fontSize: "4rem",
        color: "#007BFF",
        marginBottom: "1rem",
      }}
    ></i>
    <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0e1970", marginBottom: "1rem" }}>
    Unlimited Support
    </h1>
    <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut
      voluptatum reiciendis temporibus qui quibusdam.
    </p>
  </div>
</div>

</div>

</section>

 {/* Features section end--------------------------------------------------------------------------------------- */}

{/* team section start------------------------------------------------------------------------------- */}
<div className="container" style={{marginTop:"3rem"}}>
  <div
    className="row"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center", // Centers text inside the column
    }}
  >
    <div className="col">
      <h1 style={{color:"#0e1970"}}>Meet the Team</h1>
      <p style={{color:"#0e1970"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
  </div>

  <div className='row team-row'>
    {/* first card ------------------------------------------------------------------------------------------ */}
    <div className='col-md-4 team-member'>
      <div className='team-image'>
        <img className='img-fluid' src='https://viavilab.com/codecanyon/mobility/upload/team/geraldo-m-lundy_1661855101-b.jpg' style={{height:"17rem", marginTop:"2rem",borderRadius:"10px"}}></img>

      </div>
    <div>
    <h5>Geraldo M. Lundy</h5>
    <span>Co-Founder</span>
    </div>

    </div>
    {/* second card --------------------------------------------------------------------------------------- */}
    <div className='col-md-4 team-member'>
      <div className='team-image'>
        <img className='img-fluid' src='https://viavilab.com/codecanyon/mobility/upload/team/john-doe_1661855132-b.jpg' style={{height:"17rem", marginTop:"2rem",borderRadius:"10px"}}></img>

      </div>
    <div>
    <h5>John Doe</h5>
    <span>Analyst</span>
    </div>

    </div>
    {/* third card---------------------------------------------------------------------------------------- */}
    <div className='col-md-4 team-member'>
      <div className='team-image'>
        <img className='img-fluid' src='	https://viavilab.com/codecanyon/mobility/upload/team/sevin-p-gonzalez_1661855491-b.jpg' style={{height:"17rem", marginTop:"2rem",borderRadius:"10px"}}></img>

      </div>
    <div>
    <h5>Sevin P. Gonzalez</h5>
    <span>Developer</span>
    </div>

    </div>

  </div>

  {/* second row------------------------------------------- */}
  <div className='row team-row' style={{marginTop:"2rem"}}>
    {/* first card ------------------------------------------------------------------------------------------ */}
    <div className='col-md-4 team-member'>
      <div className='team-image'>
        <img className='img-fluid' src='	https://viavilab.com/codecanyon/mobility/upload/team/michael-k-walker_1661855509-b.jpg' style={{height:"17rem", marginTop:"2rem",borderRadius:"10px"}}></img>

      </div>
    <div>
    <h5>Michael K. Walker</h5>
    <span>Designer</span>
    </div>

    </div>
    {/* second card --------------------------------------------------------------------------------------- */}
    <div className='col-md-4 team-member'>
      <div className='team-image'>
        <img className='img-fluid' src='	https://viavilab.com/codecanyon/mobility/upload/team/steven-h-brown_1661855554-b.jpg' style={{height:"17rem", marginTop:"2rem",borderRadius:"10px"}}></img>

      </div>
    <div>
    <h5>Steven H. Brown</h5>
    <span>Graphic designer</span>
    </div>

    </div>
    {/* third card---------------------------------------------------------------------------------------- */}
    <div className='col-md-4 team-member'>
      <div className='team-image'>
        <img className='img-fluid' src='https://viavilab.com/codecanyon/mobility/upload/team/dana-j-bingham_1661855601-b.jpg' style={{height:"17rem", marginTop:"2rem",borderRadius:"10px"}}></img>

      </div>
    <div>
    <h5>Dana J. Bingham</h5>
    <span>Senior Manager</span>
    </div>

    </div>

  </div>
  </div>

{/* team section end--------------------------------------------------------------------------- */}

{/* happy client start---------------------------------------------------------------------------- */}


<div className="stats-section">
      <div className="container">
        <div className="row text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="col-md-3 stats-card">
              <p className="stat-number">{stat.number}</p>
              <h5 className="stat-description">{stat.description}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>

  




{/* happy client end-------------------------------------------------------------------------------- */}






    </div>
  )
}

export default Home