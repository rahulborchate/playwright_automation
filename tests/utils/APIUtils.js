class APIUtils{

constructor(apiContext, loginPayload){
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
}

    // Get the token from the API
    async getToken(){
            const loginResponse =await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.loginPayload });
            const responseJson = await loginResponse.json();
            const token = responseJson.token;
            console.log(token);
            return token;
    }

    // Create an order using the API
    async createOrder(orderPayload){
        // Get the token from the API
        let token = await this.getToken();

        // Create the order using the API
        const response = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', { data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'  
     }});
     const orderResponseJson = await response.json();
     console.log(orderResponseJson);
     const orderId = orderResponseJson.orders[0];
     console.log("Order ID from API: " + orderId);
     response.orderId = orderId;
     response.token = token;
     return response;
    }
}
module.exports = {APIUtils};