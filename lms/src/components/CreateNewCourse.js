
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { toast } from "react-toastify";
// import TextField from '@mui/material/TextField';
// import * as React from 'react';
// import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
// import DesignServicesIcon from '@mui/icons-material/DesignServices';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import UploadIcon from '@mui/icons-material/Upload';
// import axios from "axios";
// import { base_url } from "./Utils/base_url";
// import { useState, useEffect } from "react";
// import Swal from 'sweetalert2';
// import SellIcon from '@mui/icons-material/Sell';
// import PPTPreview from "./PPTPreview";


// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// function CreateNewCourse() {

//   const [course, setCourse] = useState({
//     course_title_main: "",
//     add_main_category: "",
//     add_sub_category: "",
//     add_tag: "",
//     creation_date: "",
//     description: "",
//     course_price: "",
//     course_code: "",
//     sections: [],
//     thumbnail_upload: [],
//     file_upload: [],
//     video_upload: [],
//     image_file: [],
//     pdf_file: [],
//     word_file: [],
//   });

//   // State for new section and chapter
// const [newSection, setNewSection] = useState({
//   section_title: "",
//   add_Content: [],
// });


// const [pdfPreviews, setPdfPreviews] = useState([]);
// const [wordPreviews, setWordPreviews] = useState([]);
// const [imagePreviews, setImagePreviews] = useState([]);
// const [pptFiles, setPPTFiles] = useState([]);

// const [thumbnail, setThumbnail] = useState([]);
// const [fileUpload, setFileUpload] = useState([]);

// const handlePdfFile = (event) => {
//   const files = Array.from(event.target.files);
//   setCourse((prevState) => ({
//       ...prevState,
//       pdf_file: files,
//   }));
//   const previews = files.map((file) => URL.createObjectURL(file));
//   setPdfPreviews(previews);
// };

// const handleFileUpload = (event) => {
//   const files = Array.from(event.target.files);
//   setCourse((prevState) => ({
//       ...prevState,
//       file_upload: files
//   }));
//   const previews = files.map((file) => URL.createObjectURL(file));
//   setFileUpload(previews)
// };

// const handleWordFile = (event) => {
//   const files = Array.from(event.target.files);
//   setCourse((prevState) => ({
//       ...prevState,
//       word_file: files,
//   }));
//   const previews = files.map((file) => file.name); // Only show file names for Word files
//   setWordPreviews(previews);
// };

// const handledocumentpicchange = (event) => {
//   const files = Array.from(event.target.files);
//   setCourse((prevState) => ({
//       ...prevState,
//       image_file: files,
//   }));
//   const previews = files.map((file) => URL.createObjectURL(file));
//   setImagePreviews(previews);
// };

// const handledthumbnailUpload = (event) => {
//   const files = Array.from(event.target.files);
//   setCourse((prevState) => ({
//       ...prevState,
//       thumbnail_upload: files,
//   }));
//   const previews = files.map((file) => URL.createObjectURL(file));
//   setThumbnail(previews);
// };

// const [videoPreviews, setVideoPreviews] = useState([]); 
// // Handle video file upload
// const handleVideo = (event) => {
//   const files = Array.from(event.target.files);
//   setChapter({ ...chapter, video_file: files });
//   setVideoPreviews(files.map((file) => URL.createObjectURL(file)));
// };

// const handlePPTFile = (event) => {
//   const files = Array.from(event.target.files);
//   setChapter({ ...chapter, ppt_file: files });
//   setPPTFiles(files.map((file) => URL.createObjectURL(file)));  // Store the actual files for preview
// };

// useEffect(() => {
//   return () => {
//     pdfPreviews.forEach((url) => URL.revokeObjectURL(url));
//     imagePreviews.forEach((url) => URL.revokeObjectURL(url));
//     videoPreviews.forEach((url) => URL.revokeObjectURL(url));

//     thumbnail.forEach((url) => URL.revokeObjectURL(url));
//     fileUpload.forEach((url) => URL.revokeObjectURL(url));
//   };
// }, [pdfPreviews, imagePreviews, videoPreviews, thumbnail, fileUpload]);


// const [chapterMain, setchapterMain] = useState([]);
// const [chapter, setChapter] = useState({
//   chapter_title: "",
//   chapter_description: "",
//   youtube_link: "",
//   video_file: [],
//   ppt_file: [],
// });

// // Adding Chapter to Section
// const addChapter = () => {
//   if (chapter.chapter_title && chapter.chapter_description) {
//     const updatedContent = [...newSection.add_Content, chapter];

//     setNewSection({ ...newSection, add_Content: updatedContent });

//     setChapter({
//       chapter_title: "",
//       chapter_description: "",
//       youtube_link: "",
//       video_file: [],
//       ppt_file: [],
//     });

//     setVideoPreviews([]);
//     toast.success("Chapter added successfully!");
//   } else {
//     Swal.fire("Error", "Please fill out all fields for the chapter.", "error");
//   }
// };

// // Adding Section to Course
// const addSection = () => {
//   if (newSection.section_title && newSection.add_Content.length > 0) {
//     const updatedSections = [...course.sections, newSection];
//     setCourse({ ...course, sections: updatedSections });

//     setNewSection({ section_title: "", add_Content: [] });
//     toast.success("Section added successfully!");
//   } else {
//     Swal.fire("Error", "Please fill section title and add chapters.", "error");
//   }
// };


// const handleSubmit = async (e) => {
//   try {
//     const formData = new FormData();
//     formData.append("course_title_main", course.course_title_main);
//     formData.append("add_main_category", course.add_main_category);
//     formData.append("add_sub_category", course.add_sub_category);
//     formData.append("add_tag", course.add_tag);
//     formData.append("creation_date", course.creation_date);
//     formData.append("description", course.description);
//     formData.append("course_price", course.course_price);
//     formData.append("course_code", course.course_code);

//     // Append sections and their chapters
//     course.sections.forEach((section, secIndex) => {
//       formData.append(`sections[${secIndex}].section_title`, section.section_title);
//       section.add_Content.forEach((chapter, chapIndex) => {
//         formData.append(`sections[${secIndex}].add_Content[${chapIndex}].chapter_title`, chapter.chapter_title);
//         formData.append(`sections[${secIndex}].add_Content[${chapIndex}].chapter_description`, chapter.chapter_description);
//         formData.append(`sections[${secIndex}].add_Content[${chapIndex}].youtube_link`, chapter.youtube_link);
        
//         chapter.video_file.forEach((file) => {
//           formData.append(`sections[${secIndex}].add_Content[${chapIndex}].video_file`, file);
//         });
//         chapter.ppt_file.forEach((file) => {
//           formData.append(`sections[${secIndex}].add_Content[${chapIndex}].ppt_file`, file);
//         });
//       });
//     });

//     // Append files
//     ["thumbnail_upload","file_upload","image_file", "pdf_file", "word_file"].forEach((field) => {
//       course[field].forEach((file) => formData.append(field, file));
//     });

//     const response = await axios.post(`${base_url}/add_course_details`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     Swal.fire("Success", "Course created successfully!", "success");
//     setPdfPreviews([]);
//     setImagePreviews([]);
//     setWordPreviews([]);
//     setVideoPreviews([]);
//     setCourse({
//       course_title_main: "",
//       add_main_category: "",
//       add_sub_category: "",
//       add_tag: "",
//       creation_date: "",
//       description: "",
//       course_price: "",
//       course_code: "",
//       sections: [],
//       thumbnail_upload: [],
//       file_upload: [],
//       video_upload: [],
//       image_file: [],
//       pdf_file: [],
//       word_file: [],
//     });

//     console.log([...formData]);
    

//   } catch (error) {
//     toast.error("Error saving course details");
//   }
// };


                                                
// const deletechapter = (index) => {
//   const updatedChapters = newSection.add_Content.filter((_, i) => i !== index);

//   setNewSection({ ...newSection, add_Content: updatedChapters });
//   setchapterMain(updatedChapters); // If chapterMain is required for another reason
//   toast.success('Chapter deleted successfully!', { autoClose: 1000 });
// };



//   function addLessons() {
//     document.getElementById("add-lesson-div").style.display = "block"
//   }

//   function BasicContainer() {
//     document.getElementById("customize-course").style.display = "block";
//     document.getElementById("add-new-category").style.display = "none"
//     document.getElementById("add-document-category").style.display = "none";
//     document.getElementById("finish_div").style.display = "none";
//   }

//   function MediaContainer() {
//     document.getElementById("customize-course").style.display = "none";
//     document.getElementById("add-new-category").style.display = "block"
//     document.getElementById("add-document-category").style.display = "none";
//     document.getElementById("finish_div").style.display = "none";
//   }

//   function DocumentContainer() {
//     document.getElementById("customize-course").style.display = "none";
//     document.getElementById("add-new-category").style.display = "none"
//     document.getElementById("add-document-category").style.display = "block";
//     document.getElementById("finish_div").style.display = "none";
//   }

//   function FinishContainer() {
//     document.getElementById("customize-course").style.display = "none";
//     document.getElementById("add-new-category").style.display = "none"
//     document.getElementById("add-document-category").style.display = "none";
//     document.getElementById("finish_div").style.display = "block";
//   }

//   return (
//     <div>
      
//     <div>
//       <Sidebar />

//       <section className="main-content-section">
//         <Header />

//         <div
//           className="header-div header-two"
//           style={{ padding: "2rem", height: "8rem" }}
//         >
//           <div className="create-options-course">
//             <div
//               className="basic-option"
//               style={{ backgroundColor: "#7A1CAC", color: "white" }}
//               onClick={BasicContainer}
//             >
//               <h6>Basic</h6>
//             </div>
            
//               <div className="media-option" id="media-option-id" onClick={MediaContainer}>
//                 <h6>
//                   Media <br />
//                   (.mp4, .mp3)
//                 </h6>
//               </div>
           
            
//               <div className="document-option addStyle" id="document-option-id" onClick={DocumentContainer}>
//                 <h6>
//                    <br />
//                   (.pdf, .word, .jpg)
//                 </h6>
//               </div>
            
//             <div className="finish-div" id="finish-div" onClick={FinishContainer}>
//               <h6>Finish</h6>     
//             </div>
//           </div>
//         </div>

//         <div className="customize-course" id="customize-course">
//           <div className="course-info-section">
//             <div className="addcourse-div">
//                 <h5> <span><DashboardCustomizeIcon/></span> Customize your course</h5>
//                 <div className="inputs-items">
//                   <div className="info-div-items">
//                     <TextField
//                       required
//                       id="course_title_main"
//                       name="course_title_main"
//                       label="Course title"
//                       defaultValue=""
//                       className="input"
//                       onChange={(e) => setCourse({...course, course_title_main: e.target.value})}
//                     />
//                   </div>
//                   <div className="info-div-items">
//                   <TextField
//                       required
//                       id="add_main_category"
//                       name="add_main_category"
//                       label="Add main category"
//                       defaultValue=""
//                       className="input"
//                       onChange={(e) => setCourse({...course, add_main_category: e.target.value})}
//                     />
//                   </div>
//                   <div className="info-div-items">
//                   <TextField
//                       required
//                       id="add_sub_category"
//                       name="add_sub_category"
//                       label="Add sub category"
//                       defaultValue=""
//                       className="input"
//                       onChange={(e) => setCourse({...course, add_sub_category: e.target.value})}
//                     />
//                     </div>
//                     <div className="info-div-items">
//                       <TextField
//                         required
//                         id="add_tag"
//                         name="add_tag"
//                         label="Add Tag"
//                         defaultValue=""
//                         className="input"
//                         onChange={(e) => setCourse({...course, add_tag: e.target.value})}
//                       />
//                     </div>
//                     <div className="info-div-items">
//                     <input
//                       type="date"
//                         required
//                         id="creation_date"
//                         name="creation_date"
//                         defaultValue=""
//                         className="input"
//                         onChange={(e) => setCourse({...course, creation_date: e.target.value})}
//                       />
//                     </div>
//                      <div className="info-div-items">
//                      <TextField
//                         id="description"
//                         name="description"
//                         label="Description"
//                         multiline
//                         rows={4}
//                         defaultValue=""
//                         className="input"
//                         onChange={(e) => setCourse({...course, description: e.target.value})}
//                       />
//                      </div> 
//                 </div>
//             </div>

//             <div className="addcourse-div">
//               <div className="add-price-div" style={{marginBottom:"1rem"}}>
//                 <h6> <span><SellIcon/></span> Add price</h6>
//                 <div className="inputs-items">
//                   <div className="info-div-items">
//                       <TextField
//                           required
//                           id="course_price"
//                           name="course_price"
//                           label="Course price"
//                           defaultValue=""
//                           className="input"
//                           onChange={(e) => setCourse({...course, course_price: e.target.value})}
//                         />
//                     </div>
//                   </div>
//               </div>

//               <div className="add-section-div">
//                 <h6> <span><DesignServicesIcon/></span> Add Section</h6>
//                 <div className="inputs-items">
//                   <div className="info-div-items">
//                     <TextField
//                       required
//                       id="course_code"
//                       name="course_code"
//                       label="Course code"
//                       defaultValue=""
//                       className="input"
//                       onChange={(e) => setCourse({...course, course_code: e.target.value})}
//                     />
//                   </div>
//                   <div className="info-div-items">
//                   <TextField
//                       required
//                       id="section_title"
//                       name="section_title"
//                       label="Course Section title"
//                       value={newSection.section_title}
//                       defaultValue=""
//                       className="input"
//                       onChange={(e) => setNewSection({ ...newSection, section_title: e.target.value })}
//                     />
//                   </div>
//                   <div className="info-div-items">
//                     <button onClick={addLessons}>Add Chapters</button>
//                   </div>
//                 </div>
//               </div>
//             </div>            
//           </div>

//           <div className="add-lessons" id="add-lesson-div">
//             <h5> <span><AddCircleIcon /></span> Add Chapters</h5>
//             <div className="lessons-section">
//             <div className="create-lessons">
//               <div className="info-div-items upload-video">
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <CloudUploadIcon />
//                   <Button
//                     component="label"
//                     variant="contained"
//                     className="upload-video-btn"
//                   >
//                     Choose files or drag and drop
//                     <VisuallyHiddenInput
//                       type="file"
//                       name="video_file"
//                       accept="video/*" // Accept only video files
//                       multiple // Allow multiple file uploads
//                       onChange={handleVideo}
//                       id="video_file"
//                       style={{ display: "none" }}
//                     />
//                   </Button>
//                   <p>Video (512GB)</p>
//                 </div>
//                   {videoPreviews.length > 0 && (
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//                     {videoPreviews.map((preview, index) => (
//                       <video key={index} src={preview} controls className="video-preview" style={{width:"200px", height:"100px"}}>
//                         Your browser does not support the video tag.
//                       </video>
//                     ))}
//                   </div>
//                   )}
//               </div>
//               <div className="info-div-items" style={{border:"1px solid rgba(0,0,0,0.2)", padding:"1rem"}}>
//                 <p style={{fontSize:"12px", fontWeight:"600"}}>Upload PPT</p>
//                 <input 
//                   type="file" 
//                   name="ppt_file" 
//                   accept=".ppt,.pptx" 
//                   onChange={handlePPTFile} 
//                   multiple 
//                 />
//                 <PPTPreview files={pptFiles} />
//               </div>
//             </div>

//     <div className="create-lessons">
//       <div className="info-div-items">
//         <TextField
//           required
//           id="chapter_title"
//           name="chapter_title"
//           label="Section Chapter title"
//           className="input"
//           value={chapter.chapter_title} // Bind value to chapter state
//           onChange={(e) =>
//             setChapter({ ...chapter, chapter_title: e.target.value })
//           }
//         />
//       </div>
//       <div className="info-div-items">
//         <TextField
//           required
//           id="chapter_description"
//           name="chapter_description"
//           label="Chapter description"
//           className="input"
//           multiline
//           rows={4}
//           value={chapter.chapter_description} // Bind value to chapter state
//           onChange={(e) =>
//             setChapter({ ...chapter, chapter_description: e.target.value })
//           }
//         />
//       </div>
//       <div className="info-div-items">
//         <TextField
//           id="youtube_link"
//           label="Youtube Video Link"
//           name="youtube_link"
//           className="input"
//           value={chapter.youtube_link}
//           onChange={(e) =>
//             setChapter({ ...chapter, youtube_link: e.target.value })
//           }
//         />  
//       </div>
//     </div>
//   </div>
//   <div style={{display:"flex"}}>
//           <div className="upload-btn-div" style={{marginTop:"1.5rem", marginRight:"1.5rem"}}>
//             <button onClick={addChapter}> Upload Chapter</button>
//           </div>
//           <div className="upload-btn-div" style={{marginTop:"1.5rem"}}>
//             <button onClick={addSection}>Add Section</button>
//           </div>
//   </div>
//           <div className="added-chapter">
//           <h6>Course Chapters</h6>
//           {newSection.add_Content && newSection.add_Content.length > 0 ? (
//             newSection.add_Content.map((chap, index) => (
//               <div key={index} className="chapter-item">
//                 <p style={{marginBottom:"0px"}}>
//                   <strong>{chap.chapter_title}</strong>: {chap.chapter_description}
//                 </p>
//                 {/* <button >Delete Chapter</button> */}
//                 <i onClick={() => deletechapter(index)} class="fa-regular fa-trash-can"></i>
//               </div>
//             ))
//           ) : (
//             <p>No chapters added yet.</p>
//           )}
//         </div>


//           </div>

//           <div className='content-div' style={{marginTop: "2rem"}}>
//               <button id='next btn' style={{height: "3rem"}} onClick={MediaContainer}>Next </button>
//           </div>
            
//         </div>


//         <div className='add-new-category' id="add-new-category">
//                     <div className='adding-course-div' style={{width: "100%"}}> 
//                     <h5 style={{marginBottom: "1.5rem"}}>Add media files</h5>
//                     <div className='upload-options' style={{display: "flex", justifyContent: "space-between"}}>
//                         <div style={{width: "30%"}}>
//                             <p style={{fontSize: "12px", fontWeight: "600"}}>Thumbnail</p>
//                             <div className="upload-div" style={{marginTop: "1rem"}}>
//                                 <input type="file" id='thumbnail_upload' name="thumbnail_upload" onChange={handledthumbnailUpload} accept="image/*" />
//                                 {thumbnail.map((preview, index) => (
//                                   <img
//                                     key={index}
//                                     src={preview}
//                                     alt={`img-preview-${index}`}
//                                     style={{ width: "100%", height: "auto", marginTop: "10px" }}
//                                   />
//                                 ))}
//                                 {/* <p><label htmlFor="file-upload"><i class="fa-solid fa-arrow-up-from-bracket"></i></label></p> */}
//                             </div>
//                         </div>
//                         <div style={{width: "30%"}}>
//                             <p style={{fontSize: "12px", fontWeight: "600"}}>Main course file</p>
//                             <div className="upload-div" style={{marginTop: "1rem"}}>
//                                 <input type="file" name='file_upload' onChange={handleFileUpload} accept="application/pdf" />
//                                 {fileUpload.map((preview, index) => (
//                                   <iframe
//                                     key={index}
//                                     src={preview}
//                                     title={`pdf-preview-${index}`}
//                                     style={{ width: "100%", height: "150px", marginTop: "10px" }}
//                                   ></iframe>
//                                 ))}
//                                 {/* <p><label htmlFor="file-upload"><i class="fa-solid fa-arrow-up-from-bracket"></i></label></p> */}
//                             </div>
//                         </div>
//                         <div style={{width: "30%"}}>
//                             <p style={{fontSize: "12px", fontWeight: "600"}}>Upload video</p>
//                             <div className="upload-div" style={{marginTop: "1rem"}}>
//                                 <input type="file" id='video_upload' name='video_upload' />
//                                 {/* <p><label htmlFor="file-upload"><i class="fa-solid fa-arrow-up-from-bracket"></i></label></p> */}
//                             </div>
//                         </div>
//                     </div>
                       
//                     <div className='content-div' style={{ marginTop: "1rem"}}>
//                         <button id='previous-btn' onClick={BasicContainer}> Previous </button>
//                         <button id='next btn' style={{height: "3rem"}} onClick={DocumentContainer}>Next </button>
//                     </div>
//                     </div>

//         </div>

//     <div className="add-new-category" id="add-document-category">
//       <div className="adding-course-div" style={{ width: "100%" }}>
//         <h5 style={{ marginBottom: "1.5rem" }}>Add Document Files</h5>
//         <div
//           className="upload-options"
//           style={{ display: "flex", justifyContent: "space-between" }}
//         >
//           {/* PDF Upload */}
//           <div style={{ width: "30%" }}>
//             <p style={{ fontSize: "12px", fontWeight: "600" }}>PDF File</p>
//             <div className="upload-div" style={{ marginTop: "1rem" }}>
//               <input
//                 type="file"
//                 name="pdf_file"
//                 onChange={handlePdfFile}
//                 accept="application/pdf"
//               />
//               {pdfPreviews.map((preview, index) => (
//                 <iframe
//                   key={index}
//                   src={preview}
//                   title={`pdf-preview-${index}`}
//                   style={{ width: "100%", height: "150px", marginTop: "10px" }}
//                 ></iframe>
//               ))}
//             </div>
//           </div>

//           {/* Word Upload */}
//           <div style={{ width: "30%" }}>
//             <p style={{ fontSize: "12px", fontWeight: "600" }}>Word File</p>
//             <div className="upload-div" style={{ marginTop: "1rem" }}>
//               <input
//                 type="file"
//                 name="word_file"
//                 onChange={handleWordFile}
//                 accept=".doc,.docx"
//               />
//               {wordPreviews.map((preview, index) => (
//                 <p
//                   key={index}
//                   style={{
//                     fontSize: "12px",
//                     marginTop: "10px",
//                     overflowWrap: "break-word",
//                   }}
//                 >
//                   {preview}
//                 </p>
//               ))}
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div style={{ width: "30%" }}>
//             <p style={{ fontSize: "12px", fontWeight: "600" }}>JPG File</p>
//             <div className="upload-div" style={{ marginTop: "1rem" }}>
//               <input
//                 type="file"
//                 name="image_file"
//                 onChange={handledocumentpicchange}
//                 accept="image/*"
//               />
//               {imagePreviews.map((preview, index) => (
//                 <img
//                   key={index}
//                   src={preview}
//                   alt={`img-preview-${index}`}
//                   style={{ width: "100%", height: "auto", marginTop: "10px" }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="content-div" style={{ marginTop: "4rem" }}>
//           <button id="previous-btn" onClick={MediaContainer}>
//             Previous
//           </button>
//           <button id="next btn" style={{ height: "3rem" }} onClick={FinishContainer}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>

//         <div className="add-new-category" id="finish_div">
//           <div className='adding-course-div' style={{width: "100%"}}> 
//             <button onClick={handleSubmit}> <UploadIcon/> Upload Course</button>

//             <div className='content-div' style={{marginTop: "2rem"}}>
//               <button id='previous-btn' onClick={DocumentContainer}> Previous </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* <ToastContainer/> */}
//     </div>
//     </div>
//   );
// }

// export default CreateNewCourse;





import Sidebar from "./Sidebar";
import Header from "./Header";
import { toast } from "react-toastify";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";
import { base_url } from "./Utils/base_url";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import SellIcon from '@mui/icons-material/Sell';
import PPTPreview from "./PPTPreview";


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function CreateNewCourse() {
  const [course, setCourse] = useState({
    course_title_main: "",
    add_main_category: "",
    add_sub_category: "",
    add_tag: "",
    creation_date: "",
    description: "",
    course_price: "",
    course_code: "",
    sections: [],
    thumbnail_upload: [],
    file_upload: [],
    video_upload: [],
    image_file: [],
    pdf_file: [],
    word_file: [],
  });

  // State for new section and chapter
  const [newSection, setNewSection] = useState({
    section_title: "",
    add_Content: [],
  });

  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [wordPreviews, setWordPreviews] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [pptFiles, setPPTFiles] = useState([]);

  const [thumbnail, setThumbnail] = useState([]);
  const [fileUpload, setFileUpload] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  const [chapter, setChapter] = useState({
    chapter_title: "",
    chapter_description: "",
    youtube_link: "",
    video_file: [],
    ppt_file: [],
  });

  const handlePdfFile = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        pdf_file: files,
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPdfPreviews(previews);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        file_upload: files
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setFileUpload(previews)
  };

  const handleWordFile = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        word_file: files,
    }));
    const previews = files.map((file) => file.name);
    setWordPreviews(previews);
  };

  const handledocumentpicchange = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        image_file: files,
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handledthumbnailUpload = (event) => {
    const files = Array.from(event.target.files);
    setCourse((prevState) => ({
        ...prevState,
        thumbnail_upload: files,
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setThumbnail(previews);
  };

  // Handle video file upload
  const handleVideo = (event) => {
    const files = Array.from(event.target.files);
    setChapter({ ...chapter, video_file: files });
    setVideoPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handlePPTFile = (event) => {
    const files = Array.from(event.target.files);
    setChapter({ ...chapter, ppt_file: files });
    setPPTFiles(files.map((file) => URL.createObjectURL(file)));
  };

  useEffect(() => {
    return () => {
      pdfPreviews.forEach((url) => URL.revokeObjectURL(url));
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      videoPreviews.forEach((url) => URL.revokeObjectURL(url));
      thumbnail.forEach((url) => URL.revokeObjectURL(url));
      fileUpload.forEach((url) => URL.revokeObjectURL(url));
      pptFiles.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pdfPreviews, imagePreviews, videoPreviews, thumbnail, fileUpload, pptFiles]);

  // Adding Chapter to Section
  const addChapter = () => {
    if (chapter.chapter_title && chapter.chapter_description) {
      const updatedContent = [...newSection.add_Content, chapter];

      setNewSection({ ...newSection, add_Content: updatedContent });

      setChapter({
        chapter_title: "",
        chapter_description: "",
        youtube_link: "",
        video_file: [],
        ppt_file: [],
      });

      setVideoPreviews([]);
      setPPTFiles([]);
      toast.success("Chapter added successfully!");
    } else {
      Swal.fire("Error", "Please fill out all fields for the chapter.", "error");
    }
  };

  // Adding Section to Course
  const addSection = () => {
    if (newSection.section_title && newSection.add_Content.length > 0) {
      const updatedSections = [...course.sections, newSection];
      setCourse({ ...course, sections: updatedSections });

      setNewSection({ section_title: "", add_Content: [] });
      toast.success("Section added successfully!");
    } else {
      Swal.fire("Error", "Please fill section title and add chapters.", "error");
    }
  };

  const deleteChapter = (index) => {
    const updatedChapters = newSection.add_Content.filter((_, i) => i !== index);
    setNewSection({ ...newSection, add_Content: updatedChapters });
    toast.success('Chapter deleted successfully!', { autoClose: 1000 });
  };

  const deleteSection = (index) => {
    const updatedSections = course.sections.filter((_, i) => i !== index);
    setCourse({ ...course, sections: updatedSections });
    toast.success('Section deleted successfully!', { autoClose: 1000 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Validation
    const errors = [];
    
    // Validate course title
    if (!course.course_title_main || course.course_title_main.trim() === "") {
      errors.push("Course title is required");
    }
    
    // Validate that at least one section exists
    if (!course.sections || course.sections.length === 0) {
      errors.push("At least one section is required");
    } else {
      // Validate each section
      course.sections.forEach((section, secIndex) => {
        if (!section.section_title || section.section_title.trim() === "") {
          errors.push(`Section ${secIndex + 1} title is required`);
        }
        
        // Validate that section has at least one chapter
        if (!section.add_Content || section.add_Content.length === 0) {
          errors.push(`Section ${secIndex + 1} must have at least one chapter`);
        } else {
          // Validate each chapter
          section.add_Content.forEach((chapter, chapIndex) => {
            if (!chapter.chapter_title || chapter.chapter_title.trim() === "") {
              errors.push(`Chapter ${chapIndex + 1} in Section ${secIndex + 1} must have a title`);
            }
            
            // // Optional: Validate that chapter has either a YouTube link or video file
            // const hasVideo = chapter.youtube_link || (chapter.video_file && chapter.video_file.length > 0);
            // if (!hasVideo) {
            //   errors.push(`Chapter ${chapIndex + 1} in Section ${secIndex + 1} needs either a YouTube link or video file`);
            // }
          });
        }
      });
    }
    
    // Check if there are any validation errors
    if (errors.length > 0) {
      // Display all validation errors to the user
      Swal.fire({
        title: "Validation Error",
        html: errors.join("<br>"),
        icon: "error"
      });
      return; // Stop submission
    }
    
    try {
      const formData = new FormData();
      formData.append("course_title_main", course.course_title_main);
      formData.append("add_main_category", course.add_main_category);
      formData.append("add_sub_category", course.add_sub_category);
      formData.append("add_tag", course.add_tag);
      formData.append("creation_date", course.creation_date);
      formData.append("description", course.description);
      formData.append("course_price", course.course_price);
      formData.append("course_code", course.course_code);
  
      // Append sections and their chapters
      course.sections.forEach((section, secIndex) => {
        formData.append(`sections[${secIndex}].section_title`, section.section_title);
        section.add_Content.forEach((chapter, chapIndex) => {
          formData.append(`sections[${secIndex}].add_Content[${chapIndex}].chapter_title`, chapter.chapter_title);
          formData.append(`sections[${secIndex}].add_Content[${chapIndex}].chapter_description`, chapter.chapter_description);
          formData.append(`sections[${secIndex}].add_Content[${chapIndex}].youtube_link`, chapter.youtube_link);
          
          if (chapter.video_file && chapter.video_file.length > 0) {
            chapter.video_file.forEach((file) => {
              formData.append(`sections[${secIndex}].add_Content[${chapIndex}].video_file`, file);
            });
          }
          
          if (chapter.ppt_file && chapter.ppt_file.length > 0) {
            chapter.ppt_file.forEach((file) => {
              formData.append(`sections[${secIndex}].add_Content[${chapIndex}].ppt_file`, file);
            });
          }
        });
      });
  
      // Append files - validate that arrays exist before iterating
      ["thumbnail_upload", "file_upload", "image_file", "pdf_file", "word_file"].forEach((field) => {
        if (course[field] && course[field].length > 0) {
          course[field].forEach((file) => formData.append(field, file));
        }
      });
  
      const response = await axios.post(`${base_url}/add_course_details`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      Swal.fire("Success", "Course created successfully!", "success");
      
      // Reset all state
      setPdfPreviews([]);
      setImagePreviews([]);
      setWordPreviews([]);
      setVideoPreviews([]);
      setPPTFiles([]);
      setThumbnail([]);
      setFileUpload([]);
      
      setCourse({
        course_title_main: "",
        add_main_category: "",
        add_sub_category: "",
        add_tag: "",
        creation_date: "",
        description: "",
        course_price: "",
        course_code: "",
        sections: [],
        thumbnail_upload: [],
        file_upload: [],
        video_upload: [],
        image_file: [],
        pdf_file: [],
        word_file: [],
      });
  
    } catch (error) {
      toast.error("Error saving course details");
      console.error(error);
    }
  };

  function addLessons() {
    document.getElementById("add-lesson-div").style.display = "block"
  }

  function BasicContainer() {
    document.getElementById("customize-course").style.display = "block";
    document.getElementById("add-new-category").style.display = "none"
    document.getElementById("add-document-category").style.display = "none";
    document.getElementById("finish_div").style.display = "none";
  }

  function MediaContainer() {
    document.getElementById("customize-course").style.display = "none";
    document.getElementById("add-new-category").style.display = "block"
    document.getElementById("add-document-category").style.display = "none";
    document.getElementById("finish_div").style.display = "none";
  }

  function DocumentContainer() {
    document.getElementById("customize-course").style.display = "none";
    document.getElementById("add-new-category").style.display = "none"
    document.getElementById("add-document-category").style.display = "block";
    document.getElementById("finish_div").style.display = "none";
  }

  function FinishContainer() {
    document.getElementById("customize-course").style.display = "none";
    document.getElementById("add-new-category").style.display = "none"
    document.getElementById("add-document-category").style.display = "none";
    document.getElementById("finish_div").style.display = "block";
  }

  return (
    <div>

<style>
{`
 body{
    background-color: rgba(46, 7, 63, 0.1);
    padding: 1.5rem;
    }
.customize-course{
background-color: #ffffff;
padding: 2rem;
border-radius: 10px;
}
.info-div-items{
margin: 1rem 0;
}
.info-div-items .input{
width: 100%;
outline-color: #7A1CAC;
}
.course-info-section, .lessons-section{
display: flex;
justify-content: space-between;
}
.addcourse-div, .create-lessons{
width: 49%;
}
.inputs-items{
padding: 1.5rem;
border: 2px solid rgba(0,0,0,0.2);
border-radius: 10px;
}
.lessons-section{
border: 2px solid rgba(0,0,0,0.2);
padding: 1.5rem;
border-radius: 10px;
}
.upload-video{
border: 1px solid rgba(0,0,0,0.2);
padding: 2.2rem 1rem;
display: flex;
justify-content: center;
align-items: center;
border-radius: 3px;
}
.upload-video svg{
height: 3rem;
width: 4rem;
}
.upload-video-btn{
background-color: #ffffff;
color: blue;
box-shadow: none;
}
.add-lessons{
margin-top: 2rem;
display: none;
}
button{
background-color: #7A1CAC;
padding: 10px 1rem;
}
button:hover{
background-color: #2E073F;
}
.add-new-category{
display: none; 
}
.addStyle{
background-color: #7A1CAC;
color: #ffffff;
}
.removeStyle{
background-color: #ffffff;
color: #000;
}
.added-chapter{
 // border: 1px solid #000;
padding: 1rem;
width: 70%;
border-radius: 10px;
margin-top: 1.5rem;
background-color: rgba(46, 7, 63, 0.2);
}
.chapter-item{
// border: 1px solid #000;
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px 14px;
border-radius: 5px;
background-color: #fff;
margin: 10px 0px;
}
i{
margin-left: 14px;
cursor: pointer;
}
`}
</style>

      <Sidebar />

      <section className="main-content-section">
        <Header />

        <div
          className="header-div header-two"
          style={{ padding: "2rem", height: "8rem" }}
        >
          <div className="create-options-course">
            <div
              className="basic-option"
              style={{ backgroundColor: "#7A1CAC", color: "white", borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease" }}
              onClick={BasicContainer}
            >
              <h6>Basic</h6>
            </div>
            
            <div 
              className="media-option" 
              id="media-option-id" 
              onClick={MediaContainer}
              style={{ borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease", backgroundColor: "#f5f5f5", hover: { backgroundColor: "#7A1CAC", color: "white" } }}
            >
              <h6>
                Media <br />
                (.mp4, .mp3)
              </h6>
            </div>
           
            <div 
              className="document-option addStyle" 
              id="document-option-id" 
              onClick={DocumentContainer}
              style={{ borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease", backgroundColor: "#f5f5f5" }}
            >
              <h6>
                Document <br />
                (.pdf, .word, .jpg)
              </h6>
            </div>
            
            <div 
              className="finish-div" 
              id="finish-div" 
              onClick={FinishContainer}
              style={{ borderRadius: "8px", cursor: "pointer", transition: "all 0.3s ease", backgroundColor: "#f5f5f5" }}
            >
              <h6>Finish</h6>     
            </div>
          </div>
        </div>

        <div className="customize-course" id="customize-course">
          <div className="course-info-section">
            <div className="addcourse-div" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h5 style={{ color: "#2E073F", marginBottom: "20px" }}> 
                  <span style={{ marginRight: "10px", color: "#7A1CAC" }}><DashboardCustomizeIcon/></span> 
                  Customize your course
                </h5>
                <div className="inputs-items">
                  <div className="info-div-items">
                    <TextField
                      required
                      id="course_title_main"
                      name="course_title_main"
                      label="Course title"
                      value={course.course_title_main}
                      className="input"
                      onChange={(e) => setCourse({...course, course_title_main: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <TextField
                      required
                      id="add_main_category"
                      name="add_main_category"
                      label="Add main category"
                      value={course.add_main_category}
                      className="input"
                      onChange={(e) => setCourse({...course, add_main_category: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <TextField
                      required
                      id="add_sub_category"
                      name="add_sub_category"
                      label="Add sub category"
                      value={course.add_sub_category}
                      className="input"
                      onChange={(e) => setCourse({...course, add_sub_category: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <TextField
                      required
                      id="add_tag"
                      name="add_tag"
                      label="Add Tag"
                      value={course.add_tag}
                      className="input"
                      onChange={(e) => setCourse({...course, add_tag: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <label style={{ display: "block", marginBottom: "8px", color: "#555" }}>Creation Date</label>
                    <input
                      type="date"
                      required
                      id="creation_date"
                      name="creation_date"
                      value={course.creation_date}
                      className="input"
                      style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
                      onChange={(e) => setCourse({...course, creation_date: e.target.value})}
                    />
                  </div>
                  <div className="info-div-items">
                    <TextField
                      id="description"
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      value={course.description}
                      className="input"
                      onChange={(e) => setCourse({...course, description: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div> 
                </div>
            </div>

            <div className="addcourse-div" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", marginTop: "20px" }}>
              <div className="add-price-div" style={{marginBottom:"1rem"}}>
                <h6 style={{ color: "#2E073F" }}> 
                  <span style={{ marginRight: "10px", color: "#7A1CAC" }}><SellIcon/></span> 
                  Add price
                </h6>
                <div className="inputs-items">
                  <div className="info-div-items">
                    <TextField
                      required
                      id="course_price"
                      name="course_price"
                      label="Course price"
                      value={course.course_price}
                      className="input"
                      onChange={(e) => setCourse({...course, course_price: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                </div>
              </div>

              <div className="add-section-div">
                <h6 style={{ color: "#2E073F" }}> 
                  <span style={{ marginRight: "10px", color: "#7A1CAC" }}><DesignServicesIcon/></span> 
                  Add Section
                </h6>
                <div className="inputs-items">
                  <div className="info-div-items">
                    <TextField
                      required
                      id="course_code"
                      name="course_code"
                      label="Course code"
                      value={course.course_code}
                      className="input"
                      onChange={(e) => setCourse({...course, course_code: e.target.value})}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <TextField
                      required
                      id="section_title"
                      name="section_title"
                      label="Course Section title"
                      value={newSection.section_title}
                      className="input"
                      onChange={(e) => setNewSection({ ...newSection, section_title: e.target.value })}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                    />
                  </div>
                  <div className="info-div-items">
                    <button 
                      onClick={addLessons}
                      style={{ 
                        backgroundColor: "#7A1CAC", 
                        color: "white", 
                        border: "none", 
                        padding: "10px 15px", 
                        borderRadius: "5px", 
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontWeight: "bold",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                      }}
                    >
                      Add Chapters
                    </button>
                  </div>
                </div>
              </div>
            </div>            
          </div>

          {/* Display added sections */}
          {course.sections.length > 0 && (
            <div className="added-sections" style={{ 
              backgroundColor: "#fff", 
              padding: "20px", 
              borderRadius: "10px", 
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
              marginTop: "20px" 
            }}>
              <h5 style={{ color: "#2E073F", marginBottom: "15px" }}>Added Sections</h5>
              {course.sections.map((section, index) => (
                <div key={index} style={{ 
                  border: "1px solid #e0e0e0", 
                  borderRadius: "8px", 
                  padding: "15px", 
                  marginBottom: "10px", 
                  backgroundColor: "#f9f9f9" 
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h6 style={{ margin: 0, color: "#2E073F" }}>{section.section_title}</h6>
                    <button 
                      onClick={() => deleteSection(index)}
                      style={{ 
                        backgroundColor: "#ff5c5c", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "5px", 
                        padding: "5px 10px", 
                        display: "flex", 
                        alignItems: "center", 
                        cursor: "pointer" 
                      }}
                    >
                      <DeleteIcon style={{ fontSize: "16px", marginRight: "5px" }} /> Remove
                    </button>
                  </div>
                  <p style={{ margin: "10px 0 0 0", fontSize: "14px" }}>
                    {section.add_Content.length} chapter(s)
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="add-lessons" id="add-lesson-div" style={{ 
            display: "none", 
            backgroundColor: "#fff", 
            padding: "20px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
            marginTop: "20px" 
          }}>
            <h5 style={{ color: "#2E073F", marginBottom: "15px" }}> 
              <span style={{ marginRight: "10px", color: "#7A1CAC" }}><AddCircleIcon /></span> 
              Add Chapters
            </h5>
            <div className="lessons-section" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="create-lessons" style={{ display: "flex", flexDirection: "column", gap: "15px", width:"100%" }}>
                <div className="info-div-items">
                  <TextField
                    required
                    id="chapter_title"
                    name="chapter_title"
                    label="Section Chapter title"
                    className="input"
                    fullWidth
                    value={chapter.chapter_title}
                    onChange={(e) => setChapter({ ...chapter, chapter_title: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                  />
                </div>
                <div className="info-div-items">
                  <TextField
                    required
                    id="chapter_description"
                    name="chapter_description"
                    label="Chapter description"
                    className="input"
                    fullWidth
                    multiline
                    rows={4}
                    value={chapter.chapter_description}
                    onChange={(e) => setChapter({ ...chapter, chapter_description: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                  />
                </div>
                <div className="info-div-items">
                  <TextField
                    id="youtube_link"
                    label="Youtube Video Link"
                    name="youtube_link"
                    className="input"
                    fullWidth
                    value={chapter.youtube_link}
                    onChange={(e) => setChapter({ ...chapter, youtube_link: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#7A1CAC' } } }}
                  />  
                </div>
              </div>

              <div className="create-lessons" style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "20px", width: "100%" }}>
                <div className="info-div-items upload-video" style={{ flex: 1, border: "1px dashed #ccc", padding: "20px", borderRadius: "8px", width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CloudUploadIcon style={{ fontSize: "40px", color: "#7A1CAC", marginBottom: "10px" }} />
                    <Button
                      component="label"
                      variant="contained"
                      className="upload-video-btn"
                      style={{ marginBottom: "10px" }}
                    >
                      Choose video files
                      <VisuallyHiddenInput
                        type="file"
                        name="video_file"
                        accept="video/*"
                        multiple
                        onChange={handleVideo}
                        id="video_file"
                      />
                    </Button>
                    <p style={{ fontSize: "12px", color: "#666" }}>Video (512GB)</p>
                  </div>
                  {videoPreviews.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
                      {videoPreviews.map((preview, index) => (
                        <video key={index} src={preview} controls className="video-preview" style={{width:"200px", height:"100px", borderRadius: "5px"}}>
                          Your browser does not support the video tag.
                        </video>
                      ))}
                    </div>
                  )}
                </div>
                <div className="info-div-items" style={{
                  flex: 1, 
                  border:"1px dashed #ccc", 
                  padding:"20px", 
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <p style={{fontSize:"14px", fontWeight:"600", color: "#2E073F", marginBottom: "15px"}}>Upload PPT</p>
                  <input 
                    type="file" 
                    name="ppt_file" 
                    accept=".ppt,.pptx" 
                    onChange={handlePPTFile} 
                    multiple 
                    style={{ marginBottom: "15px" }}
                  />
                  {pptFiles.length > 0 && (
                    <div style={{ marginTop: "10px" }}>
                      <p style={{ fontSize: "14px", color: "#666" }}>Selected PPT Files: {pptFiles.length}</p>
                      <PPTPreview files={pptFiles} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
              <div className="upload-btn-div">
                <button 
                  onClick={addChapter}
                  style={{ 
                    backgroundColor: "#7A1CAC", 
                    color: "white", 
                    border: "none", 
                    padding: "10px 20px", 
                    borderRadius: "5px", 
                    cursor: "pointer",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <AddCircleIcon fontSize="small" /> Upload Chapter
                </button>
              </div>
              <div className="upload-btn-div">
                <button 
                  onClick={addSection}
                  style={{ 
                    backgroundColor: "#2E073F", 
                    color: "white", 
                    border: "none", 
                    padding: "10px 20px", 
                    borderRadius: "5px", 
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Add Section
                </button>
              </div>
            </div>

            <div className="added-chapter" style={{ marginTop: "25px", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "15px" }}>
              <h6 style={{ color: "#2E073F", marginBottom: "15px" }}>Current Section Chapters</h6>
              {newSection.add_Content && newSection.add_Content.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {newSection.add_Content.map((chap, index) => (
                    <div key={index} className="chapter-item" style={{ 
                      backgroundColor: "#f5f5f5", 
                      padding: "15px", 
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid #e0e0e0"
                    }}>
                      <div>
                      <p style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#2E073F" }}>
                          {chap.chapter_title}
                        </p>
                        <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                          {chap.chapter_description.length > 100 
                            ? `${chap.chapter_description.substring(0, 100)}...` 
                            : chap.chapter_description}
                        </p>
                        <div style={{ display: "flex", gap: "10px", marginTop: "8px", fontSize: "12px" }}>
                          {chap.video_file.length > 0 && (
                            <span style={{ color: "#7A1CAC", display: "flex", alignItems: "center", gap: "3px" }}>
                              <i className="fa-solid fa-video"></i> {chap.video_file.length} video(s)
                            </span>
                          )}
                          {chap.ppt_file.length > 0 && (
                            <span style={{ color: "#7A1CAC", display: "flex", alignItems: "center", gap: "3px" }}>
                              <i className="fa-solid fa-file-powerpoint"></i> {chap.ppt_file.length} presentation(s)
                            </span>
                          )}
                          {chap.youtube_link && (
                            <span style={{ color: "#7A1CAC", display: "flex", alignItems: "center", gap: "3px" }}>
                              <i className="fa-brands fa-youtube"></i> YouTube link
                            </span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteChapter(index)} 
                        style={{ 
                          backgroundColor: "#ff5c5c", 
                          color: "white", 
                          border: "none", 
                          borderRadius: "5px", 
                          padding: "5px 10px", 
                          display: "flex", 
                          alignItems: "center", 
                          cursor: "pointer" 
                        }}
                      >
                        <DeleteIcon style={{ fontSize: "16px", marginRight: "5px" }} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#666", fontStyle: "italic" }}>No chapters added yet. Add chapters to complete your section.</p>
              )}
            </div>
          </div>

          <div className='content-div' style={{ marginTop: "2rem" }}>
            <button 
              id='next-btn' 
              style={{ 
                height: "3rem", 
                backgroundColor: "#7A1CAC", 
                color: "white", 
                border: "none", 
                padding: "0 20px", 
                borderRadius: "5px", 
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }} 
              onClick={MediaContainer}
            >
              Next <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className='add-new-category' id="add-new-category" style={{ display: "none" }}>
          <div className='adding-course-div' style={{ 
            width: "100%", 
            backgroundColor: "#fff", 
            padding: "20px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
          }}> 
            <h5 style={{ color: "#2E073F", marginBottom: "1.5rem" }}>Add media files</h5>
            <div className='upload-options' style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-image" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  Thumbnail
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input 
                    type="file" 
                    id='thumbnail_upload' 
                    name="thumbnail_upload" 
                    onChange={handledthumbnailUpload} 
                    accept="image/*"
                    style={{ marginBottom: "10px" }}
                  />
                  {thumbnail.map((preview, index) => (
                    <div key={index} style={{ position: "relative", marginTop: "10px" }}>
                      <img
                        src={preview}
                        alt={`thumbnail-preview-${index}`}
                        style={{ 
                          width: "100%", 
                          height: "auto", 
                          borderRadius: "5px",
                          border: "1px solid #e0e0e0"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-file-pdf" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  Main course file
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input 
                    type="file" 
                    name='file_upload' 
                    onChange={handleFileUpload} 
                    accept="application/pdf"
                    style={{ marginBottom: "10px" }}
                  />
                  {fileUpload.map((preview, index) => (
                    <iframe
                      key={index}
                      src={preview}
                      title={`pdf-preview-${index}`}
                      style={{ 
                        width: "100%", 
                        height: "200px", 
                        marginTop: "10px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "5px"
                      }}
                    ></iframe>
                  ))}
                </div>
              </div>
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-video" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  Upload video
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input 
                    type="file" 
                    id='video_upload' 
                    name='video_upload'
                    accept="video/*"
                    style={{ marginBottom: "10px" }}
                  />
                  <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
                    Select video files for the main course
                  </p>
                </div>
              </div>
            </div>
                 
            <div className='content-div' style={{ marginTop: "2rem", display: "flex", gap: "15px" }}>
              <button 
                id='previous-btn' 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#f0f0f0", 
                  color: "#333", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={BasicContainer}
              >
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
              <button 
                id='next-btn' 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#7A1CAC", 
                  color: "white", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={DocumentContainer}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="add-new-category" id="add-document-category" style={{ display: "none" }}>
          <div className="adding-course-div" style={{ 
            width: "100%", 
            backgroundColor: "#fff", 
            padding: "20px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
          }}>
            <h5 style={{ color: "#2E073F", marginBottom: "1.5rem" }}>Add Document Files</h5>
            <div className="upload-options" style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
              {/* PDF Upload */}
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-file-pdf" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  PDF File
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input
                    type="file"
                    name="pdf_file"
                    onChange={handlePdfFile}
                    accept="application/pdf"
                    style={{ marginBottom: "10px" }}
                  />
                  {pdfPreviews.map((preview, index) => (
                    <iframe
                      key={index}
                      src={preview}
                      title={`pdf-preview-${index}`}
                      style={{ 
                        width: "100%", 
                        height: "200px", 
                        marginTop: "10px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "5px"
                      }}
                    ></iframe>
                  ))}
                </div>
              </div>

              {/* Word Upload */}
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-file-word" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  Word File
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input
                    type="file"
                    name="word_file"
                    onChange={handleWordFile}
                    accept=".doc,.docx"
                    style={{ marginBottom: "10px" }}
                  />
                  {wordPreviews.length > 0 && (
                    <div style={{ 
                      marginTop: "15px", 
                      padding: "10px", 
                      border: "1px solid #e0e0e0", 
                      borderRadius: "5px",
                      backgroundColor: "#f5f5f5"
                    }}>
                      <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "8px" }}>
                        Uploaded Word Files:
                      </p>
                      {wordPreviews.map((preview, index) => (
                        <p
                          key={index}
                          style={{
                            fontSize: "13px",
                            margin: "5px 0",
                            padding: "5px",
                            backgroundColor: "#fff",
                            borderRadius: "3px",
                            border: "1px solid #e0e0e0",
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <i className="fa-solid fa-file-word" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                          {preview}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div style={{ 
                width: "30%", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                backgroundColor: "#f9f9f9"
              }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#2E073F", marginBottom: "10px" }}>
                  <i className="fa-solid fa-image" style={{ color: "#7A1CAC", marginRight: "8px" }}></i>
                  JPG File
                </p>
                <div className="upload-div" style={{ marginTop: "1rem" }}>
                  <input
                    type="file"
                    name="image_file"
                    onChange={handledocumentpicchange}
                    accept="image/*"
                    style={{ marginBottom: "10px" }}
                  />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                    {imagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`img-preview-${index}`}
                        style={{ 
                          width: "100px", 
                          height: "100px", 
                          objectFit: "cover",
                          borderRadius: "5px",
                          border: "1px solid #e0e0e0"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="content-div" style={{ marginTop: "2rem", display: "flex", gap: "15px" }}>
              <button 
                id="previous-btn" 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#f0f0f0", 
                  color: "#333", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={MediaContainer}
              >
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
              <button 
                id="next-btn" 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#7A1CAC", 
                  color: "white", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={FinishContainer}
              >
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="add-new-category" id="finish_div" style={{ display: "none" }}>
          <div className='adding-course-div' style={{ 
            width: "100%", 
            backgroundColor: "#fff", 
            padding: "30px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}> 
            <h4 style={{ color: "#2E073F", marginBottom: "20px" }}>Course Summary</h4>
            
            {course.course_title_main && (
              <div style={{ 
                marginBottom: "25px", 
                backgroundColor: "#f9f9f9", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0"
              }}>
                <h5 style={{ color: "#7A1CAC", marginBottom: "15px" }}>Course Details</h5>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ 
                    flex: "1 1 300px", 
                    padding: "10px", 
                    backgroundColor: "#fff", 
                    borderRadius: "5px", 
                    border: "1px solid #e0e0e0"
                  }}>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Title</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#2E073F" }}>{course.course_title_main}</p>
                  </div>
                  
                  <div style={{ 
                    flex: "1 1 300px", 
                    padding: "10px", 
                    backgroundColor: "#fff", 
                    borderRadius: "5px", 
                    border: "1px solid #e0e0e0"
                  }}>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Price</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#2E073F" }}>{course.course_price}</p>
                  </div>
                  
                  <div style={{ 
                    flex: "1 1 300px", 
                    padding: "10px", 
                    backgroundColor: "#fff", 
                    borderRadius: "5px", 
                    border: "1px solid #e0e0e0"
                  }}>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>Category</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#2E073F" }}>{course.add_main_category} / {course.add_sub_category}</p>
                  </div>
                </div>
              </div>
            )}
            
            {course.sections.length > 0 && (
              <div style={{ 
                marginBottom: "25px", 
                backgroundColor: "#f9f9f9", 
                padding: "20px", 
                borderRadius: "8px", 
                border: "1px solid #e0e0e0",
                textAlign: "left"
              }}>
                <h5 style={{ color: "#7A1CAC", marginBottom: "15px" }}>Course Structure</h5>
                <p style={{ color: "#2E073F", fontWeight: "bold" }}>{course.sections.length} section(s) created</p>
                
                <div style={{ marginTop: "10px" }}>
                  {course.sections.map((section, index) => (
                    <div key={index} style={{ 
                      backgroundColor: "#fff", 
                      padding: "15px", 
                      borderRadius: "5px", 
                      marginBottom: "10px",
                      border: "1px solid #e0e0e0"
                    }}>
                      <h6 style={{ color: "#2E073F", margin: "0 0 10px 0" }}>
                        Section {index + 1}: {section.section_title}
                      </h6>
                      <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
                        {section.add_Content.length} chapter(s)
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button 
              onClick={handleSubmit}
              style={{ 
                backgroundColor: "#7A1CAC", 
                color: "white", 
                border: "none", 
                padding: "15px 30px", 
                borderRadius: "5px", 
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                marginBottom: "20px"
              }}
            > 
              <UploadIcon /> Upload Course
            </button>

            <div className='content-div' style={{ marginTop: "1rem" }}>
              <button 
                id='previous-btn' 
                style={{ 
                  height: "3rem", 
                  backgroundColor: "#f0f0f0", 
                  color: "#333", 
                  border: "none", 
                  padding: "0 20px", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onClick={DocumentContainer}
              > 
                <i className="fa-solid fa-arrow-left"></i> Previous 
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateNewCourse;


