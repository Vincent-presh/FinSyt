export const BtnUI = ({
  type,
  icon,
  title,
  onClick,
  isLoader,
  isLoading,
}: any) => {
  const btnstyle =
    type == "primary"
      ? "px-3 bg-primaryLight w-full py-[0.2rem] rounded-lg hover:bg-transparent border border-seconadaryLight hover:text-[#494848] text-white"
      : " px-3 border-2 border-seconadaryLight py-[0.5rem] rounded-lg ";
  const titlestyle =
    type == "primary"
      ? "font-medium text-base py-1 "
      : " text-[#494848] text-sm hover:text-[#494848]";

  return (
    <button onClick={onClick} className={btnstyle}>
      <div className="flex items-center gap-3 justify-center">
        {icon ? <div className="w-5 h-auto">{icon}</div> : null}
        <div className={titlestyle}>{title}</div>
      </div>
    </button>
  );
};
