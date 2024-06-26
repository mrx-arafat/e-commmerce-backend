import mongoose from 'mongoose';
import { ProductModel } from './app/modules/product/product.model';
import { OrderModel } from './app/modules/product/order.model';
import config from './app/config';

const sampleProducts = [
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI settings.',
    price: 29.99,
    category: 'Electronics',
    tags: ['computer', 'peripherals', 'wireless', 'ergonomic'],
    variants: [
      { type: 'color', value: 'Black' },
      { type: 'color', value: 'White' },
    ],
    inventory: {
      quantity: 150,
      inStock: true,
    },
  },
  {
    name: 'Bluetooth Speaker',
    description:
      'Portable Bluetooth speaker with high-fidelity sound and long battery life.',
    price: 59.99,
    category: 'Electronics',
    tags: ['audio', 'portable', 'wireless', 'speaker'],
    variants: [
      { type: 'color', value: 'Blue' },
      { type: 'color', value: 'Red' },
    ],
    inventory: {
      quantity: 200,
      inStock: true,
    },
  },
  {
    name: 'Yoga Mat',
    description: 'Eco-friendly yoga mat with non-slip surface.',
    price: 24.99,
    category: 'Fitness',
    tags: ['yoga', 'fitness', 'eco-friendly', 'non-slip'],
    variants: [
      { type: 'color', value: 'Green' },
      { type: 'color', value: 'Purple' },
    ],
    inventory: {
      quantity: 75,
      inStock: true,
    },
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with breathable mesh upper.',
    price: 79.99,
    category: 'Footwear',
    tags: ['running', 'shoes', 'lightweight', 'breathable'],
    variants: [
      { type: 'size', value: '8' },
      { type: 'size', value: '9' },
      { type: 'size', value: '10' },
    ],
    inventory: {
      quantity: 120,
      inStock: true,
    },
  },
  {
    name: 'Electric Kettle',
    description: 'Stainless steel electric kettle with auto shut-off feature.',
    price: 39.99,
    category: 'Kitchen',
    tags: ['kitchen', 'appliance', 'electric', 'kettle'],
    variants: [
      { type: 'capacity', value: '1.5L' },
      { type: 'capacity', value: '2L' },
    ],
    inventory: {
      quantity: 60,
      inStock: true,
    },
  },
  {
    name: 'Gaming Keyboard',
    description: 'Mechanical gaming keyboard with RGB backlight.',
    price: 89.99,
    category: 'Electronics',
    tags: ['gaming', 'keyboard', 'mechanical', 'RGB'],
    variants: [
      { type: 'switch', value: 'Blue' },
      { type: 'switch', value: 'Red' },
    ],
    inventory: {
      quantity: 40,
      inStock: true,
    },
  },
  {
    name: 'Smart Watch',
    description: 'Smart watch with heart rate monitor and GPS.',
    price: 129.99,
    category: 'Wearable',
    tags: ['smartwatch', 'wearable', 'fitness', 'GPS'],
    variants: [
      { type: 'strap', value: 'Silicone' },
      { type: 'strap', value: 'Leather' },
    ],
    inventory: {
      quantity: 90,
      inStock: true,
    },
  },
  {
    name: 'Noise-Cancelling Headphones',
    description:
      'Wireless noise-cancelling headphones with 20-hour battery life.',
    price: 199.99,
    category: 'Audio',
    tags: ['audio', 'headphones', 'wireless', 'noise-cancelling'],
    variants: [
      { type: 'color', value: 'Black' },
      { type: 'color', value: 'Silver' },
    ],
    inventory: {
      quantity: 85,
      inStock: true,
    },
  },
  {
    name: 'Smartphone',
    description: 'Latest model smartphone with 128GB storage and dual cameras.',
    price: 699.99,
    category: 'Electronics',
    tags: ['smartphone', 'mobile', 'dual camera', '128GB'],
    variants: [
      { type: 'color', value: 'Black' },
      { type: 'color', value: 'White' },
    ],
    inventory: {
      quantity: 50,
      inStock: true,
    },
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with 12-cup capacity.',
    price: 49.99,
    category: 'Kitchen',
    tags: ['kitchen', 'coffee', 'appliance', 'programmable'],
    variants: [
      { type: 'color', value: 'Black' },
      { type: 'color', value: 'Stainless Steel' },
    ],
    inventory: {
      quantity: 30,
      inStock: true,
    },
  },
];

const customerEmails = [
  'customer1@example.com',
  'customer2@example.com',
  'customer3@example.com',
  'customer4@example.com',
  'customer5@example.com',
];

// Generate random orders
const generateRandomOrders = (productIds: mongoose.Types.ObjectId[]) => {
  const orders = [];
  productIds.forEach((productId) => {
    const numberOfOrders = Math.floor(Math.random() * 5) + 1; // 1 to 5 orders per product
    for (let i = 0; i < numberOfOrders; i++) {
      const order = {
        email:
          customerEmails[Math.floor(Math.random() * customerEmails.length)],
        productId,
        price:
          sampleProducts.find((product) => product._id === productId.toString())
            ?.price || 0,
        quantity: Math.floor(Math.random() * 5) + 1, // Quantity between 1 and 5
      };
      orders.push(order);
    }
  });
  return orders;
};

const feedDatabase = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    await ProductModel.deleteMany({});
    await OrderModel.deleteMany({});

    const insertedProducts = await ProductModel.insertMany(sampleProducts);

    const productIds = insertedProducts.map((product) => product._id);

    const sampleOrders = generateRandomOrders(productIds);
    await OrderModel.insertMany(sampleOrders);

    console.log('Sample data inserted successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error inserting sample data:', err);
    mongoose.disconnect();
  }
};

feedDatabase();
