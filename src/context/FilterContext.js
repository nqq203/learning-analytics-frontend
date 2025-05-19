import {createContext,useState,useContext} from "react";

const FilterContext = createContext();

export const FilterContextProvider = ({children})=>{
    const [showFilters,setShowFilters] = useState(false);

    return(
        <FilterContext.Provider value={{showFilters,setShowFilters}}>
            {children}
        </FilterContext.Provider>

    )
}

export const useFilter = () => useContext(FilterContext);