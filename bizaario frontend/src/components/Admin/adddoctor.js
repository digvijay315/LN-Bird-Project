import React, { useState ,useRef} from 'react';
import {
  Box, Grid, Button, Typography, Card, CardContent, Avatar,
  TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup,
  FormControlLabel, Radio, Fade
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Checkbox, FormGroup } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {  IconButton,  Tooltip } from '@mui/material';
import Adminheader from './adminheader';
import Adminsidebar from './adminsidebar';
import '../Admin/admincss/adddoctor.css';
import addmedicalboardicon from '../Admin/images/image 43.png'
import addhospitalpartnersicon from '../Admin/images/image 431.png'
import selectimageicon from '../Admin/images/Young man face avater vector illustration design _ Premium Vector 1.png'

const initialForm = {
  profile_pic:[],
  country: '',
  firstName: '',
  lastName: '',
  address: '',
  address2: '',
  state: '',
  city: '',
  postalCode: '',
  dateOfBirth: '',
  phone_no: '',
  gender: '',
  email: '',
  website: '',
  password: '',
  confirmPassword: '',
  subscription: [],
  bio: ''
};

export default function AdminAddDoctorHospital() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

    const inputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setForm({...form,profile_pic:imgUrl});
    }
  };

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (name === "Digital CME" || name === "Innovative Cases") {
    setForm((prev) => {
      const updated = checked
        ? [...prev.subscription, name]
        : prev.subscription.filter((item) => item !== name);
      return { ...prev, subscription: updated };
    });
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For now just prevent default
  };

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
                onClick={() => setOpen(true)}
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
                <img className='cardicons' src={addmedicalboardicon} style={{borderRadius:"50%",border:"3px solid #DD4343"}}></img>
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
                // onClick={() => setOpen(true)}
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
                 <img className='cardicons' src={addhospitalpartnersicon} style={{borderRadius:"50%",border:"3px solid #DD4343"}}></img>
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
    width:400,
    maxWidth: 530,
    p: { xs: 2, sm: 3, md: 5 },
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 2, // spacing between inputs
  }}
>

     <Box sx={{ position: 'relative', display: 'inline-block', width: 100, height: 100,marginLeft:"40%" }}>
      <Avatar
        src={form.profile_pic}
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
            right: 0,
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

  <FormControl fullWidth size="small">
    <InputLabel>Select your country</InputLabel>
    <Select 
      name="country"
      label="Select your country"
      value={form.country}
      onChange={handleChange}
    >
      <MenuItem value="India">India</MenuItem>
      <MenuItem value="Usa">USA</MenuItem>
      <MenuItem value="United Kingdom">UK</MenuItem>
    </Select>
  </FormControl>

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
    name="address"
    label="Address"
    value={form.address}
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
    name="postalCode"
    label="Postal Code"
    value={form.postalCode}
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
    name="phone_no"
    label="Phone Number"
    value={form.phone_no}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="email"
    label="Email Address"
    value={form.email}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    name="website"
    label="Website"
    value={form.website}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    type="password"
    name="password"
    label="Password"
    value={form.password}
    onChange={handleChange}
    fullWidth
    size="small"
  />

  <TextField
    type="password"
    name="confirmPassword"
    label="Confirm Password"
    value={form.confirmPassword}
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
          name="Digital CME"
        />
      }
      label="Digital CME"
    />
    <FormControlLabel
      control={
        <Checkbox size="small"
          checked={form.subscription.includes('Innovative Cases')}
          onChange={handleChange}
          name="Innovative Cases"
        />
      }
      label="Innovative Cases"
    />
  </FormGroup>
</FormControl>


  <TextField
    name="bio"
    label="Bio"
    value={form.bio}
    onChange={handleChange}
    fullWidth
    multiline
    rows={2}
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
                          width: 550,
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
                            src={form.profile_pic}
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
      </div>
    </>
  );
}
