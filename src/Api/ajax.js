import axios from 'axios'

export default function ajax(url = "", params = {}, type = "GET") {
    let promise;
    return new Promise((resolve, reject) => {
        if ("GET" === type.toUpperCase()) {
            let Parametr = "";
            Object.keys(params).forEach(keys => {
                Parametr += keys + "=" + params[keys] + "&"
            })
            if (Parametr !== '') {
                Parametr = Parametr.substr(0, Parametr.lastIndexOf('&'))
            }
            url += "?" + Parametr;
            promise = axios.get(url)
        }
        else if ("POST" === type.toUpperCase()) {
            promise = axios.post(url, params)
        }
        promise.then((response) => {
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}