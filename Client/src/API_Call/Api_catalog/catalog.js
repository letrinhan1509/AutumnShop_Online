import AxiosCatalog from "./AxiosCatalog"

const catalog = {
    getAll: () => {
        const url = "/";
        return AxiosCatalog.get(url);
    },
    //(Chi tiết 1 danh mục theo mã danh mục)
    getDanhmucID: (id) => {
        const url = `/${id}`;
        return AxiosCatalog.get(url);
    },
    //(Danh sách tất cả loại)
    getAllType: () => {
        const url = "/loai";
        return AxiosCatalog.get(url);
    },
    //(Tất cả loại sphẩm theo mã danh mục)
    getTypeDanhmucID: (id) => {
        const url = `/${id}/loai`;
        return AxiosCatalog.get(url);
    },
    //(Chi tiết 1 loại theo mã loại)
    getTypeID: (id) => {
        const url = `/loai/${id}`;
        return AxiosCatalog.get(url);
    },
};

export default catalog;