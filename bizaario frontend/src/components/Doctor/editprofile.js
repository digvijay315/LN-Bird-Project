import React from "react";
import image from "../../assets/Vector (2).png"
import image1 from "../../assets/gender-female-svgrepo-com 1.png"
import image2 from "../../assets/subscriptions-svgrepo-com 1.png"
import image3 from "../../assets/schedule-icon 1.png"
import "../Doctor/stylingcss/editprofile.css"
import Doctorheader from "./doctorheader";
import Doctorsidebar from "./doctorsidebar";
// You can replace this with your own classnames helper if needed
// Here it's unused so just a stub
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Editdoctorprofile() {
  return (
    <>
    <Doctorheader/>
    <Doctorsidebar/>
    <div className="min-h-screen bg-background">
      <div className="ml-0 lg:ml-64 pt-24">
        <div className=" mx-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
          {/* Profile Header */}
          <h1 className="text-3xl font-semibold text-black">Profile</h1>

          {/* Main Profile Card */}
<div className="rounded-lg bg-[#EFEFEF]  p-4 sm:p-6 lg:p-8" id="profile-main">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
    
    {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-start sm:gap-6 text-start sm:text-left" id="profile-info">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/9997f9eac67ba2ec10d1c5ce5554dfaf9ba61a75?width=218"
        alt="Dr. Dominic Stonehart"
        className="h-20 w-20 sm:h-28 sm:w-28 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 space-y-3 mt-4 sm:mt-0 text-left" id="profile-card">
        <div className=" profil-info space-y-2">
          <h2 className="mt-0 mr-10 ml-1 sm:mt-2 mb-1 sm:mb-3 text-lg sm:text-2xl font-semibold text-black" >
            Dr. Dominic Stonehart
          </h2>
          <p className="text-black/75 text-sm sm:text-base">
            MBBS [Consultant Cardiologist]
          </p>
          <p className="text-black/75 text-sm">
            Specializes in: Interventional Cardiology, Heart Failure Management, Preventive Cardiology
          </p>
        </div>

        {/* Details */}
        <div  className="flex flex-wrap mr-10 ml-0 justify-start gap-2 w-full text-sm text-black/75">
          <div id="detail-date" className="flex items-start gap-2 ">
            <img src={image} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 21">
            
            </img>
            <span>20/12/2025</span>
          </div>

          <div id="detail-gen"  className="flex items-start gap-2">
            <img src={image1} className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
             
            </img>
            <span>Male</span>
          </div>

          <div id="detail-digital"  className="flex items-start sm:items-center sm:text-base sm:flex  gap-2">
            <img  src={image2} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 21">
            
            </img>
            <span>Digital CME</span>
          </div>
        </div>
      </div>
    </div>

    {/* Buttons */}
  {/* <div id="profile-button" className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
  <button id="profile-edit" className="group w-full sm:w-auto rounded-md bg-[#F86F03] text-white border border-[#F86F03] px-4 py-2 font-semibold text-sm lg:text-base transition-colors duration-300 hover:bg-white hover:border-[#F86F03]">
    <span className="group-hover:text-[#F86F03]">Edit Profile</span>
  </button>

  <button id="profile-share" className="group w-full sm:w-auto rounded-md bg-[#F86F03] text-white border border-[#F86F03] px-4 py-2 font-semibold text-sm lg:text-base transition-colors duration-300 hover:bg-white hover:border-[#F86F03]">
    <span className="group-hover:text-[#F86F03]">Share Profile</span>
  </button>
    </div> */}
  </div>
</div>

          {/* Personal Information */}
          <div id="personal-detail" className="space-y-8">
            <h2 id="pernonal-information" className="text-3xl font-semibold text-black" >Personal Information's</h2>

            {/* Contact Details */}
            <div id="contact-detail" className="rounded-lg bg-[#EFEFEF] p-8" >
              <div id="contact" className="contact-head flex items-start justify-between mb-6">
                <h3 className="text-2xl ml-10 font-medium text-black">Contact Details</h3>
                <button className="p-2">
                  <svg className=" edit-button h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-6">
                   <div className="flex flex-wrap justify-center sm:justify-center gap-6 text-sm text-black/75">
                  <div id="contact-no" className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
                      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17.5012 9.66663C17.5012 5.98477 14.5164 3 10.8345 3M11.6677 6.43832C12.8392 6.73978 13.7613 7.66198 14.0628 8.83338M13.3861 12.3756C13.8387 11.772 14.6582 11.5786 15.333 11.916L16.3625 12.4307C17.0347 12.7669 17.3988 13.5113 17.2514 14.2483L16.9357 15.8269C16.7799 16.606 16.0935 17.1789 15.3041 17.0896C9.25149 16.405 4.09619 11.2496 3.41152 5.19708C3.32222 4.40765 3.89518 3.72123 4.67422 3.56543L6.2528 3.24971C6.9898 3.10231 7.73426 3.46641 8.07038 4.13865L8.58508 5.16812C8.9225 5.8429 8.72908 6.66241 8.1255 7.11507C7.73242 7.40988 7.49276 7.88342 7.68271 8.33656C8.33558 9.89405 10.6071 12.1655 12.1646 12.8184C12.6177 13.0084 13.0912 12.7687 13.3861 12.3756Z" />
                    </svg>
                    <span className="text-lg text-black/70">+91 5252525252</span>
                  </div>
                  <div id="contact-mail" className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.33203 6.33329L8.4987 10.2083C9.38761 10.8749 10.6098 10.8749 11.4987 10.2083L16.6654 6.33325" />
                      <path strokeLinecap="round" strokeWidth={2} d="M15.8333 4.66675H4.16667C3.24619 4.66675 2.5 5.41294 2.5 6.33341V14.6667C2.5 15.5872 3.24619 16.3334 4.16667 16.3334H15.8333C16.7538 16.3334 17.5 15.5872 17.5 14.6667V6.33341C17.5 5.41294 16.7538 4.66675 15.8333 4.66675Z" />
                    </svg>
                    <span className="text-lg text-black/70">rjvijs42@gmail.com</span>
                  </div>
                  <div id="contact-site" className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
                      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17.5 10.5C17.5 14.6422 14.1422 18 10 18M17.5 10.5C17.5 6.35787 14.1422 3 10 3M17.5 10.5C17.5 11.8807 14.1422 13 10 13C5.85787 13 2.5 11.8807 2.5 10.5M17.5 10.5C17.5 9.11925 14.1422 8 10 8C5.85787 8 2.5 9.11925 2.5 10.5M10 18C5.85787 18 2.5 14.6422 2.5 10.5M10 18C8.61925 18 7.5 14.6422 7.5 10.5C7.5 6.35787 8.61925 3 10 3M10 18C11.3807 18 12.5 14.6422 12.5 10.5C12.5 6.35787 11.3807 3 10 3M10 3C5.85787 3 2.5 6.35787 2.5 10.5" />
                    </svg>
                    <span className="text-lg text-black/70">www.papayapalette.com</span>
                  </div>
                </div>
                <div id="contact-address" className="flex justify-start ml-10 items-start gap-2 col-span-1 md:col-span-2" >
                  <svg className="h-5 w-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 20 21">
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M10.0013 18C12.918 15 15.8346 12.3137 15.8346 9C15.8346 5.68629 13.223 3 10.0013 3C6.77964 3 4.16797 5.68629 4.16797 9C4.16797 12.3137 7.08464 15 10.0013 18Z" />
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9.9987 10.5001C10.9192 10.5001 11.6654 9.75391 11.6654 8.83341C11.6654 7.91294 10.9192 7.16675 9.9987 7.16675C9.0782 7.16675 8.33203 7.91294 8.33203 8.83341C8.33203 9.75391 9.0782 10.5001 9.9987 10.5001Z" />
                  </svg>
                  <span className="text-lg text-black/70">H-Block, Sector-63, Noida, Uttar Pradesh, 201301,India</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="rounded-lg bg-[#EFEFEF] p-8">
              <div id="bio-page" className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-medium text-black">Bio</h3>
                <button className="p-2">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                  </svg>
                </button>
              </div>
              <p className="text-lg text-black/70 leading-relaxed">
                Dr. Stonehart is a qualified and experienced Cardiologist with a strong commitment to patient care and clinical excellence. 
                With 15+ years of experience, they focus on accurate diagnosis, personalized treatment, and overall well-being of patients. 
                Known for a patient-first approach, Dr. Stonehart combines evidence-based medicine with cutting-edge technologies to deliver 
                personalized treatment plans tailored to each patient's unique needs. He/she is also actively involved in continuing medical 
                education (CME) and has contributed to several clinical case studies and medical publications. Dr. Stonehart has been associated 
                with leading hospitals and cardiac centers, and is recognized for building lasting relationships with patients through compassionate 
                communication and comprehensive follow-up care. Passionate about heart health awareness, Dr. Stonehart often participates in 
                community outreach programs and public health talks.
              </p>
            </div>

            {/* Bio Video */}
            <div className="rounded-lg bg-[#EFEFEF] p-8">
              <div id="bio-video"  className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-medium text-black">Bio Video</h3>
                <button className="p-2">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b4442216d84ab5e6644599cdf6020a0995d0f56f?width=1744"
                  alt="Bio Video"
                  className="w-full max-w-4xl h-96 object-cover rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <svg className="h-8 w-8 text-primary ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18L21 12L9 6v12z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Gallery */}
            <SectionWithImages title="Gallery" />

            {/* Work Experience */}
    <div  className=" bg-[#EFEFEF] rounded-lg p-6">
      {/* Header */}
      <div className="work-experience flex items-center justify-between mb-8">
        <div className="work-experience-heading ">
        <h3 className=" text-2xl font-semibold text-black">Work Experience</h3>
        </div>
        <div className="work-experincemain flex items-center gap-3">
          <button  className=" hover:bg-gray-200 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.67}
                d="M8 16H16M16 16H24M16 16V24M16 16V8"
              />
            </svg>
          </button>
          <button className="hover:bg-gray-200 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.67}
                d="M26.866 10.587L11.04 26.413c-1.414 1.427-5.64 2.08-6.6 1.133s.72-5.173 2.133-6.6L21.4 5.12A4 4 0 0 1 26.8 5.186a4 4 0 0 1 .133 5.401z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Items */}
      <div id="award-item" className=" space-y-6">
        <WorkExperienceItem
          logo="https://api.builder.io/api/v1/image/assets/TEMP/1b856e809c7235f840a5c224f76e47c868c95e60?width=96"
          title="AIIMS, New Delhi"
          role="Resident Cardiologist (2012–2015)"
        />
        <WorkExperienceItem
          logo="https://api.builder.io/api/v1/image/assets/TEMP/37d612ef2d04bd57f62d9badeba6f3eabec40bbd?width=96"
          title="Fortis Heart Institute, Delhi"
          role="Visiting Consultant (2015–2017)"
        />
        <WorkExperienceItem
          logo="https://api.builder.io/api/v1/image/assets/TEMP/ab51d5d6f6aed86b4b2f0be8e8f967b08496c725?width=96"
          title="Apollo Hospitals, Chennai"
          role="Senior Cardiologist (2017–Present)"
        />
      </div>
    </div>

            {/* Awards & Certificates */}
            <div className="rounded-lg bg-[#EFEFEF] p-8">
              <div  id="award" className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-medium text-black">Awards & Certificates</h3>
                <div className="flex items-center gap-4">
                  <button className="p-2">
                    <svg id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
                    </svg>
                  </button>
                  <button className="p-2">
                    <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <AwardItem />
                <AwardItem />
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="rounded-lg bg-[#EFEFEF] p-8">
              <div id="event-heading"  className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-medium text-black">Upcoming Events</h3>
                <div id="event" className="flex items-center gap-4">
                  <button className="p-2">
                    <svg id="plus-button" className="h-8 w-8 " fill="none" stroke="currentColor" viewBox="0 0 32 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
                    </svg>
                  </button>
                  <button className="p-2">
                    <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/78cd663e8fbd2f1e31e98694bf3785684e685deb?width=1494"
                alt="Upcoming Events"
                className="w-full max-w-4xl h-90 object-cover rounded-lg sm:w-full sm:h-full"
                id="event-img"
              />
            </div>

            {/* Digital CME Contents */}
            <SectionWithVideoGrid title="Digital CME Contents" />

            {/* Innovative Case Studies */}
            <SectionWithCaseStudies title="Innovative Case Studies" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// Helper Components
function WorkExperienceItem({ logo, title, role }) {
  return (
    <div className=" work-experience-item sm:w-full sm:h-full sm:gap-2 flex ml-10 flex-wrap justify-start gap-4">
      <img src={logo} alt={title} className="h-12 w-12 rounded-full object-cover"
       />
      <div>
        <h4 className="text-lg font-semibold text-black">{title}</h4>
        <p className="text-xs sm:text-sm text-black/50">{role}</p>
      </div>
    </div>
  );
}

function AwardItem() {
  return (
    <div id="award-image" className="flex  items-start gap-2">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/6b9cac229d3f7e85fc4fb86003b5504fb855a96b?width=186"
        alt="Award"
        className="h-24 w-24 mt-3 rounded-xl object-cover"
      />
      <div id="award-container" className="flex-1 space-y-3">
        <div>
          <h4 id="award-header" className="text-xl ml-0  font-medium text-black">🏅 Best Cardiologist 2022</h4>
          <p id="award-page" className="text-xs ml-3 text-black/75 font-medium">Indian Medical Association</p>
        </div>
               <p id="award-page2" className="text-xs ml-3 text-black/75">I has received multiple awards for excellence in cardi.....</p>
      <div id="award-certificate" className=" flex mb-5  items-center justify-start gap-6">
  {/* Date */}
  <div id="award-date" className="flex  ml-3 items-center gap-2">
    <svg className="h-4 w-4 text-black/50" fill="currentColor" viewBox="0 0 15 15">
      <path d="M4.375 6.25H10.625M4.375 8.75H7.5M4.375 1.875V3.125M10.625 1.875V3.125M3.875 13.125H11.125C11.8251 13.125 12.1751 13.125 12.4425 12.9887C12.6777 12.8689 12.8689 12.6777 12.9887 12.4425C13.125 12.1751 13.125 11.8251 13.125 11.125V5.125C13.125 4.42493 13.125 4.0749 12.9887 3.80751C12.8689 3.57231 12.6777 3.38108 12.4425 3.26124C12.1751 3.125 11.8251 3.125 11.125 3.125H3.875C3.17494 3.125 2.8249 3.125 2.55751 3.26124C2.32231 3.38108 2.13108 3.57231 2.01124 3.80751C1.875 4.0749 1.875 4.42493 1.875 5.125V11.125C1.875 11.8251 1.875 12.1751 2.01124 12.4425C2.13108 12.6777 2.32231 12.8689 2.55751 12.9887C2.8249 13.125 3.17493 13.125 3.875 13.125Z" />
    </svg>
    <span className="text-xs font-semibold text-black/75">15/05/2022</span>
   </div>

  {/* View Certificate */}
    <div id="view-cirtificate" className="flex items-center gap-2">
    <svg className="h-4 w-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 15 15">
      <path strokeLinecap="round" strokeWidth={1.25} d="M8.75 7.5C8.75 9.22587 7.35087 10.625 5.625 10.625H4.375C2.64911 10.625 1.25 9.22587 1.25 7.5C1.25 5.77411 2.64911 4.375 4.375 4.375H4.6875M6.25 7.5C6.25 5.77411 7.64912 4.375 9.375 4.375H10.625C12.3509 4.375 13.75 5.77411 13.75 7.5C13.75 9.22587 12.3509 10.625 10.625 10.625H10.3125" />
    </svg>
    <span className="text-xs font-semibold text-primary underline">View Certificate</span>
    </div>
    </div>
     </div>
    </div>
  );
}

function SectionWithImages({ title }) {
  return (
    <div className="rounded-lg bg-[#EFEFEF] p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-medium text-black">{title}</h3>
        <div id="gallary" className="flex items-center gap-4">
          <button className="p-2">
            <svg id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
            </svg>
          </button>
          <button className="p-2">
            <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className=" gallery-image grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-6">
  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
      <img
        src={`https://api.builder.io/api/v1/image/assets/TEMP/${
          i === 1
            ? "ddb409042be3f954b59b0cb47684677d7ce51356"
            : i === 2
            ? "5be83afe340568f7c4a5e93394b0873bd9c183e8"
            : i === 3
            ? "466794a463d5c4b31f51dadb0efd3575c3d75668"
            : i === 4
            ? "b91d0df4656ba3c498568d86fb50f046a1eec901"
            : i === 5
            ? "f646eac8358748baa02029528f08353b95402dbe"
            : i === 6
            ? "66a564adca9fb765b3def09045f0af645b0c88c6"
            : i === 7
            ? "f646eac8358748baa02029528f08353b95402dbe"
            : "f5ddc7a342a5cbc930459f63cf40f1829fea19ce"
        }?width=336`}
        alt={`Gallery ${i}`}
        className="w-full h-full object-cover"
      />
    </div>
  ))}
</div>
    </div>
  );
}

function SectionWithVideoGrid({ title }) {
  return (
    <div className="rounded-lg bg-[#EFEFEF] p-8">
      <div id="digital-cme" className="flex items-center justify-between mb-8">
        <h3  className="text-2xl font-medium text-black">{title}</h3>
        <div className="function-button flex items-center gap-4">
          <button className="p-2">
            <svg id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
            </svg>
          </button>
          <button className="p-2">
            <svg id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <VideoCard key={i} />
        ))}
      </div>
    </div>
  );
}

function SectionWithCaseStudies({ title }) {
  return (
    <div className="rounded-lg bg-[#EFEFEF] p-8">
      <div className=" case-study flex items-center justify-between mb-8">
        <h3  className="text-2xl font-medium text-black">{title}</h3>
        <div className="flex items-center gap-4">
          <button className="p-2">
            <svg  id="plus-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M8 16H16M16 16H24M16 16V24M16 16V8" />
            </svg>
          </button>
          <button className="p-2">
            <svg  id="edit-button" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 32 32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.67} d="M26.8664 10.5865L11.0397 26.4133C9.62637 27.8399 5.39969 28.4931 4.43969 27.5465C3.47969 26.5998 4.1597 22.3733 5.57304 20.9466L21.3997 5.11992C22.1305 4.42394 23.1044 4.04122 24.1135 4.05351C25.1227 4.06582 26.0869 4.47216 26.8005 5.18576C27.5141 5.89935 27.9204 6.86367 27.9328 7.87276C27.9451 8.88187 27.5624 9.85578 26.8664 10.5865Z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <CaseStudyCard key={i} />
        ))}
      </div>
    </div>
  );
}

function VideoCard() {
  return (
    <div className="space-y-3">
      <div
        className="aspect-video rounded bg-gradient-to-b from-black/15 to-black/15 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://api.builder.io/api/v1/image/assets/TEMP/217096612a6ad7690b13676112155122f937a83f?width=454')`,
        }}
      >
        <button className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <svg
              className="h-4 w-4 text-primary ml-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18L21 12L9 6v12z" />
            </svg>
          </div>
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-black">Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</p>
        <div className="flex items-center  justify-start gap-1">
          <img src={image3} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 25 24">
            
          </img>
          <span className="text-xs text-black/50">20/07/2025, 02:03</span>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard() {
  return (
    <div className="space-y-3">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/936762393e6ad66842daf467fa264eb00eb21674?width=454"
        alt="Case Study"
        className="aspect-video w-full rounded-lg object-cover shadow-md"
      />
      <div className="space-y-1">
        <p className="text-xs text-black">Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</p>
        <div className="flex items-center  justify-start gap-1">
          <img src={image3} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 25 24">
           
          </img>
          <span className="text-xs  text-black/50">20/07/2025, 02:03</span>
        </div>
      </div>
    </div>
  );
}

