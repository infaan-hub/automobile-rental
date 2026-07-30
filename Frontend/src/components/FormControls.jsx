const icons = {
  username: "\u{1F464}",
  email: "\u2709",
  password: "\u{1F512}",
  phone: "\u260E",
  location: "\u{1F4CD}",
  date: "\u{1F4C5}",
  name: "\u{1F3F7}",
  description: "\u{1F4DD}",
  image: "\u{1F5BC}",
};

function getIcon(label, type) {
  if (type === "textarea") return "\u270F";
  const key = (label || "").toLowerCase();
  if (key.includes("username") || key.includes("name")) return icons.username;
  if (key.includes("email")) return icons.email;
  if (key.includes("password")) return icons.password;
  if (key.includes("phone")) return icons.phone;
  if (key.includes("location") || key.includes("pickup") || key.includes("return")) return icons.location;
  if (key.includes("date")) return icons.date;
  if (key.includes("image") || key.includes("photo") || key.includes("picture")) return icons.image;
  if (key.includes("description") || key.includes("detail") || key.includes("notes") || key.includes("note")) return icons.description;
  if (key.includes("name")) return icons.name;
  return "\u2726";
}

export function Field({ label, value, onChange, type = "text" }) {
  return (
    <div className="field">
      <label className="text-xs font-semibold text-muted tracking-wide uppercase">{label}</label>
      <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-border bg-white/90">
        <b className="text-xs w-4 text-center text-muted">{getIcon(label)}</b>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-sm font-medium"
          placeholder={label}
        />
      </div>
    </div>
  );
}

export function Area({ label, value, onChange }) {
  return (
    <div className="field">
      <label className="text-xs font-semibold text-muted tracking-wide uppercase">{label}</label>
      <div className="flex gap-2 p-3 rounded-2xl border border-border bg-white/90 min-h-[84px]">
        <b className="text-xs text-muted shrink-0 mt-0.5">{getIcon(label, "textarea")}</b>
        <textarea
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-sm font-medium resize-y"
          placeholder={label}
        />
      </div>
    </div>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <div className="field">
      <label className="text-xs font-semibold text-muted tracking-wide uppercase">{label}</label>
      <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-border bg-white/90">
        <b className="text-xs w-4 text-center text-muted">{getIcon(label)}</b>
        <select value={value} onChange={onChange} className="w-full bg-transparent outline-none text-sm font-medium appearance-none cursor-pointer">
          {options.map(([val, lbl]) => (
            <option key={val} value={val}>{lbl}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
