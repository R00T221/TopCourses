// This component represents each card.
import React from 'react';
// importing React icons
import {FcLike,FcLikePlaceholder} from "react-icons/fc";
import { toast } from 'react-toastify';
// import { useState } from 'react';

const Card = ({course,likedCourses,setLikedCourses}) => {
 
 

  // Defining onClick event handler 'clickHandler' for button
  function clickHandler(){
    // logic
    // If 'likedCourses' variable which represents an array contains the id of current course,then we need to re-update the array by determining it's previous state and applying filter on it to remove the present id from it.The function you provide to setState (or useState) receives the previous state of the state variable as an argument automatically, regardless of the parameter name you choose.
  if(likedCourses.includes(course.id)) {
    // prevState represents previous state of variable likedCourses and is automatically passed as argument to setter function in useState
    // cid represents each course id of elements in array represented by likedCourses.
    // Here we apply filter to previous state of array and include only those elements in new array whose id does not match to the present course id.
    setLikedCourses( prevState => prevState.filter(cid => cid !==course.id )  );
    toast.warning('Like Removed');

  }
  else{
    // in else block,we have 2 conditions,ist if the array is empty then we have to insert the current id in one way but if it already contains some id's then we have to insert the new id in a different way,so using 2 cases here as well.We can also omit the 2nd if else block and directly use  setLikedCourses( prevState => [...prevState,course.id] ); in main else block

    // If the array is empty
         if(likedCourses.length===0){
          // update the array with current course id.Note that course id has to be passed as array i:e[course.id] and not (course.id)
           setLikedCourses([course.id]);

             }
      // If array already has a previous state(contains elements)
        else{
        // Using spread operator,we merge the new  course id with the previous state of array and update it
                  setLikedCourses( prevState => [...prevState,course.id] );
            }

        toast.success('Liked Successfully');
  }

  }



  return (
    <div className='w-[370px] bg-bgDark bg-opacity-80 rounded-md overflow-hidden'>
       {/* Image nd button div */}
         <div className='relative'>
           {/* Image */}
            
            <img src={course.image.url} />
          
      

          {/* Button Icon */}
         <div className='absolute right-2 bottom-[-13px] rounded-full w-[40px] h-[40px] bg-white flex place-content-center place-items-center'>
         {/* Applying event listener on onClick event on button */}
          <button onClick={clickHandler}>
             {/* Using React icon.Here we have two 2 types of icons for 2 different roles,if liked,icon will be FcLike and if not liked yet then FcLikePlaceholder icon 'fontSize' gives it large or small sizes */}
             {/* If id of current course is in likedCourses array then the button is already liked and the icon is FcLike and if the current id is not in likedCourses array then icon will be FcLikePlaceholder(yet to like) */}
             { likedCourses.includes(course.id) ? (<FcLike fontSize="2rem"/>) : (<FcLikePlaceholder fontSize="2rem"/>) }
          </button>
        </div>

        </div>
        {/* Image nd button div ends */}

      {/* Description and title */}
      <div className='p-4'>
             <p className='text-white font-semibold text-lg leading-6'>{course.title}</p>
             
             {/*Since not whole description is displayed,we need to display a substring of it only,so we use the ternary operator to determine when whole text is to be displayed and when substring is to be displayed.If the description length is > 100 then we create a substring of it upto 100 length and display it else we display whole description  */}
             <p className='text-white mt-2'>
              { course.description.length >100 ? (`${course.description.substr(0,100)}... `) :  (course.description) }
             </p>
      </div>

    </div>
  )
}

export default Card




