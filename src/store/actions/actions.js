import {
    UPDATE_GNOME_ID,
    UPDATE_GNOME_NAME,
    UPDATE_GNOMES_DATA,
    CLEAN_SEARCH,
    FETCH_GNOMES_FAILED
} from './types';

import callGnomeAPI from '../../services/callGnomeApi';

export const updateGnomes = response => ({
    type: UPDATE_GNOMES_DATA,
    payload: response.data["Brastlewark"].slice(0,14)
});

export const getGnomes = ()=>{
    return dispatch =>{
        return callGnomeAPI()
        .then((response)=>{
            dispatch(updateGnomes(response))
        })
        .catch((error)=>{
            dispatch(fetchError(error));
        });
    }
    
}

export const updateGnomeId = id=>({
    type: UPDATE_GNOME_ID,
    payload: id
})

export const updateSearchedGnome = name=>({
    type: UPDATE_GNOME_NAME,
    payload: name
});

export const cleanSearch = () =>({type: CLEAN_SEARCH});

export const fetchError = () =>({type: FETCH_GNOMES_FAILED});
