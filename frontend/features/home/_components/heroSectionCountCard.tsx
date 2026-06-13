
interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function heroSectionCountCard({title, value, icon}: Props) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm sm:text-base text-gray-300">{title}</p>
      </div>
    );
}