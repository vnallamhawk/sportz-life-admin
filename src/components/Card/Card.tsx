interface Props {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<Props> = ({ children, title, className }) => {
  return (
    <div className={`overflow-hidden p-5 shadow-lg ${className ?? ""}`}>
      <div className="text-lg font-bold">{title}</div>
      {children}
    </div>
  );
};

export default Card;
