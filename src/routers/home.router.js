import { Router } from "express";
const router = Router();

router.get("/", async (req, res) => {
  res.redirect('/api/sessions/login')
});

export default router;
