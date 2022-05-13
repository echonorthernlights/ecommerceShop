import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  if (!shippingAddress) {
    navigate("/login/shipping");
  }
  const [paymentMehod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const submitHandeler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMehod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandeler}>
        <Form.Group>
          <Form.Check
            type="radio"
            name="paymentMethod"
            id="PayPal"
            label="PayPal or Credit Card"
            value="PayPal"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked
          ></Form.Check>
          <Form.Check
            type="radio"
            name="paymentMethod"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>
        <br />
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodScreen;
