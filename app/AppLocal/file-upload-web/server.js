const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");
const fs = require("fs");

const app = express();

// =====================
// 1. Middleware cơ bản
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "my_super_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// =====================
// 2. Tạo thư mục uploads nếu chưa có
// =====================
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

// =====================
// 3. Kết nối MySQL
// =====================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "fileupload"
});

db.connect(err => {
    if (err) console.error(err);
    else console.log("MySQL Connected");
});

// =====================
// 4. PUBLIC FILE (login)
// =====================
app.use("/Login.css", express.static(path.join(__dirname, "public", "Login.css")));
app.use("/Login.js", express.static(path.join(__dirname, "public", "Login.js")));

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// =====================
// 5. Middleware kiểm tra login
// =====================
function checkAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login.html");
    }
    next();
}

// =====================
// 6. Trang chủ
// =====================
app.get("/", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login.html");
    }

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

// =====================
// 7. Static file cần login
// =====================
app.use("/index.css", checkAuth, express.static(path.join(__dirname, "public", "index.css")));
app.use("/index.js", checkAuth, express.static(path.join(__dirname, "public", "index.js")));
app.use("/upload.png", checkAuth, express.static(path.join(__dirname, "public", "upload.png")));
app.use("/uploads", checkAuth, express.static(path.join(__dirname, "uploads")));

// =====================
// 8. REGISTER
// =====================
app.post("/register", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Missing fields");
    }

    const hash = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users(username,password) VALUES (?,?)",
        [username, hash],
        (err) => {

            if (err) {
                return res.status(400).send("User already exists");
            }

            res.send("Register success");
        }
    );
});

// =====================
// 9. LOGIN
// =====================
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, result) => {

            if (err || result.length === 0) {
                return res.status(401).send("Invalid username or password");
            }

            const match = await bcrypt.compare(password, result[0].password);

            if (!match) {
                return res.status(401).send("Wrong password");
            }

            req.session.user = {
                id: result[0].id,
                username: result[0].username
            };

            res.send("Login success");
        }
    );
});

// =====================
// 10. LOGOUT
// =====================
app.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.redirect("/login.html");
    });

});

// =====================
// 11. USER INFO
// =====================
app.get("/api/userinfo", (req, res) => {

    if (!req.session.user) {
        return res.status(401).send("Unauthorized");
    }

    res.json(req.session.user);

});

// =====================
// 12. Upload file
// =====================
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({ storage });

app.post("/upload", checkAuth, upload.single("file"), (req, res) => {

    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    db.query(
        "INSERT INTO files(originalname,filename) VALUES (?,?)",
        [req.file.originalname, req.file.filename],
        (err) => {

            if (err) return res.status(500).send(err);

            res.json({ success: true });

        }
    );
});

// =====================
// 13. Lấy danh sách file
// =====================
app.get("/api/files", checkAuth, (req, res) => {

    db.query("SELECT * FROM files", (err, result) => {

        if (err) return res.status(500).send(err);

        res.json(result);

    });

});

// =====================
// 14. Xóa file
// =====================
app.delete("/api/files/:filename", checkAuth, (req, res) => {

    const filename = req.params.filename;

    const filepath = path.join(__dirname, "uploads", filename);

    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }

    db.query(
        "DELETE FROM files WHERE filename=?",
        [filename],
        () => {
            res.send("Deleted");
        }
    );
});

// =====================
// 15. Start server
// =====================
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});