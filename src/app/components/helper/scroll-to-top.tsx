"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const DEFAULT_BTN_CLS: string =
  "fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-[#9fccfa] to-[#0974f1] to-[#0974f1] p-4 hover:text-xl transition-all duration-300 ease-out";
const SCROLL_THRESHOLD: number = 50;

const ScrollToTop: React.FC = () => {
  const [btnCls, setBtnCls] = useState<string>(DEFAULT_BTN_CLS);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setBtnCls(DEFAULT_BTN_CLS.replace(" hidden", ""));
      } else {
        setBtnCls(DEFAULT_BTN_CLS + " hidden");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClickBtn = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={btnCls} onClick={onClickBtn}>
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;