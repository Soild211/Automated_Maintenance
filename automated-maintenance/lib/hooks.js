import { useDispatch , useSelector , useStore } from "react-redux";


//use AppuseDispatch etc instead of default
export const useAppDispatch = useDispatch.withTypes()
export const useAppSelector = useSelector.withTypes()
export const useAppStore = useStore.withTypes()
