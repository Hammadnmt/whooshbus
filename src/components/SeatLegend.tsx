const SeatLegend = () => {
  const legends = [
    {
      color: "bg-emerald-100 border border-emerald-300",
      text: "text-emerald-700",
      label: "Available",
    },
    {
      color: "bg-red-100 border border-red-300",
      text: "text-red-700",
      label: "Booked",
    },
    {
      color: "bg-amber-100 border border-amber-300",
      text: "text-amber-700",
      label: "Held",
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 mb-6 justify-center">
      {legends.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100"
        >
          <div className={`w-5 h-5 rounded-md ${item.color}`} />
          <span className={`text-sm font-medium ${item.text}`}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;
