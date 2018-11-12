import React from 'react';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GnomeList, {UnConnectedGnomeList} from './GnomeList';
import Notification from '../../components/Notifications/Notification';
import * as mocks from '../../mock/axa-data';
import storeUtil from '../../utils/test/storeUtil';
jest.mock('../../services/callGnomeApi');
import callGnomeAPI from '../../services/callGnomeApi';

Enzyme.configure({ adapter: new Adapter() });

callGnomeAPI.mockImplementation( () => Promise.resolve({data: mocks.axaData()}));

describe('<GnomeList />', () => {
    
    let spy = null;
    const GnomeListComponent = <GnomeList store={storeUtil}/>;
    afterEach(() => {
        spy.mockClear()
    })

    it('check if component mounted', ()=>{
        spy = jest.spyOn(GnomeList.prototype, 'componentDidMount');
        const wrapper = mount(GnomeListComponent);
        expect(spy).toHaveBeenCalledTimes(1);
        expect.assertions(1)
    })

    it('checks empty value state from input ', ()=>{
        const wrapper = shallow(GnomeListComponent).shallow();
        expect(wrapper.state('value')).toEqual('');

    })

    it('changes state value input', ()=>{
        const wrapper = shallow(GnomeListComponent).shallow();
        wrapper.setState({ value: 'foo' });
        expect(wrapper.state('value')).toEqual('foo');
    })

    it('checks if the service has been called', ()=>{
        expect(callGnomeAPI).toHaveBeenCalledTimes(1);
        expect.assertions(1);
    })

    it('renders 14 <GnomeItem /> components', () => {
        const wrapper = mount(GnomeListComponent);
        expect(wrapper.find('tr')).toHaveLength(15);
    });

    it('simulates a search', ()=>{
        const name = 'tobus';
        const updateSearchedGnomeMocked = jest.fn();
        const props = {
            updateSearchedGnome: updateSearchedGnomeMocked,
            gnomeSearched: [],
            gnomeList: mocks.axaData().Brastlewark
        }
        const wrapper = shallow(<UnConnectedGnomeList {...props}/>);
        spy = jest.spyOn(wrapper.instance(), 'handleSearch');
        wrapper.setState({ value: name });
        const form = wrapper.find('form');
        form.simulate('submit', { preventDefault() {} });
        expect(spy).toHaveBeenCalledTimes(1);
        const updateSearchedGnomeMockedCount = updateSearchedGnomeMocked.mock.calls.length;
        expect(updateSearchedGnomeMockedCount).toBe(1);
        expect.assertions(2)
    })

    it('checks if this.props.cleanSearch is called from componentWillUnmount', ()=>{
        const cleanSearchMocked = jest.fn();
        const props = {
            getGnomes: ()=>{},
            gnomeList: [],
            gnomeSearched: mocks.gnomeSearched(),
            cleanSearch: cleanSearchMocked
        }
        const wrapper = shallow(<UnConnectedGnomeList {...props} />);
        expect(wrapper.instance().props.gnomeSearched).toEqual(mocks.gnomeSearched());
        wrapper.instance().componentWillUnmount();
        const cleanSearchMockedCount = cleanSearchMocked.mock.calls.length;
        expect(cleanSearchMockedCount).toBe(1);
    })

    it('displays notification toast on fetch error', ()=>{
        const props = {
            gnomeList: mocks.axaData().Brastlewark,
            gnomeSearched: [],
            error: true
        }
        const wrapper = shallow(<UnConnectedGnomeList {...props} />);
        expect(wrapper.find(Notification)).toHaveLength(1);

    })

});