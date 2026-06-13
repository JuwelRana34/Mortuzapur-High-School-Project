interface DeviderProps {
  color1?: string;
  color2?: string;
  color3?: string;
}
export default function Devider({
  color1 = "from-transparent",
  color2 = "via-primary/60",
  color3 = "to-transparent",
}: DeviderProps) {
  return (
    //  Divider
    <div
      className={`w-full h-px bg-linear-to-r ${color1} ${color2} ${color3} mb-4 group-hover:bg-blue-50 transition-colors`}
    ></div>
  );
}
