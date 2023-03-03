const User = require('../database/models/user.model');
const mailer = require('../utils/mailer');
const bcrypt = require('bcryptjs');

module.exports.sendOTP = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Generate OTP
    const OTP = Math.floor(100000 + Math.random() * 900000);

    user.OTP = OTP;
    user.OTPExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    // Send OTP to user's email
    const subject = 'Reset Password';
    const message = `Your OTP is ${OTP}. It will expire in 10 minutes.`;
    const html = `<html>
    <head>
        <style>
            .container {    
                width: 100%;
                height: 100%;
                background-color: #f5f5f5;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card {
                width: 400px;
                height: 400px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .card__title {
                font-size: 2rem;
                font-weight: 500;
                margin-bottom: 1rem;
            }
            .card__message {
                font-size: 1.2rem;
                font-weight: 400;
                margin-bottom: 1rem;
            }
            .card__otp {
                font-size: 2rem;
                font-weight: 500;
                margin-bottom: 1rem;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="card">  
                <div class="card__title">
                    Outfit
                </div>
                <div class="card__message">
                    Your OTP is
                </div>
                <div class="card__otp">
                    ${message}
                </div>
            </div>
        </div>
    </body>    
    </html>`;

    await mailer({ email, subject, message, html });

    res.status(200).json({
      status: 'success',
      message: 'OTP sent to your email',
    });
  } catch (error) {}
};

module.exports.reset_password = async (req, res, next) => {
  const { email, OTP, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Password and confirm password must be same',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }


    console.log(typeof user.OTP, typeof OTP)
    if (user.OTP !== parseInt(OTP)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid OTP',
      });
    }

    if (user.OTPExpires < new Date()) {
      user.OTP = null;
      user.OTPExpires = new Date();

      await user.save();

      return res.status(400).json({
        status: 'error',
        message: 'OTP expired',
      });
    }

    user.password = await bcrypt.hash(password, 12);

    user.OTP = null;
    user.OTPExpires = new Date();

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
