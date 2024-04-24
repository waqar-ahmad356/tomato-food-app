// Importing the jsonwebtoken package
import jwt from 'jsonwebtoken';

// Middleware function to authenticate requests
const authMiddleWare = async (req, res, next) => {
    // Extracting the token from the request headers
    const { token } = req.headers;

    // If token is not provided, return error response
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Please log in again" });
    }

    try {
        // Verifying the token using the secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // Adding the decoded user ID to the request body
        req.body.userId = token_decode.id;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If an error occurs during token verification, log the error and return error response
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Exporting the authMiddleWare function for use in other files
export default authMiddleWare;
