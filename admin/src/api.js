import axios from "axios";
const instance=axios.create({
   
        //  baseURL:'https://ln-bird-project-7.onrender.com/'
          baseURL:'https://api.bharatproperties.co/'
        // baseURL:' https://onlinerealestatecrm.in/'
        // baseURL:'http://localhost:5000/'

       
})
export default instance;