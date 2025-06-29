import React from 'react';

const LocationSearchPanel=({suggestions, setPickup,setDestination, setTransport,setPannelOpen,activeField }) =>{
const handleSuggestionClick = (suggestion) => {
if(activeField === 'pickup') {
setPickup(suggestion);}
else if(activeField === 'destination') {
setDestination(suggestion);}
}


  return (
    <div>

      {suggestions.map((elem,idx) => (
        <div
          key={idx}
          onClick={() => {
            handleSuggestionClick(elem);

           
          }}
          className='flex border-2 rounded-xl justify-items-start mt-4 max-w-2xl'
        >
          <h4 className='text-xl ml-1 mr-1  text-center'>
            <i className="ri-map-pin-line"></i>
          </h4>
          <h4 className='text-md font-semibold'>{elem}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
