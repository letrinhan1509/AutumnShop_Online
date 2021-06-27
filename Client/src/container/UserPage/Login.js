import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import Meta from "antd/lib/card/Meta";
import { useHistory } from "react-router-dom";
import "container/components-css/Form.scss";
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import user from 'API_Call/Api_user/user';
//import HeaderPage from '../components/include/HeaderPage';

const tailLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    signInSuccessUrl: 'https://localhost:3000/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
};

const Login = () => {
    const history = useHistory();

    const login = (values) => {
        console.log(values);
        user
        .login(values)
        .then(async (res) => {
                console.log(res.data);
                if (res.data.status === "LoginSuccess") {
                    message.success(`Xin chào, ${res.data.data.username}`)
                    console.log(res.data.data.username)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    setTimeout(() => {
                        history.push("/")
                        window.location.reload()
                    }, 2000)
                }
                else {
                    message.error('Login fail !')
                }
            })
            .catch((err) => {
                message.error(`Đăng nhập thất bại\n ${err}`)
            })
    }

    return (
        <div className="btn-wrapper">
            <Row className="login-container">
                <Col className="login-form-wrapper">
                    <Meta id='register-title' className="register-title" title="Đăng Nhập" />
                    <Form

                        name="basic"
                        initialValues={{ remember: true }}
                        //initialValues={{ email: `${user.displayName}`,  }} map data usser 
                        onFinish={login}
                        
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="matkhau"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div className="btn-wrapper">
                            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </Col>
            </Row>
        </div>

    );
}

export default Login;
