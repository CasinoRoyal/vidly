import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

export default class TableHeader extends Component {

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  }

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <FontAwesomeIcon icon={faSortUp} />

    return <FontAwesomeIcon icon={faSortDown} />
  }

  render() {
    const { columns } = this.props;
    
    return(
      <thead className='thead-dark'>
        <tr>
          {
            columns.map((column) => {
              return <th key={column.label || column.key} 
                  onClick={() => this.raiseSort(column.path)}>
                {column.label} {this.renderSortIcon(column)}
              </th>
            }) 
          }
        </tr>
      </thead>
    )
  }
}