import React, { createContext, useState } from 'react';

const UserDataContext = createContext(); // Ensure consistent export
export { UserDataContext };

function UserContext({ children }) {
  const [user, setUser] = useState({
    
    email: '',
    fullname: {
      firstname: '',
      lastname: '',
  },
  
})

  return (
    <div>
      <UserDataContext.Provider value={{user,setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
}

export default UserContext;
