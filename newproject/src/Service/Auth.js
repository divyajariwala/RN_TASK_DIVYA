import * as Url from '../Config/Constant';
import axios from 'axios';



// -----!REGISTER!------
export const register = (payload) => {
    return axios(Url.baseUrl + '/register', {
        method: 'POST',
        // headers: {
        //     'content-type': 'multipart/form-data'
        // },
        data: payload
    }).then(response => response.data)
        .catch(e => e.response)
}



