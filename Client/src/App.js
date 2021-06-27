//import logo from './logo.svg';
import "./App.css";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { Layout, Modal } from "antd";
import HeaderPage from "./components/include/HeaderPage";
import { Content } from "antd/lib/layout/layout";
import ProductDetail from "container/MainPage/Product-detail";
import Home from "container/MainPage/Home";
import Footer from "./components/include/Footer";
import Register from "container/UserPage/Register";
import Login from "container/UserPage/Login";
import Cart from "container/CartPage/Cart";
import Contact from "container/MainPage/Contact";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Shirt from "container/CatalogPage/Shirt";
import firebase from 'container/Config/firebase';
//import { storage } from "./container/firebase";
//import AllProduct from './container/All-Product';
import UserInfo from "container/UserPage/UserInfo";
import Backpack from "container/CatalogPage/Backpack";
import Shoes from "container/CatalogPage/Shoes";
import SearchResult from "container/MainPage/SearchResult";
import Accessories from "container/CatalogPage/Acessories";
import Error404 from "container/MainPage/Error404";
import ScrollToTop from "container/Config/ScrollToTop";
import product from "API_Call/Api_product/product";







function App() {

const [userEmail, setUserEmail] = useState([]);
// Listen to the Firebase Auth state and set the local state.
useEffect(() => {
  
  const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
    if(!user){
      //user logs out, handle somthing here
      console.log('user is not logged in!');
      return;
    }

    console.log('Logged in user: ', user);
    const token = await user.getIdToken;
    console.log('logged in user token: ', token);
    userEmail["name"] = user.displayName;
    userEmail["gmail"] = user.email;
    userEmail["uid"] = user.uid;
    userEmail["img"] = user.photoURL;
    
  });
  return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
}, []);




  //Lấy Data bằng API
  const [ListProductHome, setListProductHome] = useState([]);
  const { confirm } = Modal;
  useEffect(() => {
    product.getAll().then((res) => {
      setListProductHome(res.data.data);
      
    });
  }, []);

  console.log(ListProductHome);
  //Hàm random sản phẩm
  const shuffled = ListProductHome.sort(() => 0.5 - Math.random());
  const randomItem = shuffled.slice(0, 4);


  const storageItem = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(storageItem);

  const addCart = (productItem) => {
    const exist = cart.find((x) => x.masp === productItem.masp);
    if (exist) {
      setCart(
        cart.map((x) => x.masp === productItem.masp ? { ...exist, qty: exist.qty + 1 } : x)
      );
    } else {
      setCart([...cart, { ...productItem, qty: 1 }]);
    }
  };

  const removeCart = (productItem) => {
    const exist = cart.find((x) => x.masp === productItem.masp);
    if (exist.qty === 1) {
      showDeleteProduct(productItem);
    } else {
      setCart(
        cart.map((x) => x.masp === productItem.masp ? { ...exist, qty: exist.qty - 1 } : x)
      );
    }
  };


  function showDeleteProduct(productItem) {
    confirm({
      title: 'Bạn muốn xóa sản phẩm khỏi giỏ hàng?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        setCart(
          cart.filter((x) => x.masp !== productItem.masp)
        );

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  function Thongbao_Them(productItem) {

    const exist = cart.find((x) => x.masp === productItem.masp);
    if (exist) {
      setCart(
        cart.map((x) => x.masp === productItem.masp ? { ...exist, qty: exist.qty + 1 } : x)
      );
      Modal.success({
        content: 'Bạn đã thêm 1 sản phẩm vào giỏ hàng !',
      });
    } else {
      setCart([...cart, { ...productItem, qty: 1 }]);
      Modal.success({
        content: 'Bạn đã thêm 1 sản phẩm vào giỏ hàng !',
      });
    }
  }

  const removeProduct = (productItem) => {
    setCart(
      cart.filter((x) => x.masp !== productItem.masp)
    );
  };

  //Thành tiền
  const sumPrice = cart.reduce((a, c) => a + c.gia * c.qty, 0);



  //Firebase get image
  const [link, setLink] = useState([]);
/*   useEffect(() => {
    const fetchImages = async () => {
      let i = 0;
      let storageRef = storage.ref();
      let starsRef = await storageRef.child('img_product/').listAll();
      let urlPromises = starsRef.items.map(imageRef => imageRef.getDownloadURL());
      starsRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
          i++;
          displayImage(i, imageRef)
        })
      })
      let result = await storageRef.child('images').listAll();
      let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

      return Promise.all(urlPromises);

    }
    function displayImage(row, images) {
      images.getDownloadURL().then(function (url) {

      })
    }
    const loadImages = async () => {
      const urls = await fetchImages();
      setLink(urls);
    }
    loadImages();
  }, []); */

  

  //callback child to parent
  const [kqSearch, setKqSearch] = useState([]);
  const receiveData = function (data) {
    setKqSearch(data);
    console.log('bbbb', kqSearch);
  }

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route path='/'>
            <Layout>
              <HeaderPage ListProductHome={ListProductHome} CountCart={cart.length} PriceCart={sumPrice} receiveData={receiveData} />
              <Content className="content-wrapper">
                <Route exact path="/">
                  <Home ListProductHome={ListProductHome} link={link} cart={cart} addCart={addCart} Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route exact path="/san-pham/chi-tiet-san-pham/:id">
                  <ProductDetail
                    initRelatedItems={randomItem}
                    ListProductHome={ListProductHome}
                    addCart={addCart}
                    link={link}
                    cart={cart}
                    Thongbao_Them={Thongbao_Them}
                  />
                </Route>
                <Route path="/dang-ky">
                  <Register />
                </Route>
                <Route path="/dang-nhap">
                  <Login />
                </Route>
                <Route path="/san-pham/ao">
                  <Shirt ListProductHome={ListProductHome} link={link} Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route path="/san-pham/balo">
                  <Backpack ListProductHome={ListProductHome} link={link} Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route path="/san-pham/giay">
                  <Shoes ListProductHome={ListProductHome} link={link}  Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route path="/san-pham/phu-kien">
                  <Accessories ListProductHome={ListProductHome} link={link}  Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route path="/Timkiem">
                  <SearchResult kqSearch={kqSearch} countkqSearch={kqSearch.length} Thongbao_Them={Thongbao_Them} />
                </Route>
                <Route path="/Thong-tin-tai-khoan">
                  <UserInfo />
                </Route>
                <Route path="/gio-hang">
                  <Cart cart={cart} CountCart={cart.length} addCart={addCart} removeCart={removeCart} removeProduct={removeProduct} PriceCart={sumPrice} />
                </Route>
                <Route path="/lien-he">
                  <Contact />
                </Route>
              </Content>
              <Footer />
            </Layout>
          </Route>
          <Route path='*'>
            <Error404 />
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>

  );
}

export default App;
