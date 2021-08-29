import axios from 'axios';

export async function getProvinceList() {
    try {
        const data = await axios.get('https://provinces.open-api.vn/api/?depth=2');
        return data.data;
    } catch(err) {
        console.error(err);
    }
};
