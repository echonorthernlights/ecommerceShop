import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../components/Message";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import { addToCart } from "../actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const quantity = searchParams.get("quantity")
    ? Number(searchParams.get("quantity"))
    : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  return <div>cartScreen</div>;
};

export default CartScreen;
