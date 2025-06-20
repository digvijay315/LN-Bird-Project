import {React,useState,useEffect} from 'react';
import api from '../api'; // adjust the path as needed
import Lawyersidebar from './lawyersidebar';
import '../css/lawyerprofile.css'
import { Offcanvas, Button, Tab, Tabs } from 'react-bootstrap';
import { TextField, MenuItem, Card, CardContent, Typography, Grid } from '@mui/material';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { IconButton, Tooltip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const LawyerProfileModal = () => {
    
      const lawyerdetails = JSON.parse(localStorage.getItem('userDetails'));

        const [show, setShow] = useState(false);
        const [activeTab1, setActiveTab1] = useState('');

         const handleShow = () => {
            setActiveTab1('personal');
            setShow(true);
        };

        const handleClose = () => {
            setShow(false);
        };

const[lawyerprofile,setlawyerprofile]=useState({specializations:"",languages:[],practice:"",proofofpractice:[],degree:[''],university:[''],
                                                certificate:[''],barEnrolment: '',barState: '',barYear: '',barCertificate:[],
                                                aibeNo: '',aibeCertificate:[],})

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const indiaStates = State.getStatesOfCountry('IN');
    const mappedStates = indiaStates.map(state => ({
      value: state.isoCode,
      label: state.name
    }));
    setStateOptions(mappedStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState('IN', selectedState.value);
      const mappedCities = cities.map(city => ({
        value: city.name,
        label: city.name
      }));
      setCityOptions(mappedCities);
      setSelectedCity(null); // reset city when state changes
    }
  }, [selectedState]);


  const specializations = [
  { value: 'family', label: 'Family Law' },
  { value: 'criminal', label: 'Criminal Law' },
  { value: 'corporate', label: 'Corporate Law' },
  { value: 'property', label: 'Property Law' },
];

const languages = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'marathi', label: 'Marathi' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'bengali', label: 'Bengali' },
];

const practiceTypes = [
  { value: 'solo', label: 'Solo' },
  { value: 'lawfirm', label: 'Law Firm' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'government', label: 'Government' },
];

const degreeOptions = ['LLB', 'LLM', 'BA LLB', 'BBA LLB', 'Other'];
const addEducationField = () => {
  setlawyerprofile((prev) => ({
    ...prev,
    degree: [...prev.degree, ""],
    university: [...prev.university, ""],
    certificate: [...prev.certificate, null],
  }));
};

const handleDeleteEducation = (index) => {
  setlawyerprofile((prev) => ({
    ...prev,
    degree: prev.degree.filter((_, i) => i !== index),
    university: prev.university.filter((_, i) => i !== index),
    certificate: prev.certificate.filter((_, i) => i !== index),
  }));
};

const stateBarCouncils = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal',
  'Uttar Pradesh', 'Rajasthan', 'Punjab & Haryana', 'Kerala', 'Gujarat',
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

return (  
   <div className="profile-container">
  <Lawyersidebar />

  <main className="main11">
    <div className="profile-card">
      <h2>My Profile</h2>

      <img
        src={lawyerdetails.lawyer.profilepic[0]}
        alt="Profile"
        className="profile-image"
      />

      <div className="profile-info">
        <h4>Name: {lawyerdetails.lawyer.firstName} {lawyerdetails.lawyer.lastName}</h4>
        <h4>Phone: {lawyerdetails.lawyer.phone}</h4>
        <h4>Experience: {lawyerdetails.lawyer.yearsOfExperience} years</h4>
        <h4>Status: {lawyerdetails.lawyer.status}</h4>
      </div>

      <div className="profile-buttons">
        <button className="edit-btn">Edit</button>
        <button className="complete-btn" onClick={handleShow}>Complete Profile</button>
      </div>
    </div>
  </main>

    <Offcanvas show={show} onHide={handleClose} placement="end" className="lawyer-offcanvas" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-primary">Complete Your Profile</Offcanvas.Title>
        </Offcanvas.Header>
      <Offcanvas.Body>
 <div>
    <Tabs
      activeKey={activeTab1}
      onSelect={(k) => setActiveTab1(k)}
      className="mb-3 nav-pills flex-nowrap"
      justify
      style={{ flexWrap: 'nowrap' }}
    >
    {/* PERSONAL TAB */}
    <Tab eventKey="personal" title="👤 Personal">
      <div className="tab-content-section">

         <Card elevation={3} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Personal Details
            </Typography>

            <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className="custom-textfield"
            select
            label="Gender"
            name="gender"
            fullWidth
            size="small"
            variant="outlined"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            className="custom-textfield"
            label="Date of Birth"
            name="dob"
            type="date"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="custom-textfield"
            label="Alternate Contact No"
            name="altContact"
            type="tel"
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="custom-textfield"
            label="Residential Address"
            name="residentialAddress"
            multiline
            minRows={2}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={stateOptions}
            value={selectedState}
            onChange={setSelectedState}
            name="state"
            placeholder="Select State"
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </Grid>

        <Grid item xs={12}>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={cityOptions}
            value={selectedCity}
            onChange={setSelectedCity}
            name="city"
            placeholder="Select City"
            isDisabled={!selectedState}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="custom-textfield"
            label="PIN Code"
            name="pincode"
            type="text"
            inputProps={{ maxLength: 6 }}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="custom-textfield"
            label="Correspondence Address (Optional)"
            name="correspondenceAddress"
            multiline
            minRows={2}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button variant="contained" color="primary" className="custom-button save">
            Save
          </Button>
          <Button variant="outlined" color="secondary" className="custom-button reset">
            Reset
          </Button>
        </Grid>
      </Grid>
          </CardContent>
        </Card>

      </div>
    </Tab>

    {/*====================================== EDUCATION TAB ===============================================================*/}


    <Tab eventKey="education" title="🎓 Education">
      <div className="tab-content-section">
    {lawyerprofile.degree.map((_, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{
            marginBottom: 3,
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Education {index + 1}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                name='degree'
                 className="custom-textfield"
                  select
                  label="Degree"
                  value={lawyerprofile.degree[index] || ""}
                //   onChange={(e) =>
                //     handleEducationChange(index, "degree", e.target.value, lawyerprofile, setlawyerprofile)
                //   }
                  fullWidth
                  size="small"
                >
                  {degreeOptions.map((deg) => (
                    <MenuItem key={deg} value={deg}>
                      {deg}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                 className="custom-textfield"
                name='university'
                  label="University/College Name"
                  value={lawyerprofile.university[index] || ""}
                //   onChange={(e) =>
                //     handleEducationChange(index, "university", e.target.value, lawyerprofile, setlawyerprofile)
                //   }
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <label
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Degree Certificate
                </label>
                <input
                name='certificate'
                 className="custom-textfield"
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  id={`certificate-${index}`}
                  style={{ display: "none" }}
                   onChange={(e) => setlawyerprofile({...lawyerprofile,certificate:Array.from(e.target.files)})}
                />
                <label htmlFor={`certificate-${index}`}>
                  <IconButton
                    component="span"
                    sx={{
                      border: "1px solid #1976d2",
                      borderRadius: "6px",
                      backgroundColor: "#e3f2fd",
                      padding: "8px",
                    }}
                  >
                    <UploadFileIcon />
                  </IconButton>
                </label>
                {lawyerprofile.certificate[index] && (
                  <div style={{ marginTop: 8, fontSize: 13 }}>
                    {lawyerprofile.certificate[index].name}
                  </div>
                )}
              </Grid>
              <Grid container justifyContent="space-between" alignItems="center">
            {lawyerprofile.degree.length >=1 && (
                <IconButton
                aria-label="delete"
                size="small"
                  onClick={() => handleDeleteEducation(index)}
                >
                <DeleteIcon fontSize="small" />
                </IconButton>
            )}
            </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Grid item xs={12} style={{ textAlign: "right" }}>
        <Button
          variant="outlined"
          onClick={() => addEducationField()}
          style={{
            textTransform: "none",
            borderRadius: "8px",
            borderColor: "#1976d2",
            color: "#1976d2",
          }}
        >
          + Add Education
        </Button>
      </Grid>
     

      </div>
    
    </Tab>

    {/*============================== BAR COUNCIL TAB =====================================================================*/}


    <Tab eventKey="barcouncil" title="📜 Bar Council">
      <div className="tab-content-section">
           <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
         className="custom-textfield"
          label="Bar Council Enrolment Number"
          name="barEnrolment"
          value={lawyerprofile.barEnrolment || ''}
        //   onChange={(e) => handleInputChange('barEnrolment', e.target.value)}
          fullWidth
          size="small"
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
         className="custom-textfield"
          select
          label="State Bar Council"
          name="barState"
          value={lawyerprofile.barState || ''}
        //   onChange={(e) => handleInputChange('barState', e.target.value)}
          fullWidth
          size="small"
          variant="outlined"
        >
          {stateBarCouncils.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
         className="custom-textfield"
          select
          label="Year of Registration"
          name="barYear"
          value={lawyerprofile.barYear || ''}
        //   onChange={(e) => handleInputChange('barYear', e.target.value)}
          fullWidth
          size="small"
          variant="outlined"
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
          Bar Council Certificate Upload
        </label>
        <input
         className="custom-textfield"
          id="barCertificate"
          type="file"
          name="barCertificate"
          accept=".pdf,.jpg,.jpeg,.png"
         onChange={(e) => setlawyerprofile({...lawyerprofile,barCertificate:Array.from(e.target.files)})}
          style={{ display: 'none' }}
        />
        <label htmlFor="barCertificate">
          <Tooltip title="Upload Bar Certificate">
            <IconButton
              component="span"
              sx={{
                border: '1px solid #1976d2',
                borderRadius: '6px',
                padding: '10px',
                backgroundColor: '#e3f2fd',
              }}
            >
              <UploadFileIcon />
            </IconButton>
          </Tooltip>
        </label>
        {lawyerprofile.barCertificate?.length > 0 && (
    <div style={{ marginTop: '10px', fontSize: '14px' }}>
      <strong>Selected {lawyerprofile.barCertificate.length} file(s):</strong>
      <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
        {lawyerprofile.barCertificate.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  )}
      </Grid>

      <Grid item xs={12}>
        <TextField
         className="custom-textfield"
          label="AIBE Certificate Number (Optional)"
          name="aibeNo"
          value={lawyerprofile.aibeNo || ''}
        //   onChange={(e) => handleInputChange('aibeNo', e.target.value)}
          fullWidth
          size="small"
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
          AIBE Certificate Upload (Optional)
        </label>
        <input
         className="custom-textfield"
          id="aibeCertificate"
          type="file"
          name="aibeCertificate"
          accept=".pdf,.jpg,.jpeg,.png"
         onChange={(e) => setlawyerprofile({...lawyerprofile,aibeCertificate:Array.from(e.target.files)})}
          style={{ display: 'none' }}
        />
        <label htmlFor="aibeCertificate">
          <Tooltip title="Upload AIBE Certificate">
            <IconButton
              component="span"
              sx={{
                border: '1px solid #1976d2',
                borderRadius: '6px',
                padding: '10px',
                backgroundColor: '#e3f2fd',
              }}
            >
              <UploadFileIcon />
            </IconButton>
          </Tooltip>
        </label>
         {lawyerprofile.aibeCertificate?.length > 0 && (
    <div style={{ marginTop: '10px', fontSize: '14px' }}>
      <strong>Selected {lawyerprofile.aibeCertificate.length} file(s):</strong>
      <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
        {lawyerprofile.aibeCertificate.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  )}
      </Grid>

       <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button variant="contained" color="primary" className="custom-button save">
            Save
          </Button>
          <Button variant="outlined" color="secondary" className="custom-button reset">
            Reset
          </Button>
        </Grid>
    </Grid>
      </div>
    </Tab>

    {/*===================================== PROFESSIONAL TAB ===================================================================*/}


    <Tab eventKey="professional" title="💼 Professional">
      <div className="tab-content-section">
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            isMulti
            options={specializations}
            value={lawyerprofile.specializations}
            placeholder="Select Specializations"
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          />
        </Grid>

       <Grid item xs={12}>
        <Select
            className="react-select-container"
            classNamePrefix="react-select"
            isMulti
            options={languages}
            value={lawyerprofile.languages}
            onChange={(selectedOptions) =>
            setlawyerprofile((prev) => ({
                ...prev,
                languages: selectedOptions,
            }))
            }
            placeholder="Languages Spoken"
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        />
        </Grid>


        <Grid item xs={12}>
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={practiceTypes}
            value={lawyerprofile.practice}
            placeholder="Current Practice Type"
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="custom-textfield"
            label="Name of Law Firm/Organization"
            name="firmName"
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="custom-textfield"
            label="Office Address"
            name="officeAddress"
            multiline
            minRows={2}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="custom-textfield"
            label="Bar Association Membership"
            name="barAssociation"
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

       <Grid item xs={12}>
  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
    Proof of Practice (Vakalatnamas, Cause List, etc.)
  </label>

  <input
    id="proofOfPractice"
    name="proofOfPractice"
    type="file"
    accept=".pdf, .jpg, .jpeg, .png"
    multiple
    onChange={(e) => setlawyerprofile({...lawyerprofile,proofofpractice:Array.from(e.target.files)})}
    style={{ display: 'none' }}
  />

  <label htmlFor="proofOfPractice">
    <Tooltip title="Upload Proof Files">
      <IconButton
        color="primary"
        component="span"
        style={{
          border: '1px solid #1976d2',
          borderRadius: '6px',
          padding: '10px',
          backgroundColor: '#e3f2fd',
        }}
      >
        <UploadFileIcon />
      </IconButton>
    </Tooltip>
  </label>
    {/* ✅ File list or count */}
  {lawyerprofile.proofofpractice?.length > 0 && (
    <div style={{ marginTop: '10px', fontSize: '14px' }}>
      <strong>Selected {lawyerprofile.proofofpractice.length} file(s):</strong>
      <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
        {lawyerprofile.proofofpractice.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  )}
        </Grid>


        <Grid item xs={12}>
          <TextField
            className="custom-textfield"
            label="Professional Bio / Description"
            name="bio"
            multiline
            minRows={4}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>

         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button variant="contained" color="primary" className="custom-button save">
            Save
          </Button>
          <Button variant="outlined" color="secondary" className="custom-button reset">
            Reset
          </Button>
        </Grid>
      </Grid>
      </div>
    </Tab>

    {/* VERIFICATION & KYC TAB */}
    <Tab eventKey="verification_kyc" title="🔍 Verification & KYC">
      <div className="tab-content-section">
        <p><strong>Aadhar:</strong> Verified</p>
        <p><strong>PAN:</strong> Verified</p>
      </div>
    </Tab>

    {/* CONSULTATION & AVAILABILITY TAB */}
    <Tab eventKey="consultation_availability" title="📆 Consultation">
      <div className="tab-content-section">
        <p><strong>Available Days:</strong> Mon - Fri</p>
        <p><strong>Time:</strong> 10 AM - 5 PM</p>
      </div>
    </Tab>

    {/* BANK DETAILS TAB */}
    <Tab eventKey="bank_details" title="🏦 Bank Details">
      <div className="tab-content-section">
        <p><strong>Account Number:</strong> XXXX-XXXX-1234</p>
        <p><strong>IFSC:</strong> ABCD0123456</p>
      </div>
    </Tab>

    {/* DECLARATIONS & AGREEMENTS TAB */}
    <Tab eventKey="declarations_agreements" title="📝 Declarations">
      <div className="tab-content-section">
        <p><strong>Terms Accepted:</strong> Yes</p>
        <p><strong>Signed Date:</strong> Jan 1, 2024</p>
      </div>
    </Tab>
  </Tabs>
  </div>
</Offcanvas.Body>

      </Offcanvas>

</div>

    );
};

export default LawyerProfileModal;