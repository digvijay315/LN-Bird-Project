import axios from "axios";
const instance=axios.create({
    baseURL:'http://13.232.174.153:5000/',
})
export default instance;