import axios from 'axios';
const API_URL = 'http://localhost:8000/api/v1';


export default class RoomsService{

    constructor(){}


    getRooms() {
        const url = `${API_URL}/rooms/`;
        return axios.get(url).then(response => response.data);
    }
    getRoomsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getRoom(pk) {
        const url = `${API_URL}/rooms/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteRoom(room){
        const url = `${API_URL}/rooms/${room.pk}`;
        return axios.delete(url);
    }
    createRoom(room){
        const url = `${API_URL}/rooms/`;
        return axios.post(url,room);
    }
    updateRoom(room){
        const url = `${API_URL}/rooms/${room.pk}`;
        return axios.put(url,room);
    }
}