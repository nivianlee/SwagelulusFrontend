import axios from 'axios';
import Config from '../config.json';

export function login(request) {
  var link = Config.ipAddress + '/login';
  return axios.post(link, request);
}
