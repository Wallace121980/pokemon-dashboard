type TButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button = ({ onClick, children }: TButtonProps) => {
  return (
    <button
      onClick={onClick}
      className=" ml-2 bg-blue-500 text-white p-2 rounded"
    >
      {children}
    </button>
  );
};
