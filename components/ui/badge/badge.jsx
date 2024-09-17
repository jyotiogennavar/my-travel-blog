"use client"
import * as React from "react"
import styles from "./badge.module.css"

const variantStyles = {
  default: styles.default,
  secondary: styles.secondary,
  destructive: styles.destructive,
  outline: styles.outline,
}

function Badge({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div 
      className={`${styles.badge} ${variantStyles[variant]} ${className || ''}`} 
      {...props} 
    />
  )
}

export { Badge }