import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredients } from "../../../redux/actionCreators";

const mapStateTopProps = (sate) => {
    return {
        ingredients: sate.Ingredients,
        totalPrice: sate.totalPrice,
        purchasable: sate.purchasable,
        userId: sate.userId,
        token: sate.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    };
};

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash on Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    };

    //?--------- this function doesn't work -----------

    goBack = () => {
        this.props.history.goBack("/");
    };

    //? ------------------------------------------------

    inputChangerHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
                //* deliveryAddress: value
            },
        });
    };

    submitHandler = () => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values, //! <<<<<<<<<<<<<<<<<<<<<<
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
        };
        axios
            .post(
                "https://burger-builder-app-bbcb4-default-rtdb.firebaseio.com/orders.json?auth=" +
                    this.props.token,
                order
            )
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully!",
                    });
                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Order Again!",
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something Went Wrong! Order Again!",
                });
            });

        console.log(order);
    };

    render() {
        let form = (
            <div>
                <h4
                    style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        borderRadius: "5px",
                        padding: "20px",
                    }}
                >
                    Payment:{this.props.totalPrice} BDT
                </h4>
                <form
                    style={{
                        border: "1px solid grey",
                        boxShadow: "1px 1px #888888",
                        borderRadius: "5px",
                        padding: "20px",
                    }}
                >
                    <textarea
                        name="deliveryAddress"
                        value={this.state.values.deliveryAddress}
                        className="form-control"
                        placeholder="Your Address"
                        onChange={(e) => this.inputChangerHandler(e)}
                    ></textarea>
                    <br />
                    <input
                        name="phone"
                        className="form-control"
                        value={this.state.values.phone}
                        placeholder="Your Phone Number"
                        onChange={(e) => this.inputChangerHandler(e)}
                    />
                    <br />
                    <select
                        name="paymentType"
                        className="form-control"
                        value={this.state.values.paymentType}
                        onChange={(e) => this.inputChangerHandler(e)}
                    >
                        <option value="Cash On Delivery">
                            Cash On Delivery
                        </option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button
                        style={{ backgroundColor: "#D70F64" }}
                        className="mr-auto"
                        onClick={this.submitHandler}
                        disabled={!this.props.purchasable}
                    >
                        Place Order
                    </Button>
                    <Button
                        color="secondary"
                        className="ms-1"
                        onClick={this.goBack}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(Checkout);