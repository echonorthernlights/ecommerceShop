import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import {
  ORDER_LIST_MY_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const addDecimals = (number) => {
    return Math.round((number * 100) / 100).toFixed(2);
  };
  if (!loading) {
    // Calculate Prices

    order.itemsPrice = addDecimals(
      order.orderItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    );
  }

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // Create paypal script, and add client id to it
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_LIST_MY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPayed) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    //addPayPalScript();
  }, [dispatch, id, order, successPay, getOrderDetails]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order ID : {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>Name : {order.user.name}</p>
              <p>
                Email :{" "}
                <a href={`mailto : ${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address : </strong>
                {order.shippingAddress.address} , {order.shippingAddress.city}
                {order.shippingAddress.postaCode} ,{" "}
                {order.shippingAddress.country}
              </p>{" "}
              <p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered At : {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {order.paymentMethod}
              </p>{" "}
              <p>
                {order.isPayed ? (
                  <Message variant="success">
                    Payed At : {order.payedAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Payed</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item(s)</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty !!</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} X ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Items </Col>
                  <Col> $ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Shipping </Col>
                  <Col> $ {addDecimals(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> TAX </Col>
                  <Col> $ {addDecimals(order.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Total </Col>
                  <Col>$ {addDecimals(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>{" "}
              {!order.isPayed && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {/* <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item> */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
