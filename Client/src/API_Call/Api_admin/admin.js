import AxiosAdmin from "./AxiosAdmin"

const admin = {
    getAll: () => {
        const url = "/";
        return AxiosAdmin.get(url);
    },
    getID: (id) => {
        const url = `/${id}`;
        return AxiosAdmin.get(url);
    },
};

export default admin;