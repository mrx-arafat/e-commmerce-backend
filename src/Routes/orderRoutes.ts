import { Router, Request, Response } from 'express';
import { OrderModel } from '../app/modules/product/order.model';
import { ProductModel } from '../app/modules/product/product.model';
import Joi from 'joi';

const router = Router();

const orderSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

// Create new order
router.post('/', async (req: Request, res: Response) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const product = await ProductModel.findById(req.body.productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });

    if (product.inventory.quantity < req.body.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    product.inventory.quantity -= req.body.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    const order = new OrderModel(req.body);
    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Retrieve order by email
router.get('/', async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    let orders;
    if (email) {
      console.log(`Filtering orders for email: ${email}`);
      orders = await OrderModel.find({ email });
    } else {
      console.log('Retrieving all orders'); // Debug
      orders = await OrderModel.find();
    }
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
