function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}

export function useScrollPosition() {
  const lastScrollPosition = ref(0);
  const isTop = ref(true);

  const handleScroll = debounce(() => {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    isTop.value = currentScrollPosition === 0;
    lastScrollPosition.value = currentScrollPosition;
  }, 300); // 300ms debounce time

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isTop };
}
