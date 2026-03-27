interface Input {
  placeholder: string;
  label: string;
  id?: string;
  name?: string;
  value?: string;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const Input = ({
  placeholder,
  value,
  type,
  label,
  id,
  name,
  onBlur,
  onChange,
}: Input) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 ">
        <div className="mx-auto flex flex-col gap-1">
          <label className="text-md dark:text-white text-black" htmlFor={label}>
            {label}
          </label>
          <input
            className=" w-[20vw] border dark:bg-white dark:text-black text-black border-black rounded-lg placeholder:text-neutral-700 p-1"
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        </div>
      </div>
    </>
  );
};
