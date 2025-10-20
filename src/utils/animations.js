export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotation,
  firstTarget,
  secondTarget,
  animationProps,
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotation,
    duration: 1,
    ease: 'power2.inOut',
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut',
    },
    '<',
  );
};
