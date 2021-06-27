import { Col, Row, Breadcrumb} from "antd";
import React from "react";
import "../components/components-css/Link_Page.scss";


const Link_Page = () => {

    /* function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    var path = getParameterByName('path',url); */
    var url = window.location.toString();
    url = url.replace("http://localhost:3000/", '');
    
    return (
        <>
            <Row className="link-row">
                <Col className="link-col">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Home</a>
                        </Breadcrumb.Item>
                        {/* <Breadcrumb.Item>
                            <a href="#/">Hot Deal</a>
                        </Breadcrumb.Item> */}
                        <Breadcrumb.Item>{url}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </>
    );
};
export default Link_Page;