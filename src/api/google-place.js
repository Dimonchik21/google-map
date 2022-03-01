import axios from 'axios'
const url = 'http://localhost:3333'
export const detailPlace = (place_id) => {
  return axios.get(`${url}/placeDetail/${place_id}`).then((res) => res.data)
}

export const getPhoto = (photo_reference) => {
  return axios.get(`${url}/photoReference/${photo_reference}`).then((res) => res.data)
}
