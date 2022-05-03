import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import agGridService from '../services/ag-grid.service';
import Reactuse from '../hooks/react-use.hook';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function GridComponent(props) {

  const { useSetState, useMount } = Reactuse;

  const [state, setState] = useSetState({
    gridApi: null,
    gridOptions: null,
    rowData: props.rowData || []
  });

  const onGridReady = (params) => {
    setState({ gridApi: params.api });
    params.api.setRowData(state.rowData);
  };

  const getGridOptions = () => {
    const commonGridOptions = agGridService.getStaticGridOptions();
    debugger;
    return {
      ...commonGridOptions,
      rowSelection: 'multiple',
      suppressRowClickSelection: true
    };
  };

  useMount(() => {
    const columnDefs = [
      {
        field: 'col1',
        headerName: 'Column 1',
        editable: true
      },
      {
        field: 'col2',
        headerName: 'Column 2',
        editable: true
      },
      {
        field: 'col3',
        headerName: 'Column 3',
        editable: true
      }
    ];

    setState({
      gridOptions: {
        enableFillHandle: true,
        onSelectionChanged: (params) => props.onSelectionChanged &&
          props.onSelectionChanged(params.api.getSelectedRows()),
        columnDefs,
        ...getGridOptions()
      }
    });
  });

  return <div className="ag-theme-balham" style={{width: 500, height: 500}}>
    <AgGridReact {...state.gridOptions} onGridReady={onGridReady}/>
  </div>;
}

export default GridComponent
