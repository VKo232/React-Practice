import React, {useCallback, useState } from "react";
import './StudentCard.css';
export default function StudentCard({student,addTag}) {
    const avg = useCallback((grades) =>  ((grades.reduce((a, b) => a + parseInt(b), 0) ) / grades.length).toFixed(2),[])
    const [isExpanded, setExpanded] = useState(false);
    const [tags, setTags] = useState(student.tags == null ? [] : student.tags);
    const triggerToggle = (event) => {
      setExpanded(!isExpanded);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        let val = event.target.value;
        if(!tags.includes(val) && val != "") {
          setTags(tags => ([...tags, val]));
          addTag(val,student.id);
        }
        event.target.value = "";
      }
    }

    return  (
        <div id={student.id} className="Student_Card" >
          <img src={student.pic} alt={`${student.fullName}`}/>
          <div className="Student_Information">
            <h1>{student.firstName} {student.lastName}</h1>
            <p>Email: {student.email}</p>
            <p>Company: {student.company}</p>
            <p>Skill: {student.skill}</p>
            <p>Average: {avg(student.grades)}%</p>
            {tags != null && (tags.map((tag) => (<div className="tag" key={`${student.id}tag${tag}`}>{tag}</div>)))}
           
            {isExpanded && 
             <div className="testscores"> {student.grades.map((grade,i) => (<p key={`${student.id}testscore${i}`}>Test {i}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {grade}%</p>))} </div>}
            <input className="Add_tag" placeholder="Add Tag" onKeyDown={handleKeyDown} />
          </div>   

          <button onClick={triggerToggle} className={`toggle ${isExpanded ? 'expanded' : 'not-expanded'}`}></button>
        </div>
      )
}
  