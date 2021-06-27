import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Image, Input, Button, message, Form } from 'antd';
import Meta from "antd/lib/card/Meta";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import "container/components-css/Form.scss";
import users from 'API_Call/Api_user/user';

const { TextArea } = Input;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const UserInfo = (props) => {
    const history = useHistory();

    const update = (values) => {
        console.log(values)
        /* users.updateInfo(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/Thong-tin-tai-khoan');
                }, 2000)
            }
            else {
                //message.error("Sửa thông tin thất bại")
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Login fail!\n ${err.response.data}`)
            }) */
    };


    return (
        <Container>
            <Row>
                <Col className="user-warrper">
                    
                    <Form
                        name="update"
                        onFinish={update}
                        initialValues={{
                            username: `${user.username}`,
                            matkhau: `${user.matkhau}`,
                            email: `${user.email}`,
                            sdt: `${user.sdt}`,
                            diachi: `${user.diachi}`,
                        }}
                        scrollToFirstError
                        className="form"
                    >
                        <Meta id='register-title' className="user-title" title="Thông tin tài khoản" />
                        <Image
                            width={150}
                            src="https://cdn0.iconfinder.com/data/icons/a-restaurant/500/SingleCartoonRestaurantAlice_1-512.png"
                        />
                        {/* <Form.Group>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type="file" name="profileImage" />
                        </Form.Group> */}
                        <Form.Item
                            name="username"
                            id="username"
                            label="Tên khách hàng"
                        >
                            <Input placeholder="User name" />
                        </Form.Item>
                        <Form.Item
                            name="matkhau"
                            id="matkhau"
                            label="Mật khẩu"
                        >
                            <Input placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            id="email"
                            label="Email"
                        >
                            <Input placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="sdt"
                            id="sdt"
                            label="Số điện thoại"
                        >
                            <Input placeholder="Số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            name="diachi"
                            id="diachi"
                            label="Địa chỉ"
                        >
                            <Input placeholder="Địa chỉ" />
                        </Form.Item>
                        <Button value="submit" type="primary" htmlType="submit">Update Profile</Button>
                    </Form>
                </Col>

            </Row>

        </Container>

    );
}

export default UserInfo;
