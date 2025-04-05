import { isNotNullOrUndefinedOrEmptyString } from "~/services/booleanServices";

interface Props {
    title: string;
    subtitle: string;
    className?: string;
}

const TestCard: React.FC<Props> = ({ title, subtitle, className }) => {
    return (
        <div className={`p-4 shadow-sm rounded-xl bg-white ${className ?? ""}`}>
            {isNotNullOrUndefinedOrEmptyString(title) && (
                <h4 className="text-md font-semibold mb-2">{title}</h4>
            )}
            {isNotNullOrUndefinedOrEmptyString(subtitle) && (
                <p className="text-sm text-gray-600">{subtitle}</p>
            )}
        </div>
    );
};

export default TestCard;
