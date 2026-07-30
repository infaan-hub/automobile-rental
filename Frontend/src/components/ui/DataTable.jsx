import EmptyState from "./EmptyState";
import Loader from "./Loader";

export default function DataTable({ columns = [], rows = [], loading, emptyMessage, rowKey = "id", onRowClick }) {
  if (loading) return <Loader />;
  if (!rows || rows.length === 0) return <EmptyState message={emptyMessage} />;

  return (
    <div className="grid gap-3">
      {rows.map((row) => (
        <div
          key={row[rowKey]}
          onClick={() => onRowClick?.(row)}
          className={`grid items-center gap-4 p-4 bg-white rounded-2xl border border-border transition-all duration-200 hover:shadow-md hover:border-primary/20 ${onRowClick ? "cursor-pointer" : ""}`}
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {columns.map((col) => (
            <div key={col.key}>
              {col.render ? col.render(row[col.key], row) : (
                <span className={col.className || "text-sm"}>{row[col.key]}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
