import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css"; // استایل‌های پیش‌فرض (اختیاری)

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // راه‌اندازی Lenis
    const lenis = new Lenis({
      duration: 1.2, // مدت زمان اسکرول (عدد کمتر = تندتر)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // منحنی نرم
      orientation: "vertical", // عمودی
      smoothWheel: true, // اسکرول ماوس نرم
      wheelMultiplier: 1, // ضریب چرخش ماوس
      touchMultiplier: 2, // ضریب لمسی
    });

    lenisRef.current = lenis;

    // حلقه رندر برای به‌روزرسانی هر فریم
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // اتصال به اسکرول نرم‌افزار
    lenis.on("scroll", (e) => {
      // می‌توانید هر کاری که می‌خواهید در هر اسکرول انجام دهید
    });

    // پاک‌سازی هنگام unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
