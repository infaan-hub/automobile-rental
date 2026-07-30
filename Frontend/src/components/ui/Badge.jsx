const colors = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  red: "bg-red-50 text-red-700 border-red-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function Badge({ children, color = "gray", className = "" }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colors[color] || colors.gray} ${className}`}>
      {children}
    </span>
  );
}
