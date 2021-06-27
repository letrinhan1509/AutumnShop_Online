import AxiosComment from "./AxiosComment"

const comment = {
    getAll: () => {
        const url = "/";
        return AxiosComment.get(url);
    },
    //(Chi tiết 1 bình luận theo mã bình luận)
    getid: (id) => {
        const url = `/${id}`;
        return AxiosComment.get(url);
    },
    //(Tất cả bình luận theo mã sản phẩm)
    getProductID: (id) => {
        const url = `/san-pham/${id}`;
        return AxiosComment.get(url);
    },
    //(Tất cả bình luận theo mã khách hàng)
    getUserID: (id) => {
        const url = `/khach-hang/${id}`;
        return AxiosComment.get(url);
    },
    //(Tất cả chi tiết bình luận theo mã bình luận)
    getDetailID: (id) => {
        const url = `/${id}/chi-tiet-bluan`;
        return AxiosComment.get(url);
    },
    //(Thêm mới 1 bình luận)
    addComment: (values) => {
        const url = "/them-binh-luan";
        return AxiosComment.post(url, values);
    },
    //(Trả lời 1 bình luận đã có sẵn)
    replyComment: (values) => {
        const url = "/tra-loi-binh-luan";
        return AxiosComment.post(url, values);
    },
    //(Chỉnh sửa nội dung bình luận theo mã bình luận)
    updateComment: (values) => {
        const url = "/cap-nhat-binh-luan";
        return AxiosComment.put(url, values);
    },
    //(Chỉnh sửa nội dung chi tiết(trả lời) bình luận theo mã chitietbl)
    updateDeComment: (values) => {
        const url = "/cap-nhat-tra-loi-bluan";
        return AxiosComment.put(url, values);
    },
    //(Cập nhật trạng thái 1 bình luận theo mabl ẩn hoặc hiện)
    hideCommet: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosComment.put(url, values);
    },
    //(Xoá 1 bình luận theo mabl)
    deleteCommentID: (id) => {
        const url = `/xoa-binh-luan/${id}`;
        return AxiosComment.delete(url, id);
    },
    //(Xoá 1 chi tiết(trả lời) bình luận theo mã chitietbl)
    deleteCommentDe: (id) => {
        const url = `/xoa-tra-loi-bluan/${id}`;
        return AxiosComment.delete(url, id);
    }
};

export default comment;