import Button from "../Button";

export const Steps = ({
  title,
  children,
  stepCount,
  maxCount,
}: {
  title: string;
  children: React.ReactNode;
  stepCount: number;
  maxCount: number;
}) => {
  return (
    <div>
      <div className="text-lg font-bold">{title}</div>
      <div className="h-full">{children}</div>
      {stepCount !== 1 && <Button>Prev</Button>}
      {stepCount !== maxCount && <Button>Next</Button>}
      {stepCount === maxCount && <Button>Finish</Button>}
    </div>
  );
};

export default Steps;
