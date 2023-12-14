import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
/*import ProductModel from "../models/product.model.js";*/

const router = Router();
const controller = new ProductController();

router.get("/", async (req, res) => {

  const user = req.session.user;
  console.log(req.query)
  const {result, group, sort} = await controller.getByPage(req, res);
  res.render("products", {
    user,
    ...buildResponse({ ...result, group, sort }),
  });
  /*const response = buildResponse({ ...result, group, sort });
  res.json(response); */
});

const buildResponse = (data) => {
  return {
    status: "success",
    payload: data.docs.map((product) => product.toJSON()),
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    page: data.page,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevLink: data.hasPrevPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.prevPage
        }${data.group ? `&group=${data.group}` : ""}${
          data.sort ? `&sort=${data.sort}` : ""
        }`
      : "",
    nextLink: data.hasNextPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.nextPage
        }${data.group ? `&group=${data.group}` : ""}${
          data.sort ? `&sort=${data.sort}` : ""
        }`
      : "",
  };
};
export default router;
