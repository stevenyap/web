import React from "react"

export const AlertError: React.FC<{ className?: string }> = ({ className }) => (
  <img
    className={className}
    src={"/assets/alert/error.svg"}
  />
)

export const AlertLoading: React.FC<{ className?: string }> = ({
  className,
}) => (
  <img
    className={className}
    src={"/assets/alert/loading.svg"}
  />
)

export const AlertSuccess: React.FC<{ className?: string }> = ({
  className,
}) => (
  <img
    className={className}
    src={"/assets/alert/success.svg"}
  />
)
