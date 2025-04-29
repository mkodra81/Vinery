import Order from "../models/Orders.js";


const createOrder = async (req, res) => {
  const { estimatedDelivery, items, orderDetails } = req.body;

  try {
    const newOrder = new Order({
      estimatedDelivery,
      items,
      orderDetails,
      status: "Processing",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("items.productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getOrderById };
