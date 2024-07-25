import { SVGProps, useState } from "react";

function ClipboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

const CopyButton = ({ passwordValue }: { passwordValue: string }) => {
  const [text, setText] = useState("Copy");

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(passwordValue);
      setText("Copied");

      setTimeout(() => {
        setText("Copy");
      }, 1200);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <ClipboardIcon />
      <p>{text}</p>
    </div>
  );
};

export default CopyButton;
