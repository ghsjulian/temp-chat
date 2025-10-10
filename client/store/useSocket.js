import { create } from "zustand";
import axios from "../libs/axios";
import data from "../data/data"


const useSocket = create((set, get) => ({
   messages : data
}))

export default useSocket