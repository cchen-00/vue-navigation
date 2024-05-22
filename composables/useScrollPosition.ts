export function useScrollPosition() {
  const lastScrollPosition = ref(0);
  const isTop = ref(true);

  const handleScroll = () => {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    isTop.value = currentScrollPosition === 0;
    lastScrollPosition.value = currentScrollPosition;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isTop };
}
