import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="h-screen bg-[#00aeb0]">{children}</div>;
}
