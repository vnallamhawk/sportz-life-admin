import { isNotNullOrUndefinedOrEmptyString } from "~/services/booleanServices";
import CardTitle from "./CardTitle";

interface Props {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<Props> = ({ children, title, className }) => {
  return (
    <div
      className={`p-10 shadow-lg ${
        className ?? ""
      } dark:rounded-md dark:border-2 dark:border-white`}
    >
      {isNotNullOrUndefinedOrEmptyString(title) && <CardTitle title={title} />}
      {children}
    </div>
  );
};

export default Card;
