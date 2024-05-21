"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./Routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./Routes/orderRoutes"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use('/api/products', productRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to my E-commerce API');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});
exports.default = app;
