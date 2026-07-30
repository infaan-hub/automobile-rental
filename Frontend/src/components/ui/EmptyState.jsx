import { Inbox } from "lucide-react";

export default function EmptyState({ message = "No data available." }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-muted">
      <Inbox size={40} strokeWidth={1} />
      <p className="text-sm">{message}</p>
    </div>
  );
}
