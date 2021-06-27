import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Checkbox,
  Modal,
  Button,
  Input,
  Steps,
  message,
  Form,
} from "antd";
import Payments2 from "./Payments2";
import {
  BankOutlined,
  CreditCardOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import "./Cart";
import Payments3 from "./Payments3";
import axios from "axios";
import { useHistory } from "react-router-dom";
const { Step } = Steps;
const { TextArea } = Input;


const Payments = (props) => {
  const history = useHistory();

  const pay = (values) => {
    console.log(values);
    const url = "http://localhost:3001/users/api/payment";
    axios
      .post(url, values)
      .then(async (res) => {
        if (res.data.status === "success") {
          console.log(values);
          message.success(`Xin chào, ${res.data.data.username}`);
          console.log(res.data.data.username);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setTimeout(() => {
            history.push("/");
            window.location.reload();
          }, 2000);
        } else {
          message.error("Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng !");
        }
      })
      .catch((err) => {
        message.error(
          `Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng ! \n ${err}`
        );
      });
  };

  /* useEffect(() => {
    localStorage.setItem(...["cart", JSON.stringify(props.cart)]);
  }, [props.cart]); */

  const user = JSON.parse(localStorage.getItem("user"));

  const [isCitizen, setisCitizen] = useState(true);
  const onChange = (e) => {
    setisCitizen(e.target.checked);
  };
  const [visible, setVisible] = useState(false);
  /* const userlog = localStorage.getItem() */
  console.log(props.visible);
  return (
    <>
      <Form onFinish={pay}>
        <Button
          htmlType="submit"
          type="primary"
          size={props.size}
          onClick={() => setVisible(true)}
        >
          Thanh Toán
        </Button>
        <Modal
          title="Payments"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
          footer={null}
        >
          <div>
            <Steps>
              <Step
                status="finish"
                title="Make Payment"
                icon={<LoadingOutlined />}
              />
              <Step status="process" title="Card Infomation" />
              <Step status="wait" title="Done" icon={<SmileOutlined />} />
            </Steps>
          </div>

          <div style={{ marginTop: "100px" }}>
            <Row>
              <Col span={10} offset={1}>
                <p>
                  {user != null ? (<Input placeholder="Firt Name" value={user.username} />) : (<Input placeholder="Firt Name" />)}
                </p>
                <p>
                  {user != null ? (<Input placeholder="Email Address" value={user.email} />) : (<Input placeholder="Email Address" />)}
                </p>
                <p>
                  <h1>Select Method Of Payment</h1>
                </p>
                <p>
                  <Checkbox.Group style={{ width: "100%" }}>
                    <Row>
                      <Col span={24}>
                        <Row>
                          <Col span={2}>
                            <CreditCardOutlined
                              style={{ fontSize: "20px", color: "blue" }}
                            />
                          </Col>
                          <Col span={20}>Credit Cart Or Debit</Col>
                          <Col>
                            <Checkbox
                              value="Credit"
                              checked={isCitizen}
                              onChange={onChange}
                            ></Checkbox>
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row>
                          <Col span={2}>
                            <BankOutlined
                              style={{ fontSize: "20px", color: "blue" }}
                            />
                          </Col>
                          <Col span={20}>Thanh toán sau khi nhận hàng</Col>
                          <Col>
                            <Checkbox value="Bank"></Checkbox>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                  ,
                </p>
              </Col>
              <Col span={10} offset={1}>
                <p>
                  {user != null ? (<TextArea
                    placeholder="Address Delivery"
                    rows={5}
                    value={user.diachi}
                  />) : (<TextArea
                    placeholder="Address Delivery"
                    rows={5}
                  />)}

                </p>
                <p>
                  {user != null ? (<Input placeholder="Mobile Phone" value={user.sdt} />) : (<Input placeholder="Mobile Phone" />)}
                  
                </p>
              </Col>
            </Row>
            <div style={{ paddingLeft: "78%" }}>
              <h1>{isCitizen ? <Payments2 /> : <Payments3 />}</h1>
            </div>
          </div>
        </Modal>
      </Form>
    </>
  );
};

export default Payments;
