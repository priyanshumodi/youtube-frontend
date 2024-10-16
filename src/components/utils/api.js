import axios from "axios";

  export const fetchDataFromApi = async(url, options) => {
    try {
      const {data} = await axios.get(`https://youtube-backend-rw43.onrender.com/api/v1/${url}`, options);
      console.log(data)
      return data.data;
    } catch (error) {
       console.log("code fat gya"+error)
    }
  }