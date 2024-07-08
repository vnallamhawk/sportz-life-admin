export default function CoachAttendanceCard({
  title,
  count,
  color,
  textColor = "text-neutral-50",
}: {
  title: string;
  count: string;
  color: string;
  textColor?: string;
}) {
  return (
    <div className="flex-1">
      <div className={`${color} mx-2 h-full rounded`}>
        <div className="px-3 py-4">
          <header className={` ${textColor} font-bold `}>{title}</header>
          <div className={` ${textColor} text-4xl font-bold `}>{count}</div>
        </div>
      </div>
    </div>
  );
}
