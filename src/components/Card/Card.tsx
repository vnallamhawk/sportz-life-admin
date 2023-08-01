import { isNullOrUndefinedOrEmptyString } from "~/services/booleanServices";

interface Props {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<Props> = ({ children, title, className }) => {
  return (
    <div className={`p-10 shadow-lg ${className ?? ""}`}>
      {!isNullOrUndefinedOrEmptyString(title) && (
        <div className="mb-3 text-lg font-bold">{title}</div>
      )}
      {children}
    </div>
  );
};

export default Card;
