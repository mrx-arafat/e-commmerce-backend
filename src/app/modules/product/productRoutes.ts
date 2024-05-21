import { Router, Request, Response } from 'express';
import { ProductModel } from './product.model';
import { productSchema } from './productValidator';

const router = Router();

// Create new product
router.post('/', async (req: Request, res: Response) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Retrieve all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Retrieve product by ID
router.get('/:productId', async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Update product information
router.put('/:productId', async (req: Request, res: Response) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const product = await ProductModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete a product
router.delete('/:productId', async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Search a product
router.get('/search', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const products = await ProductModel.find({
      name: { $regex: searchTerm, $options: 'i' },
    });
    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
