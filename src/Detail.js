import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";

let CustomBox = styled.div`
  padding: 20px;
`;

let Title = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;
function Detail(props) {
  let [alertState, alertStateChange] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      alertStateChange(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertState]);

  let [inputState, inputStateChange] = useState("");
  let { id } = useParams();
  let history = useHistory();
  let product = props.shoes.find(function (data) {
    return parseInt(data.id) === parseInt(id);
  });

  return (
    <div className="container">
      <CustomBox>
        <Title color="blue">제목입니당</Title>
        <Title className="red">빨간제목</Title>
      </CustomBox>

      {inputState}
      <input
        onChange={(e) => {
          inputStateChange(e.target.value);
        }}
      />

      {alertState === false ? null : (
        <div className="my-alert">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (product.id + 1) +
              ".jpg"
            }
            width="100%"
            alt="신발사진"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price}원</p>
          <Info 재고={props.재고[product.id]}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              let new재고 = props.재고;
              new재고[product.id] = new재고[product.id] - 1;
              props.재고변경(new재고);
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
              //history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

function Info(props) {
  return <p>재고 : {props.재고}</p>;
}

export default Detail;
