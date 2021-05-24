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
}