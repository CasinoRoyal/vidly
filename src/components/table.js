import React from 'react';

import TableHeader from './table-header';
import TableBody from './table-body';

const Table = ({ columns, sortColumn, onSort, data }) => {

  return(
    <table className='table'>
      <TableHeader onSort={onSort} 
                   columns={columns}
                   sortColumn={sortColumn} />

      <TableBody items={data}
                 columns={columns} />
    </table>
  )
}

export default Table;