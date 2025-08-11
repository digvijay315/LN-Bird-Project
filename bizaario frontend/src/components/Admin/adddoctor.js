import React, { useState ,useRef, useEffect} from 'react';
import {
  Box, Grid, Button, Typography, Card, CardContent, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup,
  FormControlLabel, Radio, Fade,Chip,Menu
} from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
import { Checkbox, FormGroup } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {  IconButton,  Tooltip } from '@mui/material';
import Adminheader from './adminheader';
import Adminsidebar from './adminsidebar';
import '../Admin/admincss/adddoctor.css';
import addmedicalboardicon from '../Admin/images/image 43.png'
import addhospitalpartnersicon from '../Admin/images/image 431.png'
// import selectimageicon from '../Admin/images/Young man face avater vector illustration design _ Premium Vector 1.png'
import api from '../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../loader';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';





const initialForm = {
  profile_pic:[],
  profile_pic_preview:[],
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  state: '',
  city: '',
  postal_code: '',
  dateOfBirth: '',
  gender: '',
  password: '',
  qualification:[],
  medical_specialty :'',
  hospital_association:[],
  clinic_name:'',
  clinic_address1:'',
  clinic_address2:'',
  clinic_state:'',
  clinic_city:'',
  clinic_postal_code:'',
  clinic_geo_location:'',
  subscription:[]
};

export default function AdminAddDoctorHospital() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const[customhospitalassociation,setcustomhospitalassociation]=useState("")

 const handlecustomhospitalassociationchange = (e) => {
  setcustomhospitalassociation(e.target.value);
};

// When user confirms
const saveCustomHospitalAssociation = () => {
  if (customhospitalassociation.trim() !== "") {
    setForm((prev) => ({
      ...prev,
      hospital_association: [customhospitalassociation],
    }));
  }
};


    const inputRef = useRef();

 const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    setForm({
      ...form,
      profile_pic: file,
      profile_pic_preview: previewUrl,
    });
  }
};


const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setForm((prev) => {
    // If dropdown/multiple select returns an array directly
    if (Array.isArray(value)) {
      return { ...prev, [name]: value };
    }

    // If the state field is already an array (checkbox group)
    if (Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add
        : prev[name].filter((item) => item !== value); // Remove
      return { ...prev, [name]: updated };
    }

     // If this is a checkbox group for an array field
    if (type === "checkbox" && Array.isArray(prev[name])) {
      const updated = checked
        ? [...prev[name], value] // Add to array
        : prev[name].filter((item) => item !== value); // Remove from array
      return { ...prev, [name]: updated };
    }

    // If this is a single checkbox (boolean)
    if (type === "checkbox") {
      return { ...prev, [name]: checked };
    }

    // Normal single-value field
    return { ...prev, [name]: type === "checkbox" ? checked : value };
  });
};


//============================ post request of add doctor================================================

  const handleSubmit = async(e) => {
    e.preventDefault();
     setLoading(true);
    try {
      
      const resp=await api.post('/doctor/adddoctor',form,{headers: {
                                    "Content-Type": "multipart/form-data",
                                  }
                                }
      )
      if(resp.status===200)
      {
        Swal.fire({
          icon:"success",
          title:"Profile Created",
          text:"Doctor Profile Created Successfully...",
          showConfirmButton:true
        }).then(()=>
        {
          window.location.reload()
        })
       
      }
      
    } catch (error) {
      Swal.fire({
        icon:"error",
        title:"error ",
        text:error.response.data.message,
        showConfirmButton:true
      })
      console.log(error);
      
    }finally
    {
      setLoading(false)
    }
  };


  // =============================get request of all doctor=========================================

  const[alldoctor,setalldoctor]=useState([])
  const getalldoctor=async()=>
  {
    try {
      const resp=await api.get('doctor/getalldoctor')
      setalldoctor(resp.data.doctor)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>
  {
    getalldoctor()

  },[])

 

  //=================================== display table===============================================

   const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const onEdit=()=>
  {
    alert("edit")
  }

  const onDelete=()=>
  {
    alert("delete")
  }

  const columns = [
    { field: 'sno', headerName: 'S.No.', flex: 0.2,renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1},
    { field: 'fullname', headerName: 'FUll Name', flex: 1, renderCell: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
    { field: 'medical_specialty', headerName: 'Specialty', flex: 1 },
   
    {
      field: 'qualification',
      headerName: 'Qualification',
      flex: 1,
      valueGetter: (params) => params.value?.join(', '),
    },
   
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => { onEdit(params.row._id); handleCloseMenu(); }}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => { onDelete(params.row._id); handleCloseMenu(); }}>
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const rows = alldoctor.map((doc, index) => ({
    id: doc._id || index,
    ...doc,
  }));
  




  // ===============================add hospital======================================================

  const [hospital,sethospital]=useState({hospital_name:"",hospital_type:"",addressline1:"",addressline2:"",
                                          city:"",state:"",postel_code:"",geo_location:""})

  return (
    <>
      <Adminheader />
      <Adminsidebar />
     

      <div className="adddoctor">
        <Box
          sx={{
            minHeight: '100vh',
            background: '#f7f8fa',
            width: '100%',
            pt: { xs: 3, md: 5 },
            pb: 4,
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* ============== TOP CARDS ============== */}
          <Grid container spacing={3} justifyContent="flex-start">
            <Grid item xs={12} sm={'auto'}>
              <Card
                onClick={() => {
                  setOpen(true)
                  setOpen1(false)
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 3,
                  py: 1.5,
                  marginLeft:"16px",
                  cursor: 'pointer',borderRadius:"20px",
                  boxShadow: open ? 4 : 1,
                //   border: open ? '2px solid #4d7bf3' : '2px solid #e3eafc',
                  '&:hover': { boxShadow: 6, border: '2px solid #4d7bf3' },
                  mb: { xs: 2, sm: 0 },
                }}
                elevation={0}
              >
                <img className='cardicons' src={addmedicalboardicon} style={{borderRadius:"50%",border:"3px solid #DD4343"}} alt=''></img>
                {/* <AddCircleOutlineIcon sx={{ fontSize: 42, color: '#4d7bf3', mr: 2 }} /> */}
                <Box>
                    
                  <Typography sx={{ color: '#4d7bf3', fontWeight: 700, fontSize: 18,marginLeft:"5px" }}>
                    Add Medical Board
                  </Typography>
                </Box>
              </Card>
            </Grid>

              <Grid item xs={12} sm={'auto'}>
              <Card
                  onClick={() => {
                  setOpen(false)
                  setOpen1(true)
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 3,
                  py: 1.5,
                  cursor: 'pointer',
                  borderRadius:"20px",
                  boxShadow: open ? 4 : 1,
                //   border: open ? '2px solid #4d7bf3' : '2px solid #e3eafc',
                  '&:hover': { boxShadow: 6, border: '2px solid #4d7bf3' },
                  mb: { xs: 2, sm: 0 },
                }}
                elevation={0}
              >
                 <img className='cardicons' src={addhospitalpartnersicon} style={{borderRadius:"50%",border:"3px solid #DD4343"}} alt=''></img>
                {/* <AddCircleOutlineIcon sx={{ fontSize: 42, color: '#4d7bf3', mr: 2 }} /> */}
                <Box>
                  <Typography sx={{ color: '#4d7bf3', fontWeight: 700, fontSize: 18,marginLeft:"5px" }}>
                    Add Hospitals Partners
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* ============== FORM & PROFILE AREA ============== */}
        <div className='profile-header' style={{display:open?"block" : "none"}}>
          <h3>Enter Details for Active Doctor Profile</h3>
          <p>Add or update the required details for the active doctor profile to keep records accurate and complete.</p>
          </div>

  {/* ================================add doctor================================================ */}

  
          <Fade in={open} className='doctorform'>
            <Box>
              {open && (
                <Box
                  sx={{
                    mt: { xs: 3, lg: 5 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}
                >
                  <Grid container spacing={4} sx={{ maxWidth: 1150, width: '100%' }} >
                    {/* ===== Left: FORM ===== */}
                   <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{
                  background: '#fff',
                  borderRadius: 3,
                  boxShadow: 3,
                  minWidth:440,
                  maxWidth: { xs: 630, lg: 900 },
                  p: { xs: 2, sm: 3, md: 5 },
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2, // spacing between inputs
                }}
              >
  

     <Box  sx={{ position: 'relative', display: 'inline-block', minWidth: 100,height: 100,marginLeft:"40%" }}>
      <Avatar
        src={form.profile_pic_preview}
        sx={{
          width: 100,
          height: 100,
          border: '3px solid #fff',
          boxShadow: 2,
        }}
      />

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      <Tooltip title="Edit profile picture">
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 100,
            bgcolor: '#fff',
            border: '1px solid #ccc',
            width: 30,
            height: 30,
            '&:hover': {
              bgcolor: '#f0f0f0',
            },
          }}
          onClick={() => inputRef.current.click()}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>

 

  <TextField
    name="firstName"
    label="First Name"
    value={form.firstName}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="lastName"
    label="Last Name"
    value={form.lastName}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="address1"
    label="Address1"
    value={form.address1}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="address2"
    label="Address 2"
    value={form.address2}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="state"
    label="State"
    value={form.state}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="city"
    label="City"
    value={form.city}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="postal_code"
    label="Postal Code"
    value={form.postal_code}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="dateOfBirth"
    label="Date of Birth"
    type="date"
    InputLabelProps={{ shrink: true }}
    value={form.dateOfBirth}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <FormControl component="fieldset" sx={{ mt: 0 }}>
    <Typography sx={{ fontWeight: 500 }}>Gender</Typography>
    <RadioGroup size="small"
      row
      name="gender"
      value={form.gender}
      onChange={handleChange}
      sx={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
    >
      <FormControlLabel value="Male" control={<Radio />} label="Male" />
      <FormControlLabel value="Female" control={<Radio />} label="Female" />
      <FormControlLabel value="Other" control={<Radio />} label="Others" />
    </RadioGroup>
  </FormControl>

  



  <TextField
    type="password"
    name="password"
    label="Password"
    value={form.password}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <FormControl fullWidth size="small">
    <InputLabel>Qualification</InputLabel>
    <Select 
    multiple
      name="qualification"
      label="Qualification"
      value={form.qualification}
      onChange={handleChange}
       renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
      <MenuItem value="United Kingdom">Not In List</MenuItem>
    </Select>
  </FormControl>

  <FormControl fullWidth size="small">
    <InputLabel>Medical Specialty</InputLabel>
    <Select 
      name="medical_specialty"
      label="Medical Specialty"
      value={form.medical_specialty}
      onChange={handleChange}
      
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
      <MenuItem value="United Kingdom">Not In List</MenuItem>
    </Select>
  </FormControl>

   <FormControl fullWidth size="small">
    <InputLabel>Hospital Association  </InputLabel>
    <Select 
      multiple
      name="hospital_association"
      label="Hospital Association"
      value={form.hospital_association}
      onChange={handleChange}
       renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
      <MenuItem value="Not In List">Not In List</MenuItem>
    </Select>

    {form.hospital_association.includes("Not In List") && (
        <TextField
          fullWidth
          size="small"
          label="Enter your Hospital Association"
          value={customhospitalassociation}
          onChange={handlecustomhospitalassociationchange}
          onBlur={saveCustomHospitalAssociation}
          sx={{ mt: 2 }}
        />
      )}

  </FormControl>


<TextField
    type="text"
    name="clinic_name"
    label="Clinic Name"
    value={form.clinic_name}
    onChange={handleChange}
    fullWidth
    size="small"
  />

   <TextField
    name="clinic_address1"
    label="Address1"
    value={form.clinic_address1}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="clinic_address2"
    label="Address 2"
    value={form.clinic_address2}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="clinic_state"
    label="State"
    value={form.clinic_state}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="clinic_city"
    label="City"
    value={form.clinic_city}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="clinic_postal_code"
    label="Postal Code"
    value={form.clinic_postal_code}
    onChange={handleChange}
    fullWidth
    size="small"
  />
 
  <TextField
    name="clinic_geo_location"
    label="Geo Location"
    value={form.clinic_geo_location}
    onChange={handleChange}
    fullWidth
    size="small"
  />

 <FormControl component="fieldset">
  <Typography sx={{ fontWeight: 500 }}>Subscription</Typography>
  <FormGroup row>
    <FormControlLabel
      control={
        <Checkbox size="small"
          checked={form.subscription.includes('Digital CME')}
          onChange={handleChange}
          name="subscription"
          value="Digital CME"
        />
      }
      label="Digital CME"
    />
    <FormControlLabel
      control={
        <Checkbox size="small"
          checked={form.subscription.includes('Innovative Cases')}
          onChange={handleChange}
          name="subscription"
          value="Innovative Cases"
        />
      }
      label="Innovative Cases"
    />
  </FormGroup>
</FormControl>


  

  <Button
    variant="contained"
    color="primary"
    fullWidth
    type="submit"
    sx={{ py: 1.2, fontSize: 16, fontWeight: 600, borderRadius: 2, mt: 1 }}
  >
    Submit
  </Button>
</Box>


{/* =========================== Right: doctor table =================================== */}
                    <Grid item xs={12} md={5} sx={{ mt: { xs: 3, md: 0 } } }>
                       <Box
                       className='right-section'
                component="form"
                autoComplete="off"
                sx={{
                  background: '#fff',
                  borderRadius: 3,
                  boxShadow: 3,
                  minWidth:510,
                  maxWidth: 530,
                  p: { xs: 0, sm: 0, md: 0 },
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2, // spacing between inputs
                }}
              >
                    
                                      
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
          borderRadius: 3.5,
          boxShadow: 6,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#4d7bf3',
            color: 'black',
            fontWeight: 'bold',
          },
        }}
      />
      </Box>
      
 

                         
                    
                  
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Fade>

{/* ============================add hospital partners============================================ */}


  <Fade in={open1} className='hospitalform'>
            <Box>
              {open1 && (
                <Box
                  sx={{
                    mt: { xs: 3, lg: 5 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}
                >
                  <Grid container spacing={4} sx={{ maxWidth: 1150, width: '100%' }} >
                    {/* ===== Left: FORM ===== */}
                   <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{
                  background: '#fff',
                  borderRadius: 3,
                  boxShadow: 3,
                  minWidth:400,
                  maxWidth: 630,
                  p: { xs: 2, sm: 3, md: 5 },
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2, // spacing between inputs
                }}
              >
  

  <TextField
    name="hospital_name"
    label="Hospital Name"
    value={hospital.hospital_name}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <FormControl fullWidth size="small">
    <InputLabel>Hospital Type</InputLabel>
    <Select 
      name="hospital_type"
      label="Hospital Type"
      value={hospital.hospital_type}
      onChange={handleChange}
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
    </Select>
  </FormControl>



  <TextField
    name="addressline1"
    label="Address1"
    value={hospital.addressline1}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="addressline2"
    label="Address 2"
    value={hospital.addressline2}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <FormControl fullWidth size="small">
    <InputLabel>State</InputLabel>
    <Select 
      name="state"
      label="State"
      value={hospital.state}
      onChange={handleChange}
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
    </Select>
  </FormControl>

  <FormControl fullWidth size="small">
    <InputLabel>City</InputLabel>
    <Select 
      name="city"
      label="City"
      value={hospital.city}
      onChange={handleChange}
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
    </Select>
  </FormControl>

  <TextField
    name="postel_code"
    label="Postel Code"
    value={hospital.postel_code}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="geo_location"
    label="Geo Location"
    value={hospital.geo_location}
    onChange={handleChange}
    fullWidth
    size="small"
  />


  <Button
    variant="contained"
    color="primary"
    fullWidth
    type="submit"
    sx={{ py: 1.2, fontSize: 16, fontWeight: 600, borderRadius: 2, mt: 1 }}
  >
    Submit
  </Button>
</Box>


                    {/* ===== Right: Live Profile Card ===== */}
                    <Grid item xs={12} md={5} sx={{ mt: { xs: 3, md: 0 } } }>
                      <Card className='rightsection'
                        sx={{
                          background: '#4d7bf3',
                          color: '#fff',
                          borderRadius: 3.5,
                          boxShadow: 6,
                          minWidth: 550,
                          maxWidth:650,
                          paddingTop:"30px",
                          mx: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center',}}>
                            <Avatar
                            src={form.profile_pic_preview}
                              sx={{
                                bgcolor: '#fff',
                                color: '#4d7bf3',
                                width: 62,
                                height: 62,
                                mr: 2,
                                fontSize: 38,
                                border: '4px solid #fff',
                                boxShadow: 2,
                              }}
                            >
                            
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                                {form.firstName} {form.lastName}
                              </Typography>
                              <Typography sx={{ color: '#e3eafc', fontSize: 15 }}>
                                {form.dateOfBirth}{' '}
                                {form.gender}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Details */}
                          <Typography variant="subtitle2" sx={{ color: '#e3eafc',marginTop:"20px" }}>
                            Address
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <>
                            {form.address}
                            {form.address2}<span>{" "}</span>
                            {form.city}, {form.state}, {form.postalCode} ,{form.country}
                          
                          </>
                          </Typography>

                          <Typography variant="subtitle2" sx={{ color: '#e3eafc', mt: 1 }}>
                            Phone
                          </Typography>
                          <Typography variant="body2">{form.phone_no}</Typography>

                          <Typography variant="subtitle2" sx={{ color: '#e3eafc', mt: 1 }}>
                            Email
                          </Typography>
                          <Typography variant="body2">{form.email}</Typography>

                          {form.website && (
                            <>
                              <Typography variant="subtitle2" sx={{ color: '#e3eafc', mt: 1 }}>
                                Website
                              </Typography>
                              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                {form.website}
                              </Typography>
                            </>
                          )}

                            {form.password && (
                            <>
                              <Typography variant="subtitle2" sx={{ color: '#e3eafc', mt: 1 }}>
                                Password
                              </Typography>
                              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                {form.password}
                              </Typography>
                            </>
                          )}

                          <Typography variant="subtitle2" sx={{ color: '#e3eafc', mt: 1 }}>
                            Subscription
                          </Typography>
                          <Typography variant="body2">{form.subscription}</Typography>

                          <Typography variant="subtitle2" sx={{ color: '#e3eafc', mt: 1 }}>
                            Bio
                          </Typography>
                          <Typography variant="body2">
                            {form.bio}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Fade>

        </Box>

 {loading && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(255, 255, 255, 0.6)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <UniqueLoader />
  </div>
)}



      </div>
    </>
  );
}
