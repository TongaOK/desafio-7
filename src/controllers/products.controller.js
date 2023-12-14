import ProductModel from "../models/product.model.js";

export default class ProductController {
    async getAllProducts(req, res) {
        const products = await productModel.find();
        res.json(products);
    }

    async getByPage(req, res) {
        const { page = 1, limit = 10, group, sort } = req.query; // sort: asc | desc
        const opts = { page, limit, sort: { price: sort || "asc" } };
        const criteria = {};
        if (group) {
          criteria.group = group;
        }
        const result = await ProductModel.paginate(criteria, opts);
        return {result, group, sort}
    }

    async getProductById(req, res) {
        const product = await productModel.findById(req.params.id);
        res.json(product);
    }

    async createProduct(req, res) {
        const product = new productModel(req.body);
        await product.save();
        res.json(product);
    }

    async updateProduct(req, res) {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    }

    async deleteProduct(req, res) {
        await productModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    }
}