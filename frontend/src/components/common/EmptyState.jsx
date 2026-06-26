const EmptyState = ({ imageSrc, imageAlt, title, message, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt || ""}
          className="w-40 h-40 object-contain opacity-70 animate-bounce"
        />
      )}

      <h2 className="text-xl font-semibold text-gray-800 text-center">{title}</h2>

      {message && (
        <p className="text-gray-500 text-center max-w-xs">{message}</p>
      )}

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
