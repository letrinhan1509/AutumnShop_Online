import React, { useState} from "react";
import {
  Modal,
  Button,
  Input,
  message,
  Form,
} from "antd";
import "./Cart";
import Payments from "./Payments";
import axios from "axios";


const Paycart = (props) => {
  console.log(props.payCart);
  const pay = (values) => {
    console.log(values);

    axios
      .post("http://127.0.0.1:5000/api/v1/add-order", values)
      console.log(values)
      .then(async (res) => {
        if (res.data.status === "Success") {
          message.success(`Tạo đơn hàng thành công !`);

          
        } else {
          message.error("Đặt hàng thất bại");
        }
      })
     /*  .catch((err) => {
        message.error(`Đạt hàng thất bại`);
      }); */
  };




  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [visible, setVisible] = useState(false);

/*   const handleFormSubmit = () => {
    form.validateFields()
      .then((values) => {
        // Submit values
        // submitValues(values);
      })
      .catch((errorInfo) => { });
  }; */

  /* userId:`${user.makh}`,
  nameUser:`${user.username}` */

  return (
    <>
      <Button
        style={{ height: "40px" }}
        type="primary"
        onClick={() => setVisible(true)}
      >
        Xác nhận
      </Button>
      <Modal
        title="Payments"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        okText={<Payments />}
      >
        <div></div>
        <div style={{ marginTop: "100px" }}>
          {props.payCart.map((item) => (
            <>
              <Form onFinish={pay}
                initialValues={{
                  masp: `${item.masp}`,
                  soluong: `${item.qty}`,
                  tensp:`${item.tensp}`,
                  gia: `${item.qty * item.gia.toFixed(2)}`
                }}>
                <p>

                  <div
                    style={{
                  /* border: "1px solid black" */ maxWidth: "100%",
                      height: 300,
                      overflow: "scroll",
                      fontWeight: "bold",
                    }}
                  >

                    
                    {/* <Form.Item name="userId" label="Mã khách hàng">
                      <Input name="userId"/>
                    </Form.Item>
                    <Form.Item label="Tên khách hàng" name="nameUser">
                      <Input />
                    </Form.Item> */}
                    <Form.Item label="Mã sản phẩm" name="masp">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Tên sản phẩm" name="tensp">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Số lượng" name="soluong">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Giá" name="gia">
                      <Input />
                    </Form.Item>
                  </div>
                </p>


                {/* <div style={{ paddingLeft: "78%" }}>
            <Payments  />
            </div> */}
                <Form.Item>
                  <Button type="primary" onClick={pay} htmlType="submit">
                    Xác nhận
                  </Button>
                </Form.Item>
              </Form>
            </>
          )

          )}
          {/*   <Button onSubmit={handleFormSubmit} ></ */}

        </div>
      </Modal>
    </>
  );
};

export default Paycart;
