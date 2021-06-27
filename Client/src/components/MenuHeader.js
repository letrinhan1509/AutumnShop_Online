import { Row, Col, Menu } from 'antd';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../components/components-css/Header.scss"


const menu = {
    fontSize: '25px',
    fontWeight: '500'
}

const MenuHeader = () => {

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



    return (
        <>
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
                            Áo
                                        </Menu.Item>
                        <Menu.Item key="san-pham/balo" style={menu}>
                            Balo
                                        </Menu.Item>
                        <Menu.Item key="san-pham/giay" style={menu}>
                            Giày
                                        </Menu.Item>
                        <Menu.Item key="san-pham/phu-kien" style={menu}>
                            Phụ kiện
                                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </>
    );
};
export default MenuHeader;