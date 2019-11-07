import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.football-data.org/v2',
    headers: { 'X-Auth-Token': process.env.REACT_APP_API_TOKEN}
});