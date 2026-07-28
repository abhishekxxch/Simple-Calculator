export const calculate = (req, res) => {
  try {
    const { expression } = req.body;

    if (!expression || typeof expression !== "string") {
      return res.status(400).json({
        success: false,
        message: "Expression Missing",
      });
    }

    const normalizedExpression = expression.trim();

    if (!normalizedExpression) {
      return res.status(400).json({
        success: false,
        message: "Expression Missing",
      });
    }

    if (!/^[0-9+\-*/().\s]+$/.test(normalizedExpression)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Expression",
      });
    }

    const result = Function(`return (${normalizedExpression})`)();

    if (!Number.isFinite(result)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Expression",
      });
    }

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid Expression",
    });
  }
};