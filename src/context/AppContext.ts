// import React, { createContext, useState, useContext } from 'react';

// const AppContext = createContext();

// export const useAppContext = () => useContext(AppContext);

// export const DocumentProvider = ({ children }) => {
//   const [documents, setDocuments] = useState([]);

//   return (
//     <AppContext.Provider value={{ documents, setDocuments }}>
//       {children}
//     </AppContext.Provider>
//   );
// };