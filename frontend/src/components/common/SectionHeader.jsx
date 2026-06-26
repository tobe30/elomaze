import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const SectionHeader = ({
  title,
  subtitle,
  to,
  actionLabel = "View all",
  compact = false,
}) => {
  const ActionIcon = compact ? ChevronRight : ArrowRight;

  return (
    <div className="mb-8 flex items-center justify-between px-2">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 mt-1 text-[15px]">{subtitle}</p>
        )}
      </div>

      {to ? (
        <Link
          to={to}
          className="flex items-center text-sm gap-1 text-primary font-semibold hover:gap-2 transition-all duration-300"
        >
          <span>{actionLabel}</span>
          <ActionIcon className="w-4 h-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 text-sm font-bold text-gray-900 hover:underline cursor-pointer">
          {actionLabel}
          {compact && <ActionIcon className="w-5 h-5 text-gray-400" />}
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
