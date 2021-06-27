import { Row, Col, Badge, Menu, Dropdown } from 'antd';
import React, { useState } from "react";
import { ShoppingCartOutlined, UserOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import "../components-css/Header.scss"
import SearchBar from "./SearchBar";


const menu = {
    fontSize: '25px',
    fontWeight: '500'
}

const HeaderPage = (props) => {

    const history = useHistory();
    const [current, setCurrent] = useState("home");
    const handClick = (e) => {
        setCurrent(e.key);
        if (e.key === '/') {
            history.push('/')
        }
        else history.push(`/${e.key}`);
    }
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        history.push('/');
        window.location.reload()

    }
    const User = JSON.parse(localStorage.getItem('user'));


    const drops = (
        <Menu>
            <Menu.Item key="donhang">
                <a target="_blank" rel="donhang">
                    Đơn hàng
                </a>
            </Menu.Item>
            <Menu.Item key="UserInfo">
                <a target="_blank" rel="UserInfo">
                    Profile
            </a>
            </Menu.Item>
            <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
                <a target="_blank" rel="logout">
                    Log out
            </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Row className="menu1-wrapper">
                <Col className="menu1-box">
                    <Menu mode="horizontal"
                        className="menu1"
                        onClick={handClick}
                        selectedKeys={[current]}>

                        <div className="logo-box">
                            <Link className="logo" to={'/'}>
                                <img width="50px" alt='logo' src="/images/icon/images.png" />
                                <p>autumn</p>
                            </Link>
                        </div>

                        <SearchBar ListProductHome={props.ListProductHome} receiveDataa={props.receiveData} />
                        <Menu.Item key="gio-hang">
                            <Badge size="small" count={props.CountCart}>
                                <div className="box-cart">
                                    <ShoppingCartOutlined style={{ fontSize: '26px' }}>
                                    </ShoppingCartOutlined>
                                </div>
                            </Badge>
                        </Menu.Item>
                        <Menu.Item key="price">
                            {props.PriceCart}Đ
                        </Menu.Item>
                        <Menu.Item key="lien-he">
                            Contact
                        </Menu.Item>

                        {JSON.parse(localStorage.getItem('user')) === null ? (
                            <>
                                <Menu.Item key="dang-ky" style={menu} icon={<UserAddOutlined style={{ fontSize: 20 }} />}>
                                </Menu.Item>
                                <Menu.Item key="dang-nhap" style={menu} icon={<LoginOutlined style={{ fontSize: 20 }} />}>
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Menu.Item key="Thong-tin-tai-khoan" icon={<UserOutlined />}>
                                    <Dropdown overlay={drops}>
                                        <a className="ant-dropdown-link">
                                            {User.username}
                                        </a>
                                    </Dropdown>
                                </Menu.Item>
                            </>
                        )}
                    </Menu>
                </Col>
            </Row>
            <Row className="menu2-wrapper">
                <Col className="menu2-box" >
                    <Menu mode="horizontal"
                        className="menu2"
                        onClick={handClick}
                        selectedKeys={[current]}>
                        
                        <Menu.Item key="/" style={menu} >
                            Home
                        </Menu.Item>
                        <Menu.Item key="san-pham/ao" style={menu}>
                            Shirt
                                        </Menu.Item>
                        <Menu.Item key="san-pham/balo" style={menu}>
                            Bag
                                        </Menu.Item>
                        <Menu.Item key="san-pham/giay" style={menu}>
                            Shoes
                                        </Menu.Item>
                        <Menu.Item key="san-pham/phu-kien" style={menu}>
                            Acessories
                                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </>
    );
};
export default HeaderPage;