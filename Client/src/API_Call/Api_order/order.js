import AxiosOrder from "./AxiosOrder"

const order = {
    getAll: () => {
        const url = "/";
        return AxiosOrder.get(url);
    },
    //(Chi tiết 1 đơn hàng theo mã đơn hàng)
    getOrderID: (id) => {
        const url = `/${id}`;
        return AxiosOrder.get(url);
    },
    //(Danh sách chi tiết của 1 đơn hàng theo mã đơn hàng)
    getDetailID: (id) => {
        const url = `/${id}/chi-tiet-dhang`;
        return AxiosOrder.get(url);
    },
    //(Danh sách đơn hàng theo mã khách hàng)
    getUserID: (id) => {
        const url = `/khach-hang/${id}`;
        return AxiosOrder.get(url);
    },
    //(Tạo 1 đơn hàng của khách hàng)
    addOrder: (values) => {
        const url = "/tao-don-hang";
        return AxiosOrder.post(url, values);
    },
};

export default order;