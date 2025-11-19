const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Customer = require("../models/Customer");

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
const TOKEN_EXPIRES = "7d";

// signup
const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    let existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already used" });

    const user = new User({ name, email, role: role || "customer" });
    await user.setPassword(password);
    await user.save();

    // if customer, create linked Customer profile
    let customerProfile = null;
    if (user.role === "customer") {
      customerProfile = await Customer.create({ name, email });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, customerId: customerProfile?._id },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES }
    );
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
      customerId: customerProfile?._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await user.validatePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    // try find customer profile
    const customer = await Customer.findOne({ email });

    const token = jwt.sign(
      { userId: user._id, role: user.role, customerId: customer?._id },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES }
    );
    res.json({
      token,
      user: { _id: user._id, email: user.email, role: user.role },
      customerId: customer?._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { signUp, login };
