import React, { Component } from 'react';
import _ from 'lodash';

export default class TableBody extends Component {

  renderCell = (item, column) => {
    if (column.render) return column.render(item)

    return _.get(item, column.path)
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