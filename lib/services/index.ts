import axios from 'axios';

export const developmentHost = 'http://api.weatherapi.com/v1/current.json?key=a075a7a524fa4f479f0141952221509';
export const productionHost = 'http://api.weatherapi.com/v1/current.json?key=a075a7a524fa4f479f0141952221509';

const ROOT_API = axios.create({
    baseURL: `${process.env.NODE_ENV === "development" ? developmentHost : productionHost}`,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const clientGet = async (endPoint:string, params:any) => {
    try {
        let res = await ROOT_API.get(endPoint, { params: params })
        return { data: res.data }
    } catch (e:any) {
        const { data } = e.response;
        return { error: data }
    }
}