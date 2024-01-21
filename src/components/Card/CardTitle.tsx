export default function CardTitle({ title }: { title: string }) {
  return (
    <div className="self-center font-['Teko'] text-2xl font-medium uppercase  leading-7 text-neutral-700">
      {title}
    </div>
  );
}
