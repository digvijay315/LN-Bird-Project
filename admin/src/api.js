import axios from "axios";
const instance=axios.create({
    baseURL:'http://13.201.127.232:5000/',
})
export default instance;