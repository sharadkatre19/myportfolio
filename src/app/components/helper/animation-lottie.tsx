"use client"

import Lottie, { LottieOptions } from "lottie-react";

interface AnimationLottieProps {
  animationPath: string; // Lottie animation data object
  width?: string | number;
}

const AnimationLottie: React.FC<AnimationLottieProps> = ({ animationPath, width }) => {
  const defaultOptions: LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width: width || '95%',
    }
  };

  return (
    <Lottie {...defaultOptions} />
  );
};

export default AnimationLottie;