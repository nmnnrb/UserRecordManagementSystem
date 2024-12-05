import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Predefined admin credentials
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

// Login controller logic
 const loginAdmin = async (req, res) => {
  const { f_Email, f_Password } = req.body;

  // Validate admin email and password
  if (f_Email !== adminEmail || f_Password !== adminPassword) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  try {
    const token = jwt.sign({ email: f_Email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send the token to the frontend
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error("Error in loginAdmin controller:", error);
    res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
};

export default loginAdmin;
