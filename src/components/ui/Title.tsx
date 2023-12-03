export const Title = ({title, question, align}: any) => {
  return (
    <div className="max-w-[15.8125rem] space-y-4">
      <div className="w-full">
        <p
          className={
            align != "center"
              ? "font-semibold xl:text-base  text-[#1E1E1E] "
              : "font-semibold xl:text-base  text-[#1E1E1E] text-center"
          }
        >
          {title}
        </p>
      </div>
      <div>
        <p
          className={
            align != "center"
              ? "text-[#898989] text-sm"
              : " text-[#898989] text-sm text-center"
          }
        >
          {question}
        </p>
      </div>
    </div>
  );
};
