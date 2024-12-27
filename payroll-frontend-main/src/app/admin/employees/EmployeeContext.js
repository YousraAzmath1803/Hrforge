import React, { createContext, useState, useContext } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employeeData, setEmployeeData] = useState({
    id: null,
    currentSalaryId: null,
    isExisting: false,
  });

  const updateEmployeeData = (newData) => {
    setEmployeeData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <EmployeeContext.Provider value={{ employeeData, updateEmployeeData }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
