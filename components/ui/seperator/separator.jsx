"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import styles from "./separator.module.css"

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={`${styles.separator} ${styles[orientation]} ${className || ''}`}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }