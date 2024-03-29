import React from "react";
import MuiTypography from "@mui/material/Typography";
import { Tooltip, TooltipPlacement } from "./Tooltip.component";

export function Typography({
  className,
  children,
  variant,
  ellipsis = false,
  tooltip,
  tooltipPlacement,
}: {
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "overline"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
  ellipsis?: boolean;
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement
}) {
  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <MuiTypography className={className} variant={variant} noWrap={ellipsis}>
        {children}
      </MuiTypography>
    </Tooltip>
  );
}
