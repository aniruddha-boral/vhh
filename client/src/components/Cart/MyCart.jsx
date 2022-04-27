import { Button, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import { Navbar } from "../Navbar/Navbar";
import { Address } from "./Adress";
import "./mycart.scss";
import { useState } from "react";
import { Summary } from "./Summary";

export const MyCart = () => {
    const [selectAddress, setSelectAddress] = useState({});
    const history = useHistory();
    const { task } = useParams();


    const cartItems = useSelector(state => state.products);
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        totalPrice += cartItems[i].product.price * cartItems[i].quantity
    }

    const handleClick = () => {
        if (task == "cart") {
            history.push("/checkout/address");
        } else if (task == "payment") {
            history.push('/checkout/summary');
        }else if(task=="summary"){
            setTimeout(()=>{
                alert("Order Placed");

                history.push("/");
            },1000)
        }
    }

    const handleAddress = (address)=>{
        setSelectAddress(address);

    }
    return (
        <>
            <Navbar />
            <div id="cart-wrapper">
                <div className="container">
                    {
                        (cartItems.length == 0) ? <div>
                            <p>Nothing in Cart..</p>
                            <Button onClick={() => history.push("/")} variant="contained" style={{ backgroundColor: "hotpink" }}>Add Item</Button>
                        </div> : <>
                            {
                                task == "cart" ?
                                    <div className="cart-items">
                                        <div className="no-of-items" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <Typography variant="h6">Cart</Typography>
                                            <div className="vline" style={{ width: "1px", height: "25px", backgroundColor: "grey" }}></div>
                                            <div className="total-items">{cartItems.length}&nbsp;{cartItems.length > 1 ? "Items" : "Item"}</div>
                                        </div>
                                        <div className="items">

                                            {
                                                cartItems.map(item => <div className="item" key={item.id}>
                                                    <div className="item-info">
                                                        <div className="img-container-cart">
                                                            <img src={item.product.thumbnail} alt="" />
                                                        </div>
                                                        <div className="cart-item-details">
                                                            <Typography variant="h6">{item.product.productName}</Typography>
                                                            <p>Size: {item.selectedSize} &nbsp; &nbsp; &nbsp; Qty: {item.quantity}</p>
                                                            <p>₹ {item.product.price * item.quantity}</p>

                                                        </div>
                                                        <div className="edit-button">
                                                            <Button variant="outline" style={{ color: "hotpink" }}>edit</Button>
                                                        </div>
                                                    </div>
                                                </div>)
                                            }
                                        </div>
                                    </div> : task == "address" ? <div className="address-wrapper" style={{ width: "60%", boxSizing: "border-box", paddingRight: "20px", borderRight: "1px solid grey" }}>
                                        <Address handleAddress = {handleAddress}/>
                                    </div> : task == "payment" ? <div className="payment-way" style={{width:"60%"}}>
                                        <Typography variant="h6">Payment Method</Typography>
                                        <div className="select-paymentway" style={{backgroundColor:"lightblue", display:"flex", justifyContent:"space-between", padding:"10px", borderRadius:"5px", marginTop:"20px"}}>
                                            <div style={{display:"flex", alignItems:"center"}}>

                                            <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" iconSize="20" className="Icon-sc-1iwi4w1-0 fnLXhG"><path d="M24.029 9.01v6.277L28 13.782 22.869.93a1 1 0 00-1.3-.558L0 9.011" fill="#56BB8A"></path><path d="M0 8.82h27a1 1 0 011 1v13.512a1 1 0 01-1 1H1a1 1 0 01-1-1V8.82z" fill="#56BB8A"></path><path d="M1.559 14.358c1.656-.35 2.952-1.265 3.447-2.435H23c.495 1.17 1.791 2.085 3.448 2.435v4.437c-1.657.35-2.953 1.265-3.448 2.435H5.006c-.496-1.17-1.791-2.085-3.447-2.435v-4.437z" fill="#91E5BD"></path><path d="M13.751 19.28c1.58 0 2.86-1.277 2.86-2.852a2.857 2.857 0 00-2.86-2.853 2.857 2.857 0 00-2.86 2.853 2.857 2.857 0 002.86 2.852z" fill="#56BB8A"></path><path d="M23.635 9.01L22.28 5.53l-.062-.153a4.018 4.018 0 01-3.5-1.501l-.154.062L6.296 9.01h17.34z" fill="#91E5BD"></path><path d="M7.28 16.998a.571.571 0 100-1.142.571.571 0 000 1.143zM19.865 16.998a.571.571 0 10.002-1.142.571.571 0 00-.002 1.143z" fill="#56BB8A"></path></svg>
                                            &nbsp;&nbsp;<span>Cash on Delivery</span>
                                            </div>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" height="24" width="24" iconSize="20" class="Icon-sc-1iwi4w1-0 cThscu"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zM6.355 12.322l2.761 2.76 7.863-7.85A.793.793 0 1118.1 8.355l-8.42 8.413a.793.793 0 01-1.122 0l-3.326-3.324a.791.791 0 01.56-1.354c.211 0 .413.084.562.233z" fill="#06A759"></path></svg>
                                        </div>
                                    </div>:task=="summary"?<div style={{width:"60%"}}>
                                        <Summary address = {selectAddress}/>
                                    </div>:""
                        }
                            <div className="price-details">
                                <div className="cart-price-container">
                                    <Typography variant="h6">Price Details</Typography>
                                    <div className="charge">
                                        <p >  <span>Product Charges</span> <span>₹ {totalPrice}</span>
                                        </p>
                                        <p>  <span>Delivery Charges</span> <span>+ ₹0</span>
                                        </p>
                                        <p>  <span>COD Charges</span> <span>+ ₹0</span>
                                        </p>
                                        <p>  <span>1st Order Discount</span> <span>- ₹50</span>
                                        </p>
                                    </div>
                                    <div className="totalCharges">
                                        <Typography variant="h5" style={{ display: "flex", justifyContent: "space-between" }}><span>Order Total</span><span>₹{totalPrice - 50}</span></Typography>
                                    </div>
                                    {
                                        task != "address" ? <Button variant="contained" style={{ backgroundColor: "hotpink", width: "100%", marginTop: "10px" }} onClick={handleClick}>{task=="cart"||task=="payment"?"Continue":"Place Order"}</Button> :""
                                    }
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>

        </>
    )
}