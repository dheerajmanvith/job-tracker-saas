import { Inbox } from "lucide-react";

function EmptyState({
  title = "Nothing here yet",
  description = "There's no data to display.",
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
      <Inbox className="mb-4 h-16 w-16 text-muted-foreground" />

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        {description}
      </p>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="mt-6 rounded-lg bg-primary px-5 py-2 text-primary-foreground transition hover:opacity-90"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;