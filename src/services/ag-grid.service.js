import * as _ from 'lodash';

const processCellForClipboard = (params) => JSON.stringify(params.value);
const processDataFromClipboard = (params) => _.map(params.data, (row) => _.map(row, (column) => {
  try {
    const data = JSON.parse(column);
    if (data.start_date) {
      data.start_date = new Date(data.start_date);
    }

    if (data.end_date) {
      data.end_date = new Date(data.end_date);
    }

    return data;
  } catch(e) {
    return column;
  }
}));

const getContextMenuItems = (params) => {
  const menu = [];

  menu.push({
    name: 'Copy',
    shortcut: 'Ctrl+C',
    action: () => params.api.copySelectedRangeToClipboard()
  });

  return menu;
};

const sideBar = {
  toolPanels: [{
    id: 'columns',
    labelDefault: 'Columns',
    labelKey: 'columns',
    iconKey: 'columns',
    toolPanel: 'agColumnsToolPanel',
    toolPanelParams: {
      suppressPivots: true,
      suppressPivotMode: true,
      suppressRowGroups: true,
      suppressValues: true
    }
  }]
};

const fillOperation = (params) => {
  if (params.direction === 'left' || params.direction === 'right') {
    params.event.preventDefault();
  } else {
    return false;
  }
};

function getStaticGridOptions() {
  return {
    processCellForClipboard,
    processDataFromClipboard,
    tooltipShowDelay: 800,
    enableRangeSelection: true,
    rowDragManaged: true,
    animateRows: true,
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20,
    suppressMenuHide: true,
    immutableData: true,
    getRowNodeId: (data) => data.row_id,
    getContextMenuItems,
    allowContextMenuWithControlKey: true,
    popupParent: document.querySelector('body'),
    sideBar,
    statusBar: {
      statusPanels: [
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'left'
        },
        {
          statusPanel: 'agAggregationComponent',
          statusPanelParams: {
            aggFuncs: ['count', 'sum', 'min', 'max', 'avg']
          }
        }
      ]
    },
    defaultColDef: {
      width: 130,
      editable: true,
      resizable: true,
      sortable: false,
      sortingOrder: ['asc', 'desc']
    },
    fillOperation
  };
}

function getAllGridData({ api }) {
  const data = [];
  api.forEachNode((node) => data.push(node.data));
  return data;
}

function getAllGridNodes(params) {
  const nodes = [];
  params.api.forEachNode((node) => nodes.push(node));
  return nodes;
}

function setRowData(params, rowData) {
  params.api.setRowData([...rowData]);
}

export default {
  getStaticGridOptions,
  processDataFromClipboard,
  getAllGridData,
  setRowData,
  getAllGridNodes
};
