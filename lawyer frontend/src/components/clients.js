import React, { useState, useEffect } from 'react';
import api from '../api';
import Adminsidebar from './adminsidebar';
import Adminpanelheader from './adminpanelheader';
import { Visibility, CheckCircle, Cancel } from '@mui/icons-material';
import { Box, Button, IconButton, Typography, Chip, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function Clients() {

      const [lawyers, setLawyers] = useState([]);

      const fetchlawyers=async()=>
        {
            try {
            const resp=await api.get('api/lawyer/getalllawyerprofile')
            setLawyers(resp.data.filter((item)=>(item.status==="verified")))
            } catch (error) {
            console.log(error);
            
            }
        }
        useEffect(() => {
            fetchlawyers();
        }, []);

          const[users,setusers]=useState([])
  const fetchusers=async()=>
  {
    try {
      const resp=await api.get('api/user')
      console.log(resp);
      
      setusers(resp.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    fetchusers();
  }, []);


          const columns = [

            {
              field: 'fullName',
              headerName: 'Name',
              flex: 1,
              valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
            },
            {
              field: 'email',
              headerName: 'Email',
              flex: 1,
            },
            {
              field: 'phone',
              headerName: 'Phone',
              width: 130,

            },

            {
              field: 'barEnrolment',
              headerName: 'Bar Enrolment',
              width: 130,
            },

            {
              field: 'yearsOfExperience',
              headerName: 'Experience',
              width: 130,
            },

            {
              field: 'createdAt',
              headerName: 'Reg. Date',
              width: 130,
              valueGetter: (params) => new Date(params.row.createdAt).toLocaleString(),
            },
          
            
          ];

            const usercolumns = [

            {
              field: 'fullName',
              headerName: 'Name',
              flex: 1,
            },
            {
              field: 'email',
              headerName: 'Email',
              flex: 1,
            },
            {
              field: 'username',
              headerName: 'User Name',
              width: 130,

            },

            {
              field: 'createdAt',
              headerName: 'Reg. Date',
              width: 130,
              valueGetter: (params) => new Date(params.row.createdAt).toLocaleString(),
            },
          
            
          ];

  //   const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 2, // default value
  // });

  return (
    <div>
        <Adminsidebar/>
        <Adminpanelheader/>
        <main style={{marginLeft:"15%",marginTop:"1%"}}>
             <div style={{padding:"50px"}}>
            <Box sx={{ height: 500, width: '100%', p: 2 }}>
              <Typography variant="h5" gutterBottom>
                🕵️‍♂️ All Verified Lawyers
              </Typography>
               <DataGrid
                rows={lawyers}
                columns={columns}
                getRowId={(row) => row._id}
                // pagination
                // paginationModel={paginationModel}
                // onPaginationModelChange={setPaginationModel}
                // pageSizeOptions={[2]} // ✅ only 2 allowed
                disableRowSelectionOnClick
                sx={{
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f0f0f0',
                    fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                    py: 1,
                },
                }}
            />
            </Box>

            </div>

               <div style={{padding:"50px"}}>
            <Box sx={{ height: 500, width: '100%', p: 2 }}>
              <Typography variant="h5" gutterBottom>
                🕵️‍♂️ All Verified Users
              </Typography>
               <DataGrid
                rows={users}
                columns={usercolumns}
                getRowId={(row) => row._id}
                // pagination
                // paginationModel={paginationModel}
                // onPaginationModelChange={setPaginationModel}
                // pageSizeOptions={[2]} // ✅ only 2 allowed
                disableRowSelectionOnClick
                sx={{
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f0f0f0',
                    fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                    py: 1,
                },
                }}
            />
            </Box>
{/* 
             <Box sx={{ height: 500, width: '100%', p: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    🕵️‍♂️ All Users
                  </Typography>
                  <DataGrid
                    rows={lawyers}
                    columns={columns}
                    getRowId={(row) => row._id} // Or replace with `_id` if MongoDB
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    sx={{
                      '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f0f0',
                        fontWeight: 'bold',
                      },
                      '& .MuiDataGrid-cell': {
                        py: 1,
                      },
                    }}
                  />
                </Box> */}

            </div>
        </main>
      
    </div>
  )
}

export default Clients
