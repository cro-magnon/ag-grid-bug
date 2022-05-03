import React from 'react';
import { render } from 'react-dom';
import GridComponent from "./components/grid.component"; // Optional theme CSS
import { LicenseManager } from  'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const App = () => {

  const key = "";
  LicenseManager.setLicenseKey(key);

  const dummyData = [
    {
      row_id: 123,
      col1: 'foo',
      col2: 'bar',
      col3: 'baz'
    },
    {
      row_id: 456,
      col1: 'abc',
      col2: 'def',
      col3: 'ghi'
    },
    {
      row_id: 789,
      col1: 'Dwayne',
      col2: '"The Rock"',
      col3: 'Johnson'
    }
  ];

  return <GridComponent rowData={dummyData}/>
};

render(<App />, document.getElementById('root'));

export default App