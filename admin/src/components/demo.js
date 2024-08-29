import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Define your columns
const allColumns = [
  { id: 'sno', name: '#' },
  { id: 'personaldetails', name: 'Personal Details' },
  { id: 'mobile_type', name: 'Mobile Type' },
  { id: 'email_type', name: 'Email Type' },
  { id: 'title_company', name: 'Title (Company)' },
  { id: 'designation', name: 'Designation' },
  { id: 'company_name', name: 'Company Name' },
  { id: 'tags', name: 'Tags' },
  { id: 'father_husband_name', name: 'Father/Husband Name' },
  { id: 'h_no', name: 'House No' },
  { id: 'street_address', name: 'Street Address' },
  { id: 'location', name: 'Location' },
  { id: 'city', name: 'City' },
  { id: 'pincode', name: 'Pincode' },
  { id: 'state', name: 'State' },
  { id: 'country', name: 'Country' },
  { id: 'source', name: 'Source' },
  { id: 'category', name: 'Category' },
  { id: 'owner', name: 'Owner' },
  { id: 'team', name: 'Team' },
  { id: 'gender', name: 'Gender' },
  { id: 'visible_to', name: 'Visible To' },
  { id: 'marital_status', name: 'Marital Status' },
  { id: 'birth_date', name: 'Birth Date' },
  { id: 'anniversary_date', name: 'Anniversary Date' },
  { id: 'education', name: 'Education' },
  { id: 'degree', name: 'Degree' },
  { id: 'school_college', name: 'School/College' },
  { id: 'loan', name: 'Loan' },
  { id: 'bank', name: 'Bank' },
  { id: 'amount', name: 'Amount' },
  { id: 'social_media', name: 'Social Media' },
  { id: 'url', name: 'URL' },
  { id: 'income', name: 'Income' },
  { id: 'amount1', name: 'Amount 1' },
  { id: 'website', name: 'Website' },
  { id: 'industry', name: 'Industry' },
  { id: 'descriptions', name: 'Descriptions' },
];

const SortableTable = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'sno', direction: 'ascending' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/viewcontact');
        setData(resp.data.contact); // Adjust according to the actual API response structure
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          {allColumns.map(column => (
            <th key={column.id} onClick={() => requestSort(column.id)}>
              {column.name}
              {sortConfig.key === column.id ? (sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽') : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {allColumns.map(column => (
              <td key={column.id}>{item[column.id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
