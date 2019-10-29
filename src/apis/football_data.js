import axios from 'axios';

const TOKEN = 'e4cd45db119a4b719935f56cf22927c4';

export default axios.create({
    baseURL: 'http://api.football-data.org/v2',
    headers: {'X-Auth-Token': TOKEN}
});