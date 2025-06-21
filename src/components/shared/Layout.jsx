import { forwardRef } from "react";
import clsx from "clsx";

export const Layout = forwardRef(
  ({ children, className = "", showBar = false, barContent = null }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "min-h-screen flex flex-col",
          className
        )}
      >
        {showBar && barContent && (
          <div className="fixed top-0 left-0 right-0 z-50">
            {barContent}
          </div>
        )}
        <div className={clsx(
          "flex-1 flex flex-col justify-center items-center transition-all duration-500",
          showBar && barContent ? "pt-20" : ""
        )}>
          {children}
        </div>
      </div>
    );
  }
);