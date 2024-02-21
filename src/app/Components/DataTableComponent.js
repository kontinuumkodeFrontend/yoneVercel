import React from "react";
import MUIDataTable from "mui-datatables";

const options = {
  filterType: 'multiselect',
  print: false,
  selectableRowsHeader: false,
  responsive: 'standard',
  download: false,
  viewColumns: false,
  selectableRows: false,
  columns: false,
  elevation: 0,
  textLabels: {
    body: {
      noMatch: 'No data found',
    }
  }
};

export const DataTableComponent = ({ name, listColumns, listData }) => {
  return (
    <MUIDataTable
      title={name}
      data={listData}
      columns={listColumns}
      options={options}
    />
  )
}
