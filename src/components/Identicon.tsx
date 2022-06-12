import { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";

type Props = {
  curAcc: string;
};

export default function Identicon({ curAcc }: Props) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (curAcc && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(curAcc.slice(2, 10), 16)));
    }
  }, [curAcc]);

  return <div className="ml-2 mt-px h-4 w-4 rounded-2xl" ref={ref as any} />;
}
