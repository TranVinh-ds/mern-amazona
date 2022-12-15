import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, request, response, next) => {
  response.status(500).send({ message: err.message });
});

// app.get('/api/products', (request, response) => {
//   response.send(data.products);
// });

// app.get('/api/products/slug/:slug', (request, response) => {
//   const product = data.products.find((x) => x.slug === request.params.slug);
//   if (product) {
//     response.send(product);
//   } else {
//     response.status(404).send({ message: 'Product Not Found' });
//   }
// });

// app.get('/api/products/:id', (request, response) => {
//   const product = data.products.find((x) => x._id === request.params.id);
//   if (product) {
//     response.send(product);
//   } else {
//     response.status(404).send({ message: 'Product Not Found' });
//   }
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
