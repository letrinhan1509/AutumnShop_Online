import AxiosProducer from "./AxiosProducer"

const producer = {
    getAll: () => {
        const url = "/";
        return AxiosProducer.get(url);
    },
    //(Nhà sản xuất theo id)
    getid: (id) => {
        const url = `/${id}`;
        return AxiosProducer.get(url);
    },
};

export default producer;