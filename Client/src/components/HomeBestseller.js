import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tabs, Image, Carousel } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import "./components-css/HomeBestseller.scss";
import cookies from "react-cookies";


const { TabPane } = Tabs;



const { Meta } = Card;

const button = [
    { name: "all", value: "Tất cả" },
    { name: "asm", value: "Áo sơ mi" },
    { name: "ak", value: "Áo Khoác" },
    { name: "bl", value: "Balo" },
    { name: "giay", value: "Giày" }
]


const HomeBestseller = (props) => {
    const [ProductHome, setProductHome] = useState(props.ProductHomeS);
    useEffect(() => {
        setProductHome(props.ProductHomeS)
    }, [props.ProductHomeS])
    const handleClick = (e) => {
        setProductHome(props.ProductHomeS);
        let filterProduct = [];
        if (e === "all") {
            filterProduct = props.ProductHomeS;
        } else {
            filterProduct = props.ProductHomeS.filter(
                ProductHomeS => ProductHomeS.maloai === e
            )
        }
        setProductHome(filterProduct)
    };
    const [hiddenitem] = useState(4);
    //const history = useHistory();
    const history = useHistory();
    useEffect(() => {
        if (!cookies.load('jwt')) {
            history.push('/')
            //window.location.reload()
        }
    })




    useEffect(() => {
        localStorage.setItem(...['cart', JSON.stringify(props.cart)]);

    }, [props.cart]);


    return (
        <>
            <div className="menu_filter">
                <h3>Best Seller</h3>
                {/* <Tabs defaultActiveKey={'all'} onChange={handleClick} centered="true" >
                    {button.map(({ name, value }) => (
                        <TabPane
                            tab={value}
                            key={name}
                            name={name}>
                        </TabPane>
                    ))}
                </Tabs> */}
            </div>
            {/* <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel> */}
            <div className="site-card-wrapper product_home">
                <Row gutter={16} justify="space-around">
                    {ProductHome.slice(0, hiddenitem).map((productItem) => {
                        return (
                            <Col key={productItem.masp} span={6}>

                                <Card
                                    width={'100%'}
                                    key={productItem.masp}
                                    className="card-pro card_product_home"
                                    bordered={false}
                                    hoverable >
                                    <div className="img-box">
                                        <Image
                                            width={'100%'}
                                            src={productItem.hinh}
                                            preview={{
                                                visible: false,
                                                /* onVisibleChange: () => { onClick() }, */
                                                mask: <div className="icon_product">
                                                    <span onClick={() => props.Thongbao_Them(productItem)}>
                                                        <ShoppingCartOutlined
                                                            style={{ fontSize: '36px' }} />
                                                    </span>
                                                    <span>
                                                        <Link to={`/san-pham/chi-tiet-san-pham/${productItem.masp}`}>
                                                            <EyeOutlined
                                                                style={{ fontSize: '36px' }}
                                                            />
                                                        </Link>
                                                    </span>
                                                </div>
                                            }}
                                        />
                                    </div>
                                    <Meta
                                        className="card-pro-name"
                                        title={productItem.tensp} />
                                    <div className="price">
                                        <Meta
                                            className="card-pro-priceSale"
                                            title={`${productItem.gia - (productItem.gia * productItem.giamgia / 100)} VNĐ`} />
                                        <Meta
                                            className="card-pro-price"
                                            title={`${productItem.gia} VNĐ`} />
                                        <Meta
                                            className="card-pro-sale"
                                            title={`${productItem.giamgia}% Off`} />
                                    </div>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </>
    )
}
export default HomeBestseller;