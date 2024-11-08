import axios from "axios";
const instance=axios.create({
    // baseURL:'http://13.201.127.232:5000/',
     baseURL:'https://ln-bird-project-7.onrender.com/'
     // baseURL:'http://localhost:5000/',
})
export default instance;