function MenuItem({ onClick, label }) {
  return (
    <div
      onClick={onClick}
      className="px-5 py-4 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
}

export default MenuItem;
