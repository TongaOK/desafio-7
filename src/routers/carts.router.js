import { Router } from "express";
import CartModel from "../models/cart.model.js";
import CartController from "../controllers/carts.controller.js";

const router = Router();
const controller = new CartController();

router.get('/:cid', async (req, res) => {
  try {
    const {cart, products} = await controller.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.render('carts', {products: products});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cargar el carrito' });
  }
}); // YA ESTA

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const result = await controller.deleteProductFromCart(req.params.cid, req.params.pid);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' });
  }
}); // REVISAR


router.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const { products } = req.body;

  try {
    const result = await controller.updateCart(cartId, products);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Error al actualizar el carrito' });
  }
}); //REVISAR

router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const newQuantity = req.body.quantity;

  try {
    const result = await controller.updateProductQuantity(cartId, productId, newQuantity);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' });
  }
}); //REVISAR

router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const result = await controller.deleteAllProductsFromCart(cartId);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Error interno del servidor' });
  }
}); //REVISAR



export default router;
