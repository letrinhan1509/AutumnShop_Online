import React, { useState } from "react";
import { Row, Col, Card, Image, Button, Carousel, Menu } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import "container/components-css/ProductType.scss";



const { Meta } = Card;
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Backpack = (props) => {
  
  const bl = props.ListProductHome.filter(ListProductHome => ListProductHome.maloai === "bl");
  let Balo = [];
  Balo = bl;

  const [visible, setVisible] = useState(6);
  const showMoreProduct = () => {
    setVisible((preValueProduct) => preValueProduct + 6);
  };

  const onChange = () => {
    if (visible > Balo.length) {
      document.getElementById("load").style.display = "none";
    }
  }

  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };


  return (
    <>
      {/* <p style={{ textAlign: "center", fontSize: "26px", fontWeight: "bold" }}>
        Tổng số lượng sản phẩm : {props.countBalo}
      </p> */}
      <Row className="content-box">
        <Col className="left">
          <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 300 }}>
            <SubMenu key="sub1"  title="Navigation One">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2"  title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4"  title="Navigation Three">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col className="right">
          <Carousel dots="" autoplay className="carousel">
            <div>
              <img src="../images/slider/slider_balo1.jpg" alt="slider" />
            </div>
            <div>
              <img src="../images/slider/slider_balo2.jpg" alt="slider" />
            </div>
            <div>
              <img src="../images/slider/slider_balo3.jpg" alt="slider" />
            </div>
          </Carousel>
          <div className="site-card-wrapper product_home">
            <Row>
              {Balo.slice(0, visible).map((productItem) => {
                return (
                  <Col key={productItem.masp} span={7} offset={1}>
                    <Card
                      width={'100%'}
                      key={productItem.masp}
                      className="card-pro card_product_home"
                      bordered={false}
                      hoverable >
                      <div className="img-box">
                        <Image
                          width={'100%'}
                          src={`../images/test/${productItem.hinh}`}
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
        </Col>
      </Row>
      {
        Balo.length > 6 ? (
          <Row>
            <Col offset={12}>
              <Button
                id="load"
                type="primary"
                onChange={onChange()}
                onClick={showMoreProduct}
                className="btn-load"
              >
                Xem thêm
                </Button>
            </Col>
          </Row>
        ) : ("")

      }

    </>
  );
};
export default Backpack;
