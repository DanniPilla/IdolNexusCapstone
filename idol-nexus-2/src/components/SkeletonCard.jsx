const SkeletonCard = () => {
  return (
    <div className="block max-w-sm bg-white border rounded-lg p-4 shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded"></div>
      <div className="p-4 bg-pink-300 rounded-b-lg space-y-3">
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard