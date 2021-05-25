export default class RestoService {
    _apiBase = 'http://localhost:3000';

    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);
        
        if (!response.ok) {
            throw new Error(`Could not fetch ${url},
                received ${response.status}`);
        }
        return await response.json();
    }
    
    getMenuItems = async () => {
        return await this.getResource(`/menu/`);
    }

    async setOrder(order) {
        const number = await this.getOrderNumber();
        const newOrder = {
            id: number,
            order: order
        }
        const response = await fetch(`${this._apiBase}/orders`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newOrder)
        });
        if (!response.ok){
            throw new Error('json error'); 
        }
    }

    async getOrderNumber(){
        const res = await this.getResource('/orders/');
        const orderNumber = res.length+1;

        return orderNumber
    }
}