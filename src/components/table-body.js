import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class TableBody extends Component {

  renderCell = (item, column) => {
    if (column.render) return column.render(item);

    if (column.path === 'title') {
      return( 
        <Link to={`/movies/${item._id}`}>
          {_.get(item, column.path)}
        </Link>
      )
    };

    return _.get(item, column.path);
  }

  render() {
    const { items, columns } = this.props;

    return (
      <tbody className="">
        {
          items.map((item) => {
            return (
              <tr key={item._id }>
                {
                 columns.map((column) => {
                  return (
                    <td key={column.label || column.key}>
                      {this.renderCell(item, column)}
                    </td>
                  ) 
                 }) 
                }
              </tr>
            )
          }) 
        }
      </tbody>
    )
  }
}

export default TableBody;