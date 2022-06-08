import  React from 'react'

function useIntervalCountDown(countNum) {
    const [num, setNum] = useState(countNum);
    const [timer, setTimer] = useState(null);
    useEffect(() => {///
      if (num === 0 && timer) {
        clearInterval(timer);
      }
      if (!timer) {
        let timeId = setInterval(() => {
          setNum(num - 1);
        }, 1000);
        setTimer(timeId); 1000);
      }
      return () => {
        if (timer) {
          clearInterval(timer);
          setTimer(null);
        }
      };
    }, [num, timer]);
    return num;
  }