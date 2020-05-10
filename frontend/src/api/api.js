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

export function placeOrder(request) {
  var link = Config.ipAddress + '/placeOrder';
  return axios.post(link, request);
}

export function getOrdersByRestaurantId(request) {
  var link = Config.ipAddress + '/getOrdersByRestaurantId';
  return axios.post(link, request);
}

export function getOrderItemsByOrderId(request) {
  var link = Config.ipAddress + '/getOrderItemsByOrderId';
  return axios.post(link, request);
}

export function getOrganisationById(request) {
  var link = Config.ipAddress + '/getOrganisationById';
  return axios.post(link, request);
}

export function getOrgOrdersPerMonth(request) {
  var link = Config.ipAddress + '/getOrgOrdersPerMonth';
  return axios.get(link, request);
}

export function getResOrdersPerMonth(request) {
  var link = Config.ipAddress + '/getResOrdersPerMonth';
  return axios.get(link, request);
}

export function getNearbyRestaurants(request) {
  var link = Config.ipAddress + '/getNearbyRestaurants';
  return axios.get(link, request);
}
