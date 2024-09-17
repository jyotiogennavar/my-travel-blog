import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import styles from "./button.module.css"

const variantStyles = {
  default: styles.default,
  destructive: styles.destructive,
  outline: styles.outline,
  secondary: styles.secondary,
  ghost: styles.ghost,
  link: styles.link,
}

const sizeStyles = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
}

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={`${styles.button} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }