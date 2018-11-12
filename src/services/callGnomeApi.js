import axios from 'axios';

const callGnomeAPI = () =>{
    return axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
}

export default callGnomeAPI;