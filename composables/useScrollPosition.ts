function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}

export function useScrollPosition() {
  const lastScrollPosition = ref(0);
  const isScrollTop = ref(true);

  const handleScroll = debounce(() => {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    isScrollTop.value = currentScrollPosition === 0;
    lastScrollPosition.value = currentScrollPosition;
  }, 300); // 300ms debounce time

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isScrollTop };
}
