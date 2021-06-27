import { Col, Row, Card, Image } from "antd";
import React, { createContext } from 'react';
import { Link } from "react-router-dom";
import "../components/components-css/Sale.scss";



export const DataContext = createContext()
const Sale = () => {
    const ListProduct = [
        {
            id: '1',
            title: 'Áo',
            img: 'sale_off_1.jpg',
            sale: '30',
            name: 'Ao'
        },
        {
            id: '2',
            title: 'Balo',
            img: 'sale_off_2.jpg',
            sale: '10',
            name: 'Balo'
        },
        /*         {
                    id: '3',
                    title: 'Giày',
                    img: 'sale_off_3.jpeg',
                    sale: '20',
                    name: 'Phukien'
                } */
    ]

    return (
        <>
            <Row>
                <div className="card-wrapper">
                    <Col className="left">
                        <Card
                            className="card-sale"
                            bordered={false}
                            back
                        >
                            <Link to="">
                                <div className="img-box">
                                    <Image
                                        className="sale_img"
                                        width={'100%'}
                                        src="./images/slider/slider8.png"
                                        preview={{
                                            visible: false,
                                            /* onVisibleChange: () => { onClick() }, */
                                            mask: <div className="link_product">

                                                <span>
                                                    Collection
                                            </span>
                                            </div>
                                        }}
                                    />
                                </div>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="right">
                        <p>
                            <span>K</span>hác với mùa đông, thời trang mùa hè có phần phóng khoáng và thoải mái hơn. Outfit không cần quá nhiều layer cầu kì mà vẫn nổi bật với chất 
                            liệu mềm rũ và hoạ tiết độc đáo. Một chút “ mood “ biển mà tụi mình muốn gửi đến cho các bạn trong mùa hè này
                            <br />“𝐿𝑖𝑓𝑒 𝑖𝑠 𝑠𝑜 𝑚𝑢𝑐ℎ 𝑏𝑒𝑡𝑡𝑒𝑟 𝑤ℎ𝑒𝑛 𝑦𝑜𝑢’𝑟𝑒 𝑙𝑖𝑣𝑖𝑛𝑔 𝑖𝑛 𝑠𝑙𝑜𝑤 𝑚𝑜𝑡𝑖𝑜𝑛”.
                        </p>
                    </Col>
                </div>

            </Row>
            <Row>
                <div className="card-wrapper direction">
                    <Col className="left">
                        <Card
                            className="card-sale"
                            bordered={false}
                            back
                        >
                            <Link to="">
                                <div className="img-box">
                                    <Image
                                        className="sale_img"
                                        width={'100%'}
                                        src="./images/slider/bg-attact.png"
                                        preview={{
                                            visible: false,
                                            /* onVisibleChange: () => { onClick() }, */
                                            mask: <div className="link_product">

                                            <span>
                                                Collection
                                            </span>
                                            </div>
                                        }}
                                    />
                                </div>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="right">
                        <p>
                            <span>Đ</span>ược truyền một nguồn cảm hứng tự do và đầy phóng khoáng từ những trải nghiệm tuyệt vời tại thành phố sương mù – Đà Lạt,  một sự giao thoa ngẫu hứng nhưng hoà hợp giữa cả thiên nhiên, con người và thời trang.
                            Không chỉ gói gọn trong các gam màu trung tính lạnh của sương khói, gam màu trung tính nóng hay tone cam đất cũng đều làm bật lên những nét đặc trưng của xứ sở này.
                            Bạn có thể tìm thấy cho mình gần như tất cả những item đang đón đầu xu hướng Thu – Đông 2021, cũng như những chất liệu đủ làm thoả mãn mọi “giác quan” thời trang khó tính nhất trong COLLECTION.
                        </p>
                    </Col>
                </div>

            </Row>
        </>


    );
}

export default Sale;