import { cva, type VariantProps } from "class-variance-authority";
import React, { createElement, CSSProperties, PropsWithChildren } from "react";
import { cn } from "../utils";

const textVariant = cva("text-md font-md", {
  variants: {
    variant: {
      primary: "",
      secondary: "text-gray-500",
    },
    size: {
      "3xs": "text-[11px] leading-[18px]",
      "2xs": "text-xs leading-[18px]",
      xs: "text-[13px] leading-5",
      sm: "text-sm leading-5",
      md: "text-base leading-6",
      lg: "text-lg leading-7",
      xl: "text-xl leading-7 tracking-tight",
      "2xl": "text-2xl leading-9 tracking-tight",
      "display-sm": "text-[28px] tracking-tight",
      "display-md": "text-3xl tracking-tight",
      "display-lg": "text-4xl tracking-tight",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
  },
  defaultVariants: {
    // variant: "primary",
    size: "md",
    weight: "regular",
  },
});

type TextProps = PropsWithChildren<{
  id?: string;
  as?: HTMLParagraphElement["tagName"] | HTMLSpanElement["tagName"];
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}> &
  VariantProps<typeof textVariant>;

type TextType = HTMLParagraphElement | HTMLHeadingElement | HTMLSpanElement;

/**
 * @example
 * <Text variant={'error'} size={'lg'} weight={'medium'} />
 */
const Text = React.forwardRef<TextType, TextProps>(
  ({ as, className, style, variant, size, weight, ...props }, ref) => {
    return createElement(
      as ?? "span",
      {
        ref,
        className: cn(textVariant({ variant, size, weight, className })),
        style,
        ...props,
      },
      props.children
    );
  }
);

Text.displayName = "Text";

export { Text };
