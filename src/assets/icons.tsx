import React from "react";
import { twMerge } from "tailwind-merge";

import { ReactComponent as ArrowRightIcon } from "@/assets/arrow-right.svg";
import { ReactComponent as ArrowLeftIcon } from "@/assets/arrow-left.svg";

type SVGProps = React.SVGProps<SVGSVGElement>;

const createIcon =
  (Icon: React.FC<SVGProps>): React.FC<SVGProps> =>
  ({ className, ...props }) =>
    <Icon className={twMerge("w-4", className)} {...props} />;

const ArrowLeft = createIcon(ArrowLeftIcon);
const ArrowRight = createIcon(ArrowRightIcon);

export default { ArrowLeft, ArrowRight };
