import React from 'react';

const ListGroup = (props) => {
  const { items, 
          propertyID, 
          propertyValue,
          selectedItem,
          onItemSelect } = props;

  return(
    <ul className="list-group">
      {
        items.map((item) => {
          return (
            <li key={item[propertyValue]} 
                className={selectedItem === item 
                  ? "list-group-item active"
                  : "list-group-item"}
                onClick={() => onItemSelect(item)}>
              {item[propertyValue]}
            </li>
          )
        })
      }
    </ul>
  )
}

export default ListGroup;

ListGroup.defaultProps = {
  propertyValue: 'name',
  propertyID: '_id'
}