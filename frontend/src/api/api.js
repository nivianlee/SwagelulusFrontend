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

export function getAllOrganisations() {
  var link = Config.ipAddress + '/getAllOrganisations';
  return axios.get(link);
}

export function getAllRestaurants() {
  var link = Config.ipAddress + '/getAllRestaurants';
  return axios.get(link);
}

export function updateDonatedAmount(request) {
  var link = Config.ipAddress + '/updateDonatedAmount';
  return axios.post(link, request);
}

export function getItemById(request) {
  var link = Config.ipAddress + '/getItemById';
  return axios.post(link, request);
}
