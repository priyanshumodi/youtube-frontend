import { combineReducers } from "redux";
import userSlice from "../features/auth/userSlice";
import hookSlice from "../features/hooks/hookSlice";

const rootReducer = combineReducers({
    userReducer: userSlice,
    hookReducer: hookSlice
})

export default rootReducer