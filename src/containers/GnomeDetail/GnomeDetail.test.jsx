import React from 'react';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as mocks from '../../mock/axa-data';
import {UnConnectedGnomeDetail} from './GnomeDetail';
import storeUtil from '../../utils/test/storeUtil';
jest.mock('../../services/callGnomeApi');
import callGnomeAPI from '../../services/callGnomeApi';

Enzyme.configure({ adapter: new Adapter() });

callGnomeAPI.mockImplementation( () => Promise.resolve({data: mocks.axaData()}));


describe('<GnomeDetail> component', ()=>{
    let spy = null;
    let GnomeDetail = null;

    beforeEach(() => {
        const getGnomesMocked = jest.fn();
        const updateGnomeIdMocked = jest.fn();
        const props = {
            gnomeList: mocks.axaData().Brastlewark,
            getGnomes: getGnomesMocked,
            updateGnomeId: updateGnomeIdMocked,
            match:{
                params: {
                    id: 1
                }
            }

        };
        GnomeDetail = <UnConnectedGnomeDetail store={storeUtil} {...props}/>;
    })

    afterEach(() => {
        spy.mockClear()
    })

    it('checks if it mounts', ()=>{
        spy = jest.spyOn(UnConnectedGnomeDetail.prototype, 'componentDidMount');
        mount(GnomeDetail);
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('h3 from id 1 should return Name: Fizkin Voidbuster', ()=>{
        const wrapper = shallow(GnomeDetail);
        expect(wrapper.find('h3').text()).toEqual('Name: Fizkin Voidbuster')
    })
})