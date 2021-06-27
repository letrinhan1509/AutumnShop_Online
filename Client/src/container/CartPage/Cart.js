import { Col, Layout, Row, Button } from "antd";
import React, { useState, useEffect } from 'react';
import "container/components-css/cart.scss"
import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import Paycart from "./Paycart";
import { Link } from "react-router-dom";
import LinkPage from "../../components/Link_Page";


const { Content } = Layout;
const Cart = (props) => {

    useEffect(() => {
        localStorage.setItem(...['cart', JSON.stringify(props.cart)]);
    }, [props.cart]);


    const [size, setSize] = useState('large');

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    return (
        <Content className="cart-wrapper">

            {
                props.cart.length !== 0 ? (
                    <>
                        <LinkPage />
                        <h1>Giỏ Hàng</h1>
                        <p className="Count_Cart">Có {props.CountCart} sản phẩm trong giỏ hàng</p>
                        <Row className="cart-title">
                            <Col >SẢN PHẨM</Col>
                            <Col >GIÁ</Col>
                            <Col >SỐ LƯỢNG</Col>
                            <Col >THÀNH TIỀN</Col>
                        </Row>
                    </>
                ) : ("")
            }

            {props.cart.length === 0 ? (
                <div className="cart-empty">
                    <p>Giỏ hàng của bạn chưa có sản phẩm nào !</p>
                    <div>
                        <Link to="/">
                            <Button type="primary" shape="round" size={size}>
                                Mua Hàng
                            </Button>
                        </Link>

                    </div>
                    <img src="https://chillydraji.files.wordpress.com/2015/08/empty_cart.jpeg" alt="empty" />
                </div>
            ) :
                (
                    props.cart.map((item) => (
                        <Row className="cart-product">
                            <Col className="cart-imgProduct" key={item.masp}>
                                <img src={item.hinh} alt="imgProduct" />
                            </Col>
                            <Col span={4} className="cart-deProduct">
                                <p>{item.tensp}</p>
                                <p>Màu: {item.mau}</p>
                            </Col>
                            <Col span={5} className="cart-price"><p>Giá: {item.gia}Đ</p></Col>
                            <Col span={6} className="quantity-price">
                                <div className="quantity-box">

                                    <button onClick={() => props.removeCart(item)} className="remove">-</button>
                                    {item.qty}
                                    <button onClick={() => props.addCart(item)} className="add">+</button>

                                </div>
                            </Col>
                            <Col offset={1} className="pay-box">
                                <p>${item.qty * item.gia.toFixed(2)}Đ</p>
                            </Col>
                            <Col className="btn-box">
                                <Button onClick={() => props.removeCart(item)} type="primary" danger>
                                    <DeleteOutlined />
                                </Button>
                            </Col>
                        </Row>
                    ))
                )
            }
            {props.cart.length !== 0 && (
                <>
                    <Row className="cart-sum">
                        <Col>
                            <textarea
                                placeholder="Ghi chú"
                            />


                        </Col>
                        <Col className="line">
                            <h3>Tổng Hóa đơn</h3>
                            <div>
                                {props.PriceCart.toFixed(2)}Đ
                            </div>
                        </Col>

                    </Row>
                    <Row className="warning">
                        <Col >
                            (*) Mọi thông tin của bạn sẽ được bảo mật
                        </Col>
                    </Row>
                    <Row className="button-group">
                        <Col>
                            <Button type="primary" size={size}>
                                <Link to="/">
                                    Tiếp tục mua hàng <RollbackOutlined />
                                </Link>
                            </Button>
                        </Col>
                        <Col className="payments">
                            <Paycart payCart={props.cart} size={size} />
                        </Col>


                    </Row>
                </>
            )}

        </Content>
    );
}

export default Cart;



