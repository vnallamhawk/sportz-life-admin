interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`overflow-hidden p-5 shadow-lg ${className ?? ""}`}>
      {children}
    </div>
  );
};

export default Card;
