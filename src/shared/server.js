import axios from 'axios';

const Server = axios.create({
  baseURL: 'https://artful-iudex.herokuapp.com'
})

export default Server;