import ProductModel from "../models/product.model.js";

class ProductDAO {
  async getAllProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Error interno del servidor' };
    }
  }

  async getByPage(req) {
    try {
      const { page = 1, limit = 10, group, sort } = req.query;
      const opts = { page, limit, sort: { price: sort || 'asc' } };
      const criteria = {};
      if (group) {
        criteria.group = group;
      }
      const result = await ProductModel.paginate(criteria, opts);
      return { result, group, sort };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Error interno del servidor' };
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Error interno del servidor' };
    }
  }

  async createProduct(req) {
    try {
      const product = new ProductModel(req.body);
      await product.save();
      return product;
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Error interno del servidor' };
    }
  }

  async updateProduct(req) {
    try {
      const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return product;
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Error interno del servidor' };
    }
  }

  async deleteProduct(id) {
    try {
      await ProductModel.findByIdAndDelete(id);
      return { status: 200, message: 'Producto eliminado exitosamente' };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Error interno del servidor' };
    }
  }
}

export default new ProductDAO();