class Cookie {
    static setTokenCookie(res, token) {
        res.cookie("token", token, {
            httpOnly: true,       // Prevents client-side JS from accessing cookie
            secure: process.env.NODE_ENV === "production", // HTTPS in production
            sameSite: "strict",   // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    }

    static clearTokenCookie(res) {
        res.clearCookie("token");
    }
}

export default Cookie;
