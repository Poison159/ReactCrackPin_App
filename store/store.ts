import { createContext, useContext } from "react";
import PinStore from "./PinStore";


interface Store{
    pinStore: PinStore
}

export const store : Store = {
    pinStore: new PinStore()
    
}

export const StoreContext = createContext(store);


export const useStore = () =>{
    return useContext(StoreContext);
}