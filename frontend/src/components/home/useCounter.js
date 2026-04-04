//reusable hook
import { useEffect, useRef, useState } from "react";

const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let start = 0;
    const increment = target / (duration / 16);

    const update = () => {
      start += increment;
      if (start < target) {
        setCount(Math.ceil(start));
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    update();
  }, [target, duration]);

  return count;
};

export default useCounter;
