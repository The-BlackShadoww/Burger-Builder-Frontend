import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
];

const BuildControl = (props) => {
    return (
        <div className="d-flex ">
            <div
                className="me-auto ml-5"
                style={{ fontWeight: "bold", fontSize: "1.2rem" }}
            >
                {props.label}
            </div>
            <button
                className="btn btn-danger btn-sm m-1"
                onClick={props.removed}
            >
                Less
            </button>
            <button
                className="btn btn-success btn-sm m-1"
                onClick={props.added}
            >
                More
            </button>
        </div>
    );
};

const Controls = (props) => {
    return (
        <div className="container ml-md-5 " style={{ textAlign: "center" }}>
            <Card
                style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    textAlign: "center",
                }}
            >
                <CardHeader
                    style={{
                        backgroundColor: "#d70f64",
                        color: "white",
                    }}
                >
                    <h4>Add Ingredients</h4>
                </CardHeader>
                <CardBody>
                    {controls.map((item) => {
                        return (
                            <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                added={() => props.ingredientAdded(item.type)}
                                removed={() =>
                                    props.ingredientRemoved(item.type)
                                }
                            />
                        );
                    })}
                </CardBody>
                <CardFooter>
                    <h5>
                        Price:<strong>{props.price}</strong> BDT
                    </h5>
                </CardFooter>
                <Button
                    style={{
                        backgroundColor: "#D70f64",
                    }}
                    disabled={!props.purchasable}
                    onClick={props.toggleModal}
                >
                    Order Now
                </Button>
            </Card>
        </div>
    );
};

export default Controls;
