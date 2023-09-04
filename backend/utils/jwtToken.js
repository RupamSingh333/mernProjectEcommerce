// Create Token and saving in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  // console.log(token);

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Include the avatar in the user object in the response
  const userResponse = {
    _id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
    avatar: {
      data: user.avatar.data.toString("base64"), // Convert Buffer to base64 string
      contentType: user.avatar.contentType,
    },
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: userResponse,
    token,
  });
};

module.exports = sendToken;
