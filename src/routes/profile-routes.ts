import { Router } from "express";

import { authMiddleware } from "../middlewares/auth-middleware";

const profileRoutes = Router();

profileRoutes.get(
  "/me",
  authMiddleware,
  (req, res) => {
    return res.json({
      message: "Authenticated user",
      user: req.user,
    });
  }
);

export default profileRoutes;