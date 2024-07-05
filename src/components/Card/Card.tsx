import { isNotNullOrUndefinedOrEmptyString } from "~/services/booleanServices";
import CardTitle from "./CardTitle";

interface Props {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<Props> = ({ children, title, className }) => {
  return (
    <div className={`p-6 shadow-sm rounded-2xl ${className ?? ""}`}>
      {isNotNullOrUndefinedOrEmptyString(title) && <CardTitle title={title} />}
      {children}
    </div>
  );
};

export default Card;
