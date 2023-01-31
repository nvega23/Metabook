import { createStore } from "redux";
import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { compose } from "redux";
import thunk from "redux-thunk";
import session from './session'
import users from "./user"
import posts from "./posts";
import likes from "./likes"
import comments from "./comments"
import friends from "./friends"

let enhancer;
export const rootReducer = combineReducers({
    session,
    users,
    posts,
    likes,
    comments,
    friends
})

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadState = {}) => {
    return createStore(rootReducer, preloadState, enhancer)
}

export default configureStore
