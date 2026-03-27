interface Card {
  title: string;
  about: string;
}

export const Card = ({ title, about }: Card) => {
  return (
    <>
      <div className="border rounded-md dark:border-white border-slate-400 bg-linear-to-br dark:from-slate-500 dark:via-white dark:to-slate-500 from-slate-300 via-slate-500 to-slate-300 shadow-2xl/50 flex items-center justify-center h-24 flex-col p-4">
        <div className="mx-auto">
          <h2 className="dark:text-black  text-neutral-900 text-2xl dark:font-semibold font-medium">{title}</h2>
        </div>
        <div>
          <p className="dark:text-black text-neutral-900 text-md dark:font-semibold font-light">{about}</p>
        </div>
      </div>
    </>
  );
};
