
const Button = {
    // The styles all button have in common
    baseStyle: {
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    // Two sizes: sm and md
    sizes: {
      sm: {
        fontSize: "12px",
        padding: "16px",
      },
      md: {
        fontSize: "16px",
        padding: "24px",
      },
    },
    // Two variants: outline and solid
    variants: {
      danger: {
          bgColor: 'red.500',
          color: 'white'
      },
      outline: {
        border: "2px solid",
        borderColor: "green.500",
      },
      solid: {
        bg: "green.500",
        color: "white",
      },
    },
    // The default size and variant values
    defaultProps: {
      size: "md",
      variant: "danger",
    },
  }

export default Button;
