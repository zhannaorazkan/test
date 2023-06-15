import axios from "axios";


export function getConfigs(){
    const token = localStorage.getItem('token');
    return axios
        .get('http://localhost:4000/configs/kibana-3.yml', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res=>res.data)
}

export function createConfigs (requestData){
    const token = localStorage.getItem('token');
    return axios
        .post('http://localhost:4000/configs/test.yml', requestData,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
}