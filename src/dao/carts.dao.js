import CartModel from "../models/cart.model.js";

class CartDAO {
  async findById(cid) {
    try {
      const cart = await CartModel.findById(cid).populate("products.product");
      if (!cart) {
        return { cart: undefined };
      }
      const products = cart.products.map((product) => product.toJSON());
      return { cart: cart.toJSON(), products };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Error interno del servidor' };
    }
  }

  async deleteProduct(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw { status: 404, message: 'Carrito no encontrado' };
      }

      const productIndex = cart.products.findIndex(
        (product) => product.product.toString() === pid
      );
      if (productIndex === -1) {
        throw { status: 404, message: 'Producto no encontrado en el carrito' };
      }

      cart.products.splice(productIndex, 1);
      await cart.save();

      return { status: 200, message: 'Producto eliminado del carrito' };
    } catch (error) {
      console.error(error);
      return { status: error.status || 500, message: error.message || 'Error interno del servidor' };
    }
  }

  async updateCart(cartId, newProducts) {
    try {
      const cart = await CartModel.findById(cartId).populate("products.product");
      if (!cart) {
        throw { status: 404, message: 'Carrito no encontrado' };
      }

      cart.products = newProducts;
      await cart.save();

      return { status: 200, message: 'Carrito actualizado con nuevos productos' };
    } catch (error) {
      console.error(error);
      return { status: error.status || 500, message: error.message || 'Error al actualizar el carrito' };
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw { status: 404, message: 'Carrito no encontrado' };
      }

      const product = cart.products.find(
        (product) => product.product.toString() === productId
      );

      if (!product) {
        throw { status: 404, message: 'Producto no encontrado en el carrito' };
      }

      product.quantity = newQuantity;
      await cart.save();

      return { status: 200, message: 'Cantidad del producto actualizada en el carrito' };
    } catch (error) {
      console.error(error);
      return { status: error.status || 500, message: error.message || 'Error interno del servidor' };
    }
  }

  async deleteAllProducts(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw { status: 404, message: 'Carrito no encontrado' };
      }

      cart.products = [];
      await cart.save();

      return { status: 200, message: 'Todos los productos eliminados del carrito' };
    } catch (error) {
      console.error(error);
      return { status: error.status || 500, message: error.message || 'Error interno del servidor' };
    }
  }
}

export default new CartDAO();
