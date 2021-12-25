import classnames, { Argument } from "classnames";
import tailwind from "tailwind-rn";

export const styles = (...args: Argument[]) => tailwind(classnames(args));

export default styles;
