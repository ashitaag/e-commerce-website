import axios from 'axios'

const products_rest_api_url = "http://localhost:8080/api/Products"

class productService{
    getproducts(){
        axios.get(products_rest_api_url)
    }
}

export default new productService();