import React, { useState } from 'react';

const TableComponent = () => {
  const [headers, setHeaders] = useState(['Name', 'Age', 'Email']);
  const [data, setData] = useState([
    { Name: 'John', Age: 30, Email: 'john@example.com' },
    { Name: 'Jane', Age: 25, Email: 'jane@example.com' },
    // Add more data as needed
  ]);

  const removeColumn = (column) => {
    // Prevent the "Name" column from being removed
    if (column === 'Name') {
      alert("You cannot remove the 'Name' column.");
      return;
    }

    // Remove column from headers
    setHeaders(headers.filter(header => header !== column));
    // Remove column from data
    setData(data.map(row => {
      const { [column]: _, ...rest } = row;
      return rest;
    }));
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>
                {header}
                {header !== 'Name' && (
                  <button onClick={() => removeColumn(header)}>-</button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
