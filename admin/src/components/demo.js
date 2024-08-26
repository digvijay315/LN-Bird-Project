import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TableComponent = () => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // User defined items per page
  const [data, setData] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(0, 10));
  const [showColumnList, setShowColumnList] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
  const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/viewcontact');
      setData(resp.data.contact);
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
      <button
        key={number}
        onClick={() => paginate(number)}
        style={{ width: '30px', borderRadius: '5px' }}
      >
        {number}
      </button>
    ));
  };

  const deletecontact = async (rowData) => {
    try {
      const id = rowData._id;
      await axios.delete(`http://localhost:5000/deletecontact/${id}`);
      alert('Deleted successfully');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelectedItems = async () => {
    try {
      const resp = selectedItems.map(async (itemId) => {
        await axios.delete(`http://localhost:5000/deletecontact/${itemId}`);
      });
      
      alert('Selected items deleted successfully');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddColumnClick = () => {
    setShowColumnList(!showColumnList);
  };

  const handleCheckboxChange = (column) => {
    if (visibleColumns.some((col) => col.id === column.id)) {
      setVisibleColumns(visibleColumns.filter((col) => col.id !== column.id));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Add all current page item IDs to selectedItems
      setSelectedItems(currentItems.map((item) => item._id));
    } else {
      // Deselect all
      setSelectedItems([]);
    }
  };

  const handleRowSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

  return (
    <div>
      <div>
        <label htmlFor="itemsPerPage">Items per page: </label>
        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <button onClick={deleteSelectedItems} disabled={selectedItems.length === 0}>
        Delete Selected
      </button>
      
      <table border="1">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            {visibleColumns.map((col) => (
              <th key={col.id}>{col.name}</th>
            ))}
            <th>Operations</th>
            <th>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <button onClick={handleAddColumnClick}>+</button>
                {showColumnList && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      zIndex: 1000,
                      padding: '10px',
                    }}
                  >
                    <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                      {allColumns.slice(2).map((col) => (
                        <li key={col.id} style={{ padding: '5px 0' }}>
                          <input
                            type="checkbox"
                            checked={visibleColumns.some(
                              (visibleCol) => visibleCol.id === col.id
                            )}
                            onChange={() => handleCheckboxChange(col)}
                          />{' '}
                          {col.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((rowData, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(rowData._id)}
                  onChange={() => handleRowSelect(rowData._id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>
                {rowData.title} {rowData.first_name} {rowData.last_name}
                <br />
                {rowData.mobile_no}
                <br />
                {rowData.email}
              </td>

              {visibleColumns
                .filter((col) => col.id !== 'personaldetails' && col.id !== 'sno')
                .map((col) => (
                  <td key={col.id}>{rowData[col.id]}</td>
                ))}

              <td>
                <div>
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ backgroundColor: 'transparent', color: 'black' }}
                  >
                    Actions
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" style={{ cursor: 'pointer' }}>
                        Edit
                      </a>
                    </li>
                    <li onClick={() => deletecontact(rowData)}>
                      <a className="dropdown-item" style={{ cursor: 'pointer' }}>
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>{renderPageNumbers()}</div>
    </div>
  );
};

export default TableComponent;
