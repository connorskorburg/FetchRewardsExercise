import React from 'react';

// item accepts props from itemlist
function Item(props) {
  //return a card item with name and id
  return (
    <div key={props.name} className="card">
        <h3>{props.listId}</h3>
        <p>{props.name}</p>
    </div>
  )
}

export default Item
