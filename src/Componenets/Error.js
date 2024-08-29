import React from 'react'

function Error({error}) {

    let errorMessage = "Unknown error occurred.";
  let errorImage = "/path/to/default/error/image.png";

  // Check error type and set appropriate message and image
  if (error instanceof TypeError) {
    errorMessage = "Network error occurred. Please try again later.";
    errorImage = "/path/to/network/error/image.png";
  } else if (error instanceof SyntaxError) {
    errorMessage = "Syntax error in data received from server.";
    // errorImage = "/path/to/syntax/error/image.png";
  } else {
    errorMessage = "An error occurred while fetching data.";
  }

  return (
    <div className='flex flex-col text-center items-center justify-center mt-16 pt-16'>
      <h2 className='text-red-700 text-4xl font-bold font-mono  pb-4'>Error!</h2>
      <p className='text-red-400 text-2xl font-semibold font-serif'>{errorMessage}</p>
      {/* <img src={errorImage} alt="Error" /> */}
    </div>
  );
};

export default Error;


 


