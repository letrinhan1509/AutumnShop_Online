import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../Select_Product';
import "../components-css/SearchBar.scss"
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const SearchBar = (props) => {

    let wordData = props.ListProductHome;
    const [wordSearch, setWordSearch] = useState('');

    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    let a = [];
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            if (removeAccents(el.tensp.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1) {
                return el;
            } else {
                return "";
            }

        });
    }
    const [visible, setVisible] = useState(false);
    const [hidden, setHidden] = useState(false);


    function handlerClick(e) {
        if (e.target.value !== "") {
            if (filterItems(wordData, e.target.value) !== "") {
                setWordSearch(e.target.value);
                setHidden(true);
                setVisible(true);
                
            } else {                
                setWordSearch(e.target.value);
                setVisible(false);
                setHidden(false);
                e.target.nextSibling.style.visibility  = 'visible';
            }
        } else {
            setWordSearch("");
            setVisible(false);
            setHidden(false);
            e.target.nextSibling.style.visibility  = 'hidden';
        }
    }

    function xoaWord() {
        setWordSearch("");
        setHidden(false);
        setVisible(false);
        
    }
    return (
        <>
            <div className="box">
                <div className="search_bar">
                    <input value={wordSearch} placeholder='Nhập tên sản phẩm' onChange={e => handlerClick(e)} />
                        {
                            hidden ? (
                                <div className="dropList" >
                                    {
                                        visible ? filterItems(wordData, wordSearch).map(value => {
                                            return (
                                                <Link to={`/san-pham/chi-tiet-san-pham/${value.masp}`} onClick={xoaWord}>
                                                    <div className="box_link">
                                                        <p key={value.masp}>{value.tensp}</p>
                                                    </div>
                                                </Link>
                                            )
                                        }) : ""

                                    }

                                </div>
                            ) : (
                                <div className="not_found" id="not_found" style={{visibility: 'hidden'}}>
                                    <p>Không tìm thấy sản phẩm !</p>
                                </div>
                            )
                        }
                    <div hidden>
                        {
                            wordSearch != '' ? (a = filterItems(wordData, wordSearch)) : (""),
                            console.log(a)
                        }
                    </div>
                </div>
                <Link to={`/Timkiem`}>
                    <Button className="btn-search" type="primary" icon={<SearchOutlined />} onClick={() => {
                        xoaWord();
                        props.receiveDataa(a);
                    }} />
                </Link>
            </div>


        </>
    );
};
export default SearchBar;