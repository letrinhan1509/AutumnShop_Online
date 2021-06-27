import React, { useState } from "react";
import {Modal, Button,Progress, Steps } from "antd";
const { Step } = Steps;
const Payments3 = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
    
      <Button type="primary" htmlType="submit" onClick={() => setVisible(true)}>
        Confirm
      </Button>
     
      <Modal
        title="Payments"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      
        
      >
       <div>
       <Steps>
    <Step status="finish" title="Make Payment"  />
    <Step status="finish"  title="Card Infomation" />
    <Step status="finish" title="Done"  />
  </Steps>
  </div>
        <div style={{textAlign:"center"}}>
          <h1 style={{fontSize:"36px"}}>Successfully!</h1>
        <Progress type="circle" percent={100} />
        </div>
        
      </Modal>
    </>
  );
};

export default Payments3;
