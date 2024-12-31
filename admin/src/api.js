import axios from "axios";
const instance=axios.create({
   
         baseURL:'https://ln-bird-project-7.onrender.com/'
        // baseURL:'http://localhost:5000/'
})
export default instance;