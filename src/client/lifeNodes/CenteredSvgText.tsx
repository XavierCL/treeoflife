import { useEffect, useRef } from "react";

type CenteredSvgTextProps = {
  parentWidth?: number;
  textProps?: Omit<React.SVGProps<SVGTextElement>, "children" | "ref">;
  children: React.ReactNode;
};

export const CenteredSvgText = ({
  parentWidth,
  textProps,
  children,
}: CenteredSvgTextProps) => {
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (!textRef.current || !parentWidth) return;

    const textBoundingBox = textRef.current.getBoundingClientRect();

    const translation = `${parentWidth / 2 - textBoundingBox.width / 2},${0}`;

    textRef.current.setAttribute("transform", `translate(${translation})`);
  }, [textRef, parentWidth]);

  return (
    <text {...textProps} ref={textRef}>
      {children}
    </text>
  );
};
