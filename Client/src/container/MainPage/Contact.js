import React from "react";
import "container/components-css/Register.scss";
import "container/components-css/contact.scss";
import {  Form, Input,Button} from "antd";
//import emailjs from "emailjs-com";
//const swal = require('react-swal');


const layout = {
  labelCol: {
    span: 10,

  },
  wrapperCol: {
    span: 8,
  },

};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} không khả dụng !',
    number: '${label} không khả dụng!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */



const Contact = () => {
  const onFinish = (values) => {
    console.log(values);
  }
  /* const sendemail = (e) => {
    e.preventDefault();
    emailjs.sendemail('thanhloi486@gmail.com', 'template_qa0en4o', e.target)
      .then((result) => {
        swal('seen');
      });
    emailjs.sendForm('thanhloi486@gmail.com', 'template_qa0en4o', e.target, 'user_5bysJ0np6obXcm7ExXJ9T')
      .then((result) => {

        console.log(result.text);

      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  } */
  return (

    <div className="wrapper">
      




      <div className="form" >
        <div className="text-contact"> <h1> CONTACT US </h1></div>
        <Form {...layout} onFinish={onFinish} name="nest-messages" /*onSubmitCapture={sendemail}*/ validateMessages={validateMessages} >
          <div className="name">Name</div>
          <Form.Item

            name="name"


            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error('Vui lòng nhập đúng!'));
                  }
                },
              },
            ]}

          >
            <Input name="name" />
          </Form.Item>
          <div className="name">Email</div>
          <Form.Item

            name="email"
            rules={[
              {
                type: 'email',

              },

            ]}
          >





            <Input />

          </Form.Item>
          <div className="name">Subject</div>
          <Form.Item

            name={["subject"]}

          >
            <Input name="subject" />
          </Form.Item>
          <Form.Item name="message" >
            <div className="mess">Message</div>
            <Input.TextArea style={{ height: '100px', width: '1000px' }} name="message" />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1, span: 5 }} >
            <Button type="submit" htmlType="submit" >
              Submit
          </Button>
          </Form.Item>
        </Form>


      </div>
    </div>

  );

};


export default Contact;


