import React from 'react'
import Item from './Item';
import axios from 'axios';
import {useState, useEffect} from 'react';

function ItemList(){
  // establish items in state
  const [items, setItems] = useState({
    result: null,
    loading: false,
    errors: false,
  });
  // fetch data from flask app, running on port 5000
  const url = 'http://localhost:5000/'

  // on every render, search for results, configure loading spinner and filter/sort results
  useEffect(() => {
    // initially set results to null
    setItems({
      result: null,
      loading: true,
      errors: false
    })
    axios.get(url).then(response => {
      // filter data if there is no name, then sort the data by id and name
      const result = response.data
      // filter response out of names that are set to null or an empty string
      .filter(item => item.name !== null && item.name !== "")
      //sort the items by id, and then retrieve the item name's numner, then convert to int and sort the current list by item name's number  
      .sort((a,b) => {
        return a.listId - b.listId || parseInt(a.name.split(' ')[1]) - parseInt(b.name.split(' ')[1]);
      });
      // set list of items in state
      setItems({
        result: result,
        loading: false,
        errors: false,
      })
    }).catch(() => {
      // if error, set result to null
      setItems({
        result: null,
        loading: false,
        errors: true,
      })
    });
  }, [url])

  //initialize display variable

  let display;

  // if there was an error, return error message
  if(items.errors) {
    display = 
    <div className="error" >
      <h1>
        Error, items not found, make sure local server is running on port 5000
      </h1>
    </div>
  }

  // if the item hasn't been fetched yet and there was no error, return loading content
  if(items.loading){
    display =
      <div className='loading'></div>
  }

  // if items have been fetch, display them
  if(items.result) {
    display = 
    <div className="container">
    {/* for each result, create an item component */}
    {items.result.map(i => 
      <Item key={i.name} name={i.name} listId={i.listId}/>
    )}
    </div>
  }

  //return content of loading or items
  return (
    <div>
      {display}
    </div>
  )
}

export default ItemList;
