import axios from "axios";

  export const fetchDataFromApi = async(url, options) => {
    try {
      const {data} = await axios.get(`/api/v1/${url}`, options);
      console.log(data)
      return data.data;
    } catch (error) {
       console.log("code fat gya"+error)
    }
  }