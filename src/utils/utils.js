// utils/utils.js
export const scrollToSlide = (index, slideRefs) => {
  // Ensure index is valid
  if (index < 0 || index >= slideRefs.length) {
    console.warn(`Invalid slide index: ${index}`);
    return;
  }

  // Ensure the ref exists and has a current element
  if (!slideRefs[index] || !slideRefs[index].current) {
    console.warn(`Slide ref ${index} not found or not mounted`);
    return;
  }

  try {
    slideRefs[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } catch (error) {
    console.error(`Error scrolling to slide ${index}:`, error);
  }
};
