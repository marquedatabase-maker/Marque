
export const validateCreateCourse = (req, res, next) => {
  const requiredFields = [
    "title",
    "category",
    "level",
    "duration",
    "aboutCourse",
    "shortAbout",
    "heroImage",
  ];

  const missing = requiredFields.filter((field) => !req.body[field]);

  if (missing.length) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(", ")}`,
    });
  }

  next();
};
