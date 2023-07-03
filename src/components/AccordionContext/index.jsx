import { createContext, useContext } from "react";

const AccordionContext = createContext();

export const AccordionProvider = ({ children }) => {
  return (
    <AccordionContext.Provider value={{}}>{children}</AccordionContext.Provider>
  );
};

export const useAccordion = () => useContext(AccordionContext);
