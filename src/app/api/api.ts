import axios from "axios"

export const listNewsApi = async() => {
    try {
        return await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2023-05-24&sortBy=publishedAt&apiKey=e473a5fa143848c795073640e959696a');
    } catch (error) {
        console.log(error);
        
    }
}