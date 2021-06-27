import { Col, Layout, Row, Rate, Statistic, Select, Button, Card, Carousel, Tabs, Comment, Tooltip, List } from "antd";
import moment from 'moment';
import { ShoppingCartOutlined, HeartOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import React, { createContext, useState } from 'react';
import "../components/components-css/SelectProduct.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const { Content } = Layout;
const { Option } = Select;


export const DataContext = createContext()
const Select_Product = (props) => {

    const { id } = useParams();
    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const [size] = useState('large');
    const { TabPane } = Tabs;

    const data = [
        {
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
            ),
        },
        {
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Taki',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources. very good !!!
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(2, 'days').fromNow()}</span>
                </Tooltip>
            ),
        },
    ];

    const product = [
        {
            key: "1",
            name: "Product Name",
            color: [
                "red",
                "black",
                "white",
                "blue"
            ],
        }
    ];

    const TabsProduct = () => (

        <Tabs defaultActiveKey="1" style={{ width: 900 }}>
            <TabPane tab="Product Infomation" key="1">
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum magni velit vero hic temporibus eveniet, distinctio quas nemo, qui porro ex
                    sapiente molestiae provident reiciendis saepe. Voluptate nihil perferendis assumenda.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Rerum magni velit vero hic temporibus eveniet, distinctio quas nemo, qui porro ex sapiente molestiae provident reiciendis saepe. Voluptate nihil perferendis assumenda.
            </p>
                <p>
                    Voluptate nihil perferendis assumenda.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Rerum magni velit vero hic temporibus eveniet, distinctio quas nemo, qui porro ex sapiente molestiae provident reiciendis saepe. Voluptate nihil perferendis assumenda.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum magni velit vero hic temporibus eveniet, distinctio quas nemo, qui porro ex
                    sapiente molestiae provident reiciendis saepe.
            </p>
            </TabPane>
            <TabPane tab="Reviews" key="2">
                <List
                    className="comment-list"
                    header={`${data.length} replies`}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <li>
                            <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                    )}
                />
            </TabPane>
            <TabPane tab="Another Tab" key="3">
                Content of Tab Pane 3
          </TabPane>
        </Tabs>
    );



    /* const [current, setCurrent] = useState(product[0].src[0].id);

    const handleTab = (imgfile, e) => {

        let currentId = e.target.name;
        console.log(current)
        setCurrent(`${current}`);
        console.log(current)
        let listPhoto = document.getElementsByClassName('hinh');
        for (let i = 0; i < listPhoto.length; i++) {
            if (currentId === current) {
                document.getElementById(current).classList.add('active');
            }
            else
                if (listPhoto[i].classList.contains('active')) {
                    listPhoto[i].classList.remove('active');
                }
        }

    }; */

    let item = [];
    item = props.ListPro.filter(
        ListPro => ListPro.masp.toString() === id
    );
    console.log(item);
    let visible = 4;

    return (

        <Content>
            <Row className="cover-one">
                {item.map((e) => {
                    return (
                        <>
                            <Col className="img-box" key={e.key}>
                                <Row>
                                    <Col>
                                        <img src={e.hinh} alt="product" />
                                    </Col>
                                </Row>
                                <Row className="img-change">
                                    {item.map((e) => {
                                        return (
                                            <Col className="hinh"><img name={e.id} src={e.hinh} alt="product" /*onClick={(e) => handleTab(e.file, e)}*/ /></Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                            <Col className="imfo-col">
                                <h1>{e.tensp}</h1>
                                <ul className="vote-star">
                                    <li><Rate /></li>
                                    <li><Statistic title="reviews" value={0} /></li>
                                    <li><a href="#/">Submit a review</a></li>
                                </ul>
                                <div className="sale-imfo">
                                    <Row>
                                        <Col><p>Price:</p></Col>
                                        <Col offset={5}><p>{e.gia} VNĐ</p></Col>
                                    </Row>
                                    <Row>
                                        <Col><p>Sale:</p></Col>
                                        <Col offset={6}><p>{e.giamgia}% OFF</p></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Origin:</p>
                                            <p>Type:</p>
                                        </Col>
                                        <Col offset={5}>
                                            <p>{e.tennsx}</p>
                                            <p>{e.tenloai}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col><p>Description:</p></Col>
                                        <Col offset={3}><p>{e.mota}</p></Col>
                                    </Row>
                                </div>
                                <div className="size-color">
                                    <Row className="box-one">
                                        <Col>
                                            <span>Select Color</span>
                                        </Col>
                                        <Col> 
                                            {
                                                product.map((items) => {
                                                    return (
                                                        <div >
                                                            {items.color.map((item) => {
                                                                return (
                                                                    <button className="select-color" style={{ background: item }}></button>
                                                                );
                                                            })}
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="box-two">
                                        <Col>
                                            <span>Size</span>
                                        </Col>
                                        <Col>
                                            <Select defaultValue="S" style={{ width: 120 }} onChange={handleChange}>
                                                <Option value="S">S</Option>
                                                <Option value="M">M</Option>
                                                <Option value="L">L</Option>
                                                <Option value="XL">XL</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="add-cart">
                                    <Row>
                                        <Col offset={13} span={4}>
                                            <Button onClick={() => props.Thongbao_Them(e)} className="btn-add" type="primary" icon={<ShoppingCartOutlined />} size={size}>
                                                Add To Cart
                                            </Button>
                                        </Col>
                                        <Col offset={4} span={2}>
                                            <Button className="btn-add" type="primary" icon={<HeartOutlined />} size={size} />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="social-network">
                                    <Row>
                                        <Col>
                                            <Button className="btn-facebook" type="primary" icon={<FacebookOutlined />} size={size}>
                                                Share on Facebook
                                </Button>
                                        </Col>
                                        <Col>
                                            <Button className="btn-switter" type="primary" icon={<TwitterOutlined />} size={size}>
                                                Share on Twitter
                                </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </>
                    );
                })}

                <Col className="best-seller">
                    <Row>
                        <Col>
                            <h1>Best Seller</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="box">
                            <Carousel autoplay style={{ width: 300 }}>
                                {props.ListPro.slice(0, visible).map((item) => {
                                    return (
                                        <div>
                                            <Link to={`/san-pham/chi-tiet-san-pham/${item.masp}`}>
                                                <Card
                                                    className="card"
                                                    hoverable
                                                    style={{ width: 300 }}
                                                    cover={<img alt="example" src={item.hinh} />}
                                                >
                                                    <Row>
                                                        <Col offset={5}>
                                                            <Rate />
                                                            {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                                                            <ul className="price">
                                                                <li className="new">$299,00</li>
                                                                <li className="old">$534,33</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Link>
                                        </div>
                                    );
                                })}

                            </Carousel>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="cover-two">
                <Col className="comments">
                    <TabsProduct />
                </Col>
            </Row>
        </Content>
    );
}

export default Select_Product;