import React, { useState } from 'react';


function Component3({orders, orderItems, items, boxes, users}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showMore, setShowMore] = useState(true);

    console.log('orders', orders)
    console.log('orderItems', orderItems)
    console.log('items', items)
    console.log('boxes', boxes)

    function groupItemsByOrderId(orderItems) {
        const groupedItems = orderItems.reduce((acc, item) => {
            if (!acc[item.order_id]) {
                acc[item.order_id] = [];
            }
            acc[item.order_id].push(item);
            return acc;
        }, {});

        return groupedItems;
    }

    // let orderGroups = groupItemsByOrderId(orderItems);
    function determineOrderVolume(orderItems, items, orderId ) {
        const itemsInOrder = groupItemsByOrderId(orderItems);

        let volume = 0;

        itemsInOrder[orderId].forEach(item => {
            let itemData = items.find(iteminOrder => iteminOrder.id === item.item_id);
            volume += itemData.length * itemData.width * itemData.height;
        });

        console.log('OrderVolume', volume)
        return volume;
    }

    function calculateTotalofOrder(orderItems, items, orderId) {
        const itemsInOrder = groupItemsByOrderId(orderItems);

        let total = 0;

        itemsInOrder[orderId].forEach(item => {
            const itemData = items.find(itemInOrder => itemInOrder.id === item.item_id);
            total += itemData.price * item.quantity;
        });

        console.log('Total of Order', total)
        return total;
    }

    function checkOrderFitsInBox(orderId) {
        const orderVolume = determineOrderVolume(orderItems, items, orderId);
        const box = boxes.find(box => box.volume >= orderVolume);

        console.log('Order fits in box', box.type)
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

        console.log('Order has fragile items', fragile)
        return fragile;
    }

    function runOrderFunctions(orderId) {
        console.log('Order Id', orderId)

        determineOrderVolume(orderItems, items, orderId);
        checkOrderFitsInBox(orderId);
        checkForFragileItems(orderId);
        calculateTotalofOrder(orderItems, items, orderId)
    }

    function getUserName(orderUserId) {
        const user = users.find(user => user.id === orderUserId);
        console.log('User Name', user.name)
        return user.name;
    }


    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>Select an Order</button>
            {isOpen && (
                orders.map(order => (
                    <div key={order.id}>
                        <button onClick={() => {
                            runOrderFunctions(order.id)
                            setShowMore(!showMore)}
                        }>
                            {showMore ? ' ' :
                                <div>
                                    <p>Order {order.id}</p>
                                    <p>Order Total {calculateTotalofOrder(orderItems, items, order.id)}</p>
                                    <p>Order Volume {determineOrderVolume(orderItems, items, order.id)}</p>
                                    <p>Order Fits in Box {checkOrderFitsInBox(order.id)}</p>
                                    <p>Order Has Fragile Items {checkForFragileItems(order.id)}</p>
                                    <p>User {order.user_id}</p>
                        </div>
                            }Order For {getUserName(order.user_id)}</button>

                    </div>
                ))
            )}
        </div>
    );
}

export default Component3;