import passport from "passport";

export default class UserController {
    async getProfile(req, res) {
        if (!req.session.user) {
          return res.redirect("/api/sessions/login");
        }
        console.log(req.session.user);
        res.render("profile", { title: "Profile", user: req.session.user });
      }
    
      // Función para manejar el endpoint GET /login
    async getLogin(req, res) {
        if (req.session.user) {
          return res.redirect("/api/sessions/profile");
        }
        res.render("login", { title: "Login" });
      }
    
      // Función para manejar el endpoint GET /register
    async getRegister(req, res) {
        if (req.session.user) {
          return res.redirect("/api/sessions/profile");
        }
        res.render("register", { title: "Register" });
      }
    
      // Función para manejar el endpoint POST /register
    async postRegister(req, res, next) {
        passport.authenticate('register', { failureRedirect: '/register' })(req, res, async () => {
          res.redirect('/api/sessions/login');
        });
      }
    
      // Función para manejar el endpoint POST /login
    async postLogin(req, res, next) {
        passport.authenticate('login', { failureRedirect: '/login' })(req, res, async () => {
          req.session.user = req.user;
          res.redirect('/api/sessions/profile');
        });
      }
    
      // Función para manejar el endpoint GET /logout
    async getLogout(req, res) {
        req.session.destroy((error) => {
          res.redirect("/api/sessions/login");
        });
      }
    
      // Función para manejar el endpoint GET /github
    async getGitHub(req, res, next) {
        passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
      }
    
      // Función para manejar el endpoint GET /github/callback
    async getGitHubCallback(req, res, next) {
        passport.authenticate("github", { failureRedirect: "/login" })(req, res, async () => {
          req.session.user = req.user;
          res.redirect('/');
        });
      }
}