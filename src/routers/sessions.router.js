import { Router } from "express";
import UserController from "../controllers/sessions.controller.js";

const router = Router();

// En tu enrutador
const controller = new UserController();

router.get("/profile", (req, res) => controller.getProfile(req, res));
router.get("/login", (req, res) => controller.getLogin(req, res));
router.get("/register", (req, res) => controller.getRegister(req, res));
router.post("/register", (req, res, next) => controller.postRegister(req, res, next));
router.post("/login", (req, res, next) => controller.postLogin(req, res, next));
router.get("/logout", (req, res) => controller.getLogout(req, res));
router.get("/github", (req, res, next) => controller.getGitHub(req, res, next));
router.get("/github/callback", (req, res, next) => controller.getGitHubCallback(req, res, next));


export default router;
