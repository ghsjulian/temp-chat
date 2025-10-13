const nodemailer = require("nodemailer");

const sendMail = async (name, toEmail) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let mailOptions = {
            from: "LetsTalk'ghsgobindo@gmail.com'",
            to: toEmail,
            subject: "Welcome To Let's Talk !",
            text: "Your let's talk account has been created successfully.",
            html: `
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
    </head>
    <body
        style="
            margin: 0;
            padding: 0;
            font-family: &quot;Helvetica Neue&quot;, Arial, sans-serif;
            background-color: #e9ecef;
        "
    >
        <table
            role="presentation"
            style="
                width: 100%;
                border-collapse: collapse;
                background-color: #e9ecef;
                padding: 40px 0;
            "
        >
            <tr>
                <td align="center">
                    <table
                        role="presentation"
                        style="
                            width: 100%;
                            max-width: 600px;
                            border-collapse: collapse;
                            background-color: #ffffff;
                            border-radius: 12px;
                            overflow: hidden;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        "
                    >
                        <!-- Header with Gradient -->
                        <tr>
                            <td
                                style="
                                    padding: 40px 30px;
                                    background: linear-gradient(
                                        135deg,
                                        #6b48ff 0%,
                                        #00ddeb 100%
                                    );
                                    text-align: center;
                                "
                            >
                                <h1
                                    style="
                                        margin: 0;
                                        font-size: 28px;
                                        font-weight: 700;
                                        color: #ffffff;
                                        text-transform: uppercase;
                                        letter-spacing: 1px;
                                    "
                                >
                                    Welcome to Our Community
                                </h1>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px">
                                <h2
                                    style="
                                        font-size: 22px;
                                        font-weight: 600;
                                        color: #1a1a1a;
                                        margin: 0 0 20px;
                                    "
                                >
                                    Hello, <span style="color:#f00">${name}</span>!
                                </h2>
                                <p
                                    style="
                                        font-size: 16px;
                                        color: #4a4a4a;
                                        line-height: 1.7;
                                        margin: 0 0 20px;
                                    "
                                >
                                    We're thrilled to have you on board! Our
                                    newsletter is packed with the latest news,
                                    exclusive offers, and helpful tips to
                                    enhance your experience. Get ready for
                                    exciting updates delivered straight to your
                                    inbox.
                                </p>
                                <p
                                    style="
                                        font-size: 16px;
                                        color: #4a4a4a;
                                        line-height: 1.7;
                                        margin: 0 0 20px;
                                    "
                                >
                                    Have ideas or feedback? We're all ears!
                                    Connect with us to share your thoughts.
                                </p>
                                <!-- Call to Action Button -->
                                <table
                                    role="presentation"
                                    style="
                                        width: 100%;
                                        border-collapse: collapse;
                                    "
                                >
                                    <tr>
                                        <td
                                            align="center"
                                            style="padding: 20px 0"
                                        >
                                            <a
                                                target="_blank"
                                                href="https://lets-tak.onrender.com"
                                                style="
                                                    display: inline-block;
                                                    padding: 14px 30px;
                                                    background: linear-gradient(
                                                        135deg,
                                                        #6b48ff 0%,
                                                        #00ddeb 100%
                                                    );
                                                    color: #ffffff;
                                                    text-decoration: none;
                                                    font-size: 16px;
                                                    font-weight: 600;
                                                    border-radius: 25px;
                                                    transition: background 0.3sease;">Explore Now</a>
                                        </td>
                                    </tr>
                                </table>
                                <!-- Feature Section -->
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td
                                style="
                                    padding: 30px;
                                    background-color: #2c2c2c;
                                    text-align: center;
                                "
                            >
                                <p
                                    style="
                                        font-size: 14px;
                                        color: #ffffff;
                                        margin: 0 0 10px;
                                    "
                                >
                                    &copy; 2025 Let's Talk. All rights reserved.
                                </p>
                                <p
                                    style="
                                        font-size: 14px;
                                        color: #ffffff;
                                        margin: 0;
                                    "
                                >
                                    <a
                                        href="#"
                                        style="
                                            color: #00ddeb;
                                            text-decoration: none;
                                            margin: 0 10px;
                                        "
                                        >Unsubscribe</a
                                    >
                                    |
                                    <a
                                        href="email:ghsjulian@outlook.com"
                                        style="
                                            color: #00ddeb;
                                            text-decoration: none;
                                            margin: 0 10px;
                                        "
                                        >Contact Us</a
                                    >
                                    |
                                    <a
                                        href="#"
                                        style="
                                            color: #00ddeb;
                                            text-decoration: none;
                                            margin: 0 10px;
                                        "
                                        >Privacy Policy</a
                                    >
                                </p>
                                <!-- Social Icons -->
                                <table
                                    role="presentation"
                                    style="
                                        width: 100%;
                                        border-collapse: collapse;
                                        margin-top: 15px;
                                    "
                                >
                                    <tr>
                                        <td align="center">
                                            <a
                                                target="_blank"
                                                href="http://web.facebook.com/ghs.julian.85"
                                                style="margin: 0 8px ; text-decoration: none"
                                            >
                                                <img
                                                    src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-1024.png"
                                                    alt="Facebook"
                                                    style="max-width: 30px"
                                                />
                                            </a>
                                            <a href="#" style="margin: 0 8px; text-decoration: none">
                                                <img
                                                    src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_twitter-1024.png"
                                                    alt="Twitter"
                                                    style="max-width: 30px"
                                                />
                                            </a>
                                            <a
                                                target="_blank"
                                                href="http://instagram.com/ghs.julian.85"
                                                style="margin: 0 8px; text-decoration: none"
                                            >
                                                <img
                                                    src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-1024.png"
                                                    alt="Instagram"
                                                    style="max-width: 30px"
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>`
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(`\n[!] Error While Sending Mail To ${name} - `, error);
        return false;
    }
};

module.exports = sendMail;
