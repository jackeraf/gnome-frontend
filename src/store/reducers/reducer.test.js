import reducer from './reducer';
import * as actions from '../actions/actions';
import * as mocks from '../../mock/axa-data';
jest.mock('../../services/callGnomeApi');
import callGnomeAPI from '../../services/callGnomeApi';

callGnomeAPI.mockImplementation( () => Promise.resolve({data: mocks.axaData()}));

const gnomeAPIResponse = response => response.data["Brastlewark"].slice(0,14);

const initialState = {
    gnomeList: [],
    gnomeId: null,
    gnomeSearched: []
};

describe('Gnome reducer', () => {
    let newState = null;

    it('should return gnomeList', ()=>{
        let actionObject = null;
        return callGnomeAPI().then(response=>{
            newState = {
                gnomeList: gnomeAPIResponse(response),
                gnomeId: null,
                gnomeSearched: []
            };
            actionObject = actions.updateGnomes(response)
            expect(reducer(initialState,actionObject)).toEqual(newState)
            expect.assertions(1)
        })
        
    })

    it('should return gnome id', ()=>{
        const gnomeId = 0;
        newState = {
            gnomeList: [],
            gnomeId,
            gnomeSearched: []
        };

        expect(reducer(initialState, actions.updateGnomeId(gnomeId))).toEqual(newState);
        expect.assertions(1)
    })

    it('should return gnome gnomeSearched', ()=>{
        const gnomeName = "Tobus";
        let stateWithGnomeList = null;
        return callGnomeAPI().then(response=>{
            stateWithGnomeList = {
                gnomeList: gnomeAPIResponse(response),
                gnomeId: null,
                gnomeSearched: []
            };
            newState = {
                gnomeList: gnomeAPIResponse(response),
                gnomeId: null,
                gnomeSearched: mocks.gnomeSearched()
            };
            expect(reducer(stateWithGnomeList,actions.updateSearchedGnome(gnomeName))).toEqual(newState);
            expect.assertions(1)
        })
    })

    it('should clean searches', ()=>{
        const stateWithSearches = {
            gnomeList: [],
            gnomeId: null,
            gnomeSearched: mocks.gnomeSearched()
        };
        newState = {
            gnomeList: [],
            gnomeId: null,
            gnomeSearched: []
        };
        
        expect(reducer(stateWithSearches, actions.cleanSearch())).toEqual(newState)
        expect.assertions(1)
    })

    it('handles error', ()=>{
        const newStateError = {
            gnomeList: [],
            gnomeId: null,
            gnomeSearched: [],
            fetchError: {gnomeApiError: true}
        }
        expect(reducer(initialState, actions.fetchError())).toEqual(newStateError);
    })

});