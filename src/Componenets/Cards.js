// Represents all cards.Here we will be using a single card to display all cards using map function becox the data of cards will already be present after it is fetched from an API.
import React, { useState } from 'react'
import Card from './Card';




// Recieveing 'courses' as prop
const Cards = ({courses,category}) => {
  // In courses which is a fetched Json object,we have 4 key pairs(Development,Lifestyle,Design and Buisness) but we want it's values only which are  array elements for each and each element in itself is an object.We want to convert these  array elements of each key pair into a single array which will contains 20 elements in total and each element will be an object.So we are defining a function for that.

  let allCourses=[];
  // We are using if statement becox to perform further operations,we must have recieved 'courses' and as the fetching operation is asynchronous,so we want to perform further operaions only when we have recieved courses properly.So we wll display 2 types of UI,one if 'courses' is available and another if 'courses' is not available.

  // Since we need to keep track of the courses which are liked,becox only courses which are not liked can be liked and we need to know if the course is already liked then event handler function for like button should not execute,it should execute only when we have not liked the course yet.So here we are creating a state variable which represents an array,which keeps track of liked courses..This variable and it's setter function will be passed as prop to the Card component where we handle the event handler for like button for each card.This state variable is defined here rather than in Card.js becox here we have data of all the cards,but since we don't need any implementation of this state varaible in this component ,we could easily define it in Card.js as well.....If we need to share it b/w components,we could use 'LIFT THE STATE UP' cocept of react
  const [likedCourses,setLikedCourses] = useState([])

    const getCourses=()=>{

      //  Since we have to render the cards based on category,so we will be displaying array of only those cards whose category is matched

      if(category=== 'All') {


              
      /* Object.values(courses) is a method which returns an array of values of 'courses' object and ignores the keys.This method will get us an array containing 4 elements(Development,Buisness,Style and Design),thus we get [ Development,Buisness,Design,Style ].Since the Development etc are itself an array so Now on each element we apply forEach method which executes a specific function(in this case another forEach method) in which 'course' represents each element(course in Development as ist element represents {
"id": "WD101",
"title": "Web Development Fundamentals",
"description": "This course covers the basic concepts and tools for building static and dynamic websites. Students will learn HTML, CSS, JavaScript, and jQuery to create engaging and interactive web pages.",
"image": {
"url": "https://codehelp-apis.vercel.app/get-top-courses/Development/Web%20Development%20Fundamentals.png",
"alt": "Web Development Fundamentals"
}) which is one single item.Then we push each element into a new array thus giving us an array with 17 items.
      */
      Object.values(courses).forEach((courseCategory) =>{
        courseCategory.forEach((courseData)=>{
          allCourses.push(courseData);
        })
      })
      return allCourses;
      
    }  
    // Ist if block ends

    else{
        //  we return the data from 'courses'(representing json object feteched from API) variable  which meets specific category.Here we return courses[category] directly without using any map method becox courses[category] is itself an array i:e dEVELOPMENT,BUISNESS etc are itself an array,so no need to convert them.
        return courses[category];
        // WE can also use courses.data[category]becox When you write courses[category], it evaluates to courses.data[category] because courses is an object with a single property data.
    }


      }

 
    return (
      <div className="flex flex-wrap justify-center gap-5 mb-4">
      {/* Using ternary operatorr */}
          {/* If courses is null/not defined,then we get NO data found else we map each course with a Card */}
      {!courses ? (
        <div className='text-2xl text-red-400 font-bold text-center mt-6 p-2'>
            <p>No data found !!</p>
        </div>
      ) : (
        getCourses().map( (course) => {
            {/* Here we will map every fetched data with a card.So using map method ,every element of array from getCourses function is mapped with a component Card and we are passing the data of that specific element as a prop. */}
            
            {/* Since we are mapping each card with a specific fetched data(course represents each element of allCourses array),the same data is to be passed as prop to Card component to render it.
            N-O-T-E:- Each iteration of map in React requires you to explicitly return JSX elements or components that you want to render.

            The return inside getCourses().map(...) is specifically for returning each <Card> component dynamically based on the course data.
            This is different from the top-level return, which returns the entire JSX structure of the component (including conditional rendering and mapping logic).Note that for ternaray operator using conditional statements,we do not need to return each compoenent individually but in map method we have to render each traversed element into Card component so w use a dedicated 'return' statement for Card component.Also passing 'likedCourses'  state variable and it's setter function as prop for like button'
 */}
           return <Card key={course.id} course={course} likedCourses={likedCourses} setLikedCourses={setLikedCourses}/>
          })
      )}
      </div>
      
    )

    // Without individual return keyword for Card component i:e using arrow function's explicit return by not using curly braces as{},the code would be:

    /*
              return (
            <div>
 
                 {!courses ? (
                             <div>
                                 <p>No data found</p>
                            </div>
                             ) : (
                                   getCourses().map((course) => (
                                       <Card key={course.id} course={course} />
                                  ))
                             )}

      

   
  </div>
  
)

    */
  }
  
export default Cards;







