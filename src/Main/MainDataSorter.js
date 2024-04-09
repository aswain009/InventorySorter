import React, { useState } from 'react';


function MainDataSorter ({orders, orderItems, items, boxes, users}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showOrderInfo, setShowOrderInfo] = useState(true);

    // console.log('orders', orders)
    // console.log('orderItems', orderItems)
    // console.log('items', items)
    // console.log('boxes', boxes)

    function groupItemsByOrderId(orderItems) {
        const groupedItems = orderItems.reduce((acc, item) => {
            if (!acc[item.order_id]) {
                acc[item.order_id] = [];
            }
            acc[item.order_id].push(item);
            return acc;
        }, {});
        // console.log('Grouped Items', groupedItems)
        return groupedItems;
    }

    function determineOrderVolume(orderItems, items, orderId ) {
        const itemsInOrder = groupItemsByOrderId(orderItems);

        let volume = 0;

        itemsInOrder[orderId].forEach(item => {
            let itemData = items.find(iteminOrder => iteminOrder.id === item.item_id);
            volume += itemData.length * itemData.width * itemData.height;
        });

        // console.log('OrderVolume', volume)
        return volume;
    }

    function calculateTotalofOrder(orderItems, items, orderId) {
        const itemsInOrder = groupItemsByOrderId(orderItems);

        let total = 0;

        itemsInOrder[orderId].forEach(item => {
            const itemData = items.find(itemInOrder => itemInOrder.id === item.item_id);
            total += itemData.price * item.quantity;
        });

        // console.log('Total of Order', total)
        return parseFloat(total).toFixed(2)
    }

    function checkOrderFitsInBox(orderId) {
        const orderVolume = determineOrderVolume(orderItems, items, orderId);
        const box = boxes.find(box => box.volume >= orderVolume);

        // console.log('Order fits in box', box.type)
        return box.type;
    }

    function checkForFragileItems(orderId) {
        const itemsInOrder = groupItemsByOrderId(orderItems);

        let fragile = false;

        itemsInOrder[orderId].forEach(item => {
            const itemData = items.find(itemInOrder => itemInOrder.id === item.item_id);
            if (itemData.fragile) {
                fragile = true;
            }
        });

        // console.log('Order has fragile items', fragile)
        return fragile;
    }

    function runOrderFunctions(orderId) {
        // console.log('Order Id', orderId)
        determineOrderVolume(orderItems, items, orderId);
        checkOrderFitsInBox(orderId);
        checkForFragileItems(orderId);
        calculateTotalofOrder(orderItems, items, orderId)
    }

    function getUserName(orderUserId) {
        const user = users.find(user => user.id === orderUserId);
        // console.log('User Name', user.name)
        return user.name;
    }

    function orderItemsList(orderId) {
        const orderItemsList = groupItemsByOrderId(orderItems);
        // console.log('Order Items List', orderItemsList[orderId])
        let itemNames = [];
        orderItemsList[orderId].forEach(orderItem => {
            const itemData = items.find(itemInOrder => itemInOrder.id === orderItem.item_id);
            itemNames.push(itemData.name);
        });
        // console.log('Item Names', itemNames)
        return itemNames;
    }

    function orderItemsListQuantity(orderId) {
        const orderItemsList = groupItemsByOrderId(orderItems);
        // console.log('Order Items ID', orderId)
        // console.log('Order Items List', orderItemsList[orderId])

        let itemNames = [];
        orderItemsList[orderId].forEach(orderItem => {
            itemNames.push(orderItem.quantity);

        });
        // console.log('Item Quantities', itemNames)
        return itemNames;
    }


    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>Select an Order</button>
            {isOpen && (
                orders.map(order => (
                    <div key={order.id}>
                        <button onClick={() => {
                            runOrderFunctions(order.id)
                            setShowOrderInfo(!showOrderInfo)}
                        }>{showOrderInfo ? ' ' :
                                <div>
                                    <p>Order Number: {order.id}</p>
                                    <p>Order Total: ${calculateTotalofOrder(orderItems, items, order.id)}</p>
                                    <p>Order Volume: {determineOrderVolume(orderItems, items, order.id)} square inches</p>
                                    <p>Order Fits in Box: {checkOrderFitsInBox(order.id)}</p>
                                    <p>Order Has Fragile Items: {checkForFragileItems(order.id) ? 'Yes' : 'No' }</p>
                                    <div>
                                        <p>Order Items:</p>
                                        {orderItemsList(order.id).map(orderItem => (
                                            <div>
                                                <p>{orderItem}: {orderItemsListQuantity(order.id)[orderItemsList(order.id).indexOf(orderItem)]}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }Order For: {getUserName(order.user_id)}</button>

                    </div>
                ))
            )}
        </div>
    );
}

export default MainDataSorter;