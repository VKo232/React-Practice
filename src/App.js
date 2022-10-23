import { useState, useEffect,  } from "react";
import StudentCard from "./components/StudentCard";
import SearchFilter from "./components/SearchFilter";

import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [studentFilter,setFilter] = useState("");
  const [tagFilter,setTagFilter] = useState("");
  const filterStudent = (x) => {
    return x.fullName.toLowerCase().includes(studentFilter);
  };
  const filterTag = (x) => {
    return tagFilter == "" || x.tags != null && x.tags.join(" ").includes(tagFilter);
  }
  const updateFiltered = (filter) => {
    setFilter(filter);
  };
  const updateTagFiltered = (filter) => {
    setTagFilter(filter);
  };

  const addTag = (tag, studentID) => {
    let tmp = students;
    if(tmp[studentID-1].tags != null) {
      tmp[studentID-1].tags.push(tag);
    } else {
      tmp[studentID-1].tags = [tag];
    }
    setStudents(tmp);
  }

  useEffect(()=> {
    fetch("https://api.hatchways.io/assessment/students")
   .then((response) => response.json())
   .then((dat) => {
    let a = dat.students.map(x => {
      x.fullName = x.firstName + " " + x.lastName;
      return x;
    });
    setStudents(a);
   });
  },[]);



  return (
    <div className="App">

        <div className="Student_List">
          <SearchFilter updateFilter={updateFiltered} updateTagFilter={updateTagFiltered}></SearchFilter>
          {students && students.filter(filterStudent).filter(filterTag).map(student =><StudentCard className="Student_Card" student={student} key={student.id} addTag={addTag} />)}
        </div>
        
      
    </div>
  );
}

export default App;
