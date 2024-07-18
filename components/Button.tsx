type TButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
};

export const Button = ({
  onClick,
  children,
  type = 'button',
}: TButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
    >
      {children}
    </button>
  );
};
