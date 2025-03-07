import React, { useState } from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import { useEffect } from 'react'
import $ from 'jquery'
import axios from 'axios'
import { base_url } from '../Utils/base_url'

function CandidateList() {

    const [candidate, setCandidate] = useState([]);

    const getCandidate = async () => {
        try {
          const response = await axios.get(`${base_url}/get_all_candidates`);  
          console.log(response);
          setCandidate(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCandidate();
    }, []);

    useEffect(() => {
        if (candidate.length > 0) {
          // Initialize DataTable
          const table = $('#candidateTable').DataTable({
            dom: '<"dt-buttons"Bf><"clear">lirtp',
            paging: true,
            autoWidth: true,
            buttons: [
              'colvis',
              'copyHtml5',
              'csvHtml5',
              'excelHtml5',
              'pdfHtml5',
              'print',
            ],
            initComplete: function () {
              const footer = $('#candidateTable tfoot tr');
              $('#candidateTable thead').append(footer);
            },
          });
    
          // Apply search functionality
          $('#candidateTable thead').on('keyup', 'input', function () {
            table.column($(this).parent().index()).search(this.value).draw();
          });
    
          // Cleanup on component unmount
          return () => {
            table.destroy(true);
          };
        }
      }, [candidate]);

  return (
    <div>

        <style>
            {
                `
                body {
                    background-color: rgba(46, 7, 63, 0.1);
                    font-family: 'Inter', sans-serif;
                    color: #333;
                    padding: 20px;
                }
                .candidate-list-container {
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 10px;
                }
                .candidate-list-header{
                    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                    padding-bottom: 10px;
                    color: #2E073F;
                    margin-bottom: 30px;
                }
                    .dt-paging-button{
      padding: 8px 1rem;
      border: none;
      margin: 0 5px;
      background-color: #ffffff;
      // border: #7A1CAC solid 1px;
      font-weight: 500;
      border-radius: 5px;
      transition: all 0.3s ease;
      box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
      }
      .dt-paging-button:hover{
      background-color: #7A1CAC;
      color: #ffffff;
      }
      .nominee-data{
      background-color: #ffffff;
      padding: 2rem 1.5rem;
      border-radius: 10px;
      margin-top: 1.5rem;
      margin-bottom: 10px;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
      }
      #dt-length-0{
      width: 7%;
      }

      .dt-paging-button{
      background-color: #ffffff;
      box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
      color: #000;
      margin: 0 5px;
      width: 2.5rem;
      transition: 0.3s all ease;
      }
      .dt-paging-button:hover{
      background-color: #7A1CAC;
      color: #ffffff;
      }
      .dt-search{
      float: right;
      margin-bottom: 14px;
      }
      .dt-search #dt-search-0{
      height: 2.5rem;
      border-radius: 5px;
      border: none;
      border: 2px solid #7A1CAC;
      padding-left: 10px;
      }
      .dt-search #dt-search-0:focus{
      outline: none;
      }
                `
            }
        </style>
        
        <div>
            <HRSidebar/>
            <section className="main-content-section">
                <HRHeader/>

                <div className='candidate-list-container'>
                    <div className='candidate-list'>
                        <div className='candidate-list-header'>
                            <h5>All Candidate List</h5>
                        </div>

                        <div className='candidate-list-items'>
                            <table id="candidateTable" className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Candidate Name</th>
                                        <th>Candidate Code</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Job title</th>
                                        <th>Function</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        candidate.map((data, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{data.candidateName}</td>
                                                <td>{data.tempLoginCode}</td>
                                                <td>{data.username}</td>
                                                <td>{data.email}</td>
                                                <td>{data.jobTitle}</td>
                                                <td>{data.jobFunction}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default CandidateList