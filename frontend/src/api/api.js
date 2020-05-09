import axios from 'axios';
import Config from '../config.json';

export function login(request) {
  var link = Config.ipAddress + '/authenticate';
  return axios.post(link, request);
}

export function getUsers() {
  var link = Config.ipAddress + '/users';
  return axios.get(link);
}

export function getItemsByRestaurantId(request) {
  var link = Config.ipAddress + '/getItemsByRestaurantId';
  return axios.post(link, request);
}
