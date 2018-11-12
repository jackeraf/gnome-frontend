import {
    UPDATE_GNOMES_DATA,
    UPDATE_GNOME_ID,
    UPDATE_GNOME_NAME,
    CLEAN_SEARCH,
    FETCH_GNOMES_FAILED
} from '../actions/types';

import * as utils from '../../utils/udpaterState';

const initialState = {
    gnomeList: [],
    gnomeId: null,
    gnomeSearched: [],
    fetchError: {}
}

const reducer= (prevState = initialState, action)=>{
    let newState = null;
    switch(action.type){
        case UPDATE_GNOMES_DATA:
            newState = {gnomeList: [...prevState.gnomeList, ...action.payload]}
            return utils.updaterState(prevState, newState);
            
        case UPDATE_GNOME_ID:
            newState = {gnomeId: action.payload}
            return utils.updaterState(prevState, newState);
        case UPDATE_GNOME_NAME:
            const regex = new RegExp(`${action.payload}`, 'ig');
            newState = {gnomeSearched: prevState.gnomeList.filter(gnome=>gnome.name.match(regex))}
            return utils.updaterState(prevState, newState);
        case CLEAN_SEARCH:
            newState = {gnomeSearched: []}
            return utils.updaterState(prevState, newState);
        case FETCH_GNOMES_FAILED:
            newState = {fetchError: {...prevState.fetchError, gnomeApiError: true}}
            return utils.updaterState(prevState, newState);
        default:
            return prevState;
    }
}


export default reducer;