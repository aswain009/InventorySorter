import React from 'react';
import {useEffect, useState} from "react"
import Component3 from "./component3";

function MyComponent () {
    const [items, setItems] = useState('');
    const [boxes, setBoxes] = useState('');
    const [users, setUsers] = useState('');
    const [orders, setOrders] = useState('');
    const [orderItems, setOrderItems] = useState('');

    useEffect(() => {
        fetch('http://localhost:9000/items')
            .then(response => response.json())
            .then((data) => {
                setItems(data);
                // console.log('Items', data)
            })


        fetch('http://localhost:9000/boxes')
            .then(response => response.json())
            .then((data) => {
                setBoxes(data);
                // console.log('Boxes', data)
            });


        fetch('http://localhost:9000/users')
            .then(response => response.json())
            .then((data) => {
                setUsers(data);
                // console.log('Users', data)
            });


        fetch('http://localhost:9000/orders')
            .then(response => response.json())
            .then((data) => {
                setOrders(data);
                // console.log('Orders', data)
            });


        fetch('http://localhost:9000/order_Items')
            .then(response => response.json())
            .then((data) => {
                setOrderItems(data);
                // console.log('Order_Items', data)
            });

    }, []);


    return (
        <div>
            <h1>Orders to choose</h1>
            <Component3
                orders={orders}
                orderItems={orderItems}
                items={items}
                boxes={boxes}
                users={users}
            />
        </div>
    );
}
export default MyComponent;