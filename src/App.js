import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// importing API and filterData array
import './data';
import { apiUrl,filterData } from "./data";
import Filter from "./Componenets/Filter";
import Navbar from "./Componenets/Navbar";
import Cards from  "./Componenets/Cards";
import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Componenets/Spinner";
import Error from "./Componenets/Error";

const App = () => {
  // Using useState to create a variable and a setter function for it which updates the UI with each Re Render.
  const[courses,setCourses] = useState(null);

  // Creating a state variable 'loading' which is meant to update and render the loading screen till the data from API is not fetched.The variabke is intialised with true boolean value.
  const [loading,setLoading] = useState(true);

  // Creating a state variable to check for error
  const [error, setError] = useState(null);


  // Creating a state variable which keeps track of category i:e which category is selected(ALL,BUISNESS,LIFESTYLE ETC).Since when the page loads we want ALL categpry to be selected,so will be intialised with ALL category which is the ist object of filterData array.Also we have to pass them as props to Filter.js so that the variable is updated when the button is clicked in Filter.js.The reason why we defined it here  and not in Filter.js is becox we need the updated value here to render the cards accrodingly.Once category is updated in Filter, React re-renders App.js (or any parent component that passed category and setCategory to Filter).The updated category state can now be used in App.js because it reflects the most recent value set by setCategory in Filter.
  const [category,setCategory] = useState(filterData[0].title)


  // Here we will be calling an API to fetch data for cards and that data will be passed to Cards component using props.Note that API call will be performed using useEffect hook which handles side effects(external tasks outside of Rendering).
  useEffect( () =>{
    // We can also define this function (fetchData) outside the useEffect hook and then invoke it within useEffect hook.
    const fetchData = async() => {
          // Until API data is fetched,we set the loading variable to TRUE.
          setLoading(true);
      try{
          const result = await fetch (apiUrl);
          const info = await result.json();
          // Save data into a variable 'courses'.
          // 'data' is the key name under which all data exists of json object recieved from API 
          setCourses(info.data);
        
      }

      catch(error){
               // setting error
               setError(error);
                // using toast to display errror
                toast.error('Something Went Wrong', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                
                  });
                
      }
      // Since we have got the API response,so setting the variable 'loading' to FALSE.
      setLoading(false);
    }

    // Invoking function
    fetchData();

    // In the dependency list,we are using an empty array becox we want API call to be executed on ist Render only.
  },[] );
  // useEffect Ends here. 
  return (
    // Top level div
    <div className="min-h-screen flex flex-col bg-bgDark2">

    {/* Navbar Componenet*/}
         <div> 
             <Navbar/> 
         </div>


  {/* div for filter,cards and error Component.They have a parent div becox their background color is same */}
  <div className="">

             {/* Filter Component*/}

    <div>
        <Filter filterData = {filterData} category = {category} setCategory = {setCategory} />
    </div>
{/* Checking for error,if state variable 'error' true(NOT NULL),then error component is invoked and the recieved error is passed onto it,else nothing happens.  */}
    <div>{error ? <Error error={error} /> : null}</div>
{/* Here either Sppinner component is rendered or the Cards component.It depends on the value of 'loading' variable wheteher to show loading screen or the Cards screen */}

    {/* Cards component.Here w will passing courses data and category variable as prop becox w have to render cards basede on the category selected in Filter component */}
   <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
         {loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)}
   </div>

  </div>

    {/* <ToastContainer/> */}

    </div>
    // Top level div ends
  );
};

export default App;
