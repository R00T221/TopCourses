// This component contains 5 filter buttons.We have 5 filter buttons but we will be using just one button to implement all buttons using map function.We will apply map function on 'filterData' array and place the different'title'  with each iteration in a single button.

// filterData is the prop passed to Filter component in App.js
import React from 'react'
// import { useState } from 'react'

//Passing filterData in {} so that it can be used directly,As we know anything other than a string is passed in {} 

const Filter = ({filterData,category,setCategory}) => {
 
  
  
  // Defining event handler function filterHandler
  function filterHandler(title){
   setCategory(title);
  }

  return (
    <div className='w-11/12 flex flex-wrap max-w-max space-x-4 gap-y-4 mx-auto py-4 justify-center'>
        {/* 'data' here represents each object in filterData array */}


       {/* When rendering each object of filterData,each object is identified by React uniquely using key prop to efficiently update and re-render the list when it changes i:e if anything in a specific object/item is changed,that change must be attached to that object/item only.
      Styling in button is done using curly braces and template literals becox we will updating some styles dynamically.
      
      Curly braces {} in JSX are used to inject JavaScript expressions into the markup. This allows you to dynamically compute values for attributes, content, and styles based on the current state or props of the component.

      In this case, the curly braces are used to conditionally apply CSS classes (bg-opacity-60 border-white or bg-opacity-40 border-transparent) based on the comparison between category and data.title.

      Also below we are invoking an event handler function for click event on button which updates the category in 'category' variable but since we don't know which category is clicked,so we pass 'title' of the object represented by 'data' as argument and as we pass the parameter,we need to make sure we are using arrow function which enables REACT and JS to invoke function on click event only and not on render
      
      Below in css properties we are using backticks to include real time styling,if the 'title' of current object(data) equals to category variable,then we include border in styling means it is active right now else we remove border
       */}
        {filterData.map( (data) => (
    
          <button className={`text-lg px-2 py-1 rounded-md font-medium 
            text-white bg-black hover:bg-opacity-50 border-2 transition-[opacity_border] duration-300 ${category === data.title ? "bg-opacity-60 border-white" : "border-transparent bg-opacity-40"}`} key={data.id} onClick={ () => filterHandler(data.title)} > {data.title} </button>
         

       )  )
       }

    </div>
  )
}

export default Filter
