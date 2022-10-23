import React from "react";
import './SearchFilter.css';


export default function SearchFilter({updateFilter,updateTagFilter}) {
    
    const handleChange = (event) => {
        updateFilter(event.target.value.toLowerCase());
    }
    const handleTagChange = (event) => {
        updateTagFilter(event.target.value.toLowerCase());
    }

    return  (
        <div>
        <input className="searchbar" type="text" placeholder="Search by name" onChange={handleChange}/>
        <input className="searchbar" type="text" placeholder="Filter by Tag" onChange={handleTagChange}/>
        </div>
      )
}
