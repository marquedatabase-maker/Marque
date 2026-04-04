export const validateCreateBlog = (req, res, next) => {
  const requiredFields = [
    "title",
    "slug",
    "content",
    "category",
    "status",
    "featuredImage",
    "metaTitle",
    "metaDescription",
  ];

  const missingFields = requiredFields.filter(
    (field) => !req.body[field] || req.body[field].toString().trim() === ""
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  next();
};
