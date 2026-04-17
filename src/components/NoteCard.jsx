const NoteCard = ({ note, activeSection, onView, onEdit, onPin, onArchive, onTrash, onRestore, onDeletePermanently }) => {
  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const cardColors = [
    "bg-white", "bg-yellow-50", "bg-blue-50", "bg-green-50", "bg-pink-50", "bg-purple-50"
  ];
  const color = cardColors[note.id % cardColors.length];

  return (
    <div className={`${color} border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 relative`}>
      {note.pinned && (
        <span className="absolute top-3 right-3 text-amber-500 text-sm" title="Pinned">📌</span>
      )}

      <h3
        className="font-semibold text-gray-800 text-base pr-6 cursor-pointer hover:text-amber-700 line-clamp-2"
        onClick={() => onView(note)}
      >
        {note.title || "Untitled"}
      </h3>

      <p className="text-sm text-gray-500 line-clamp-3 flex-1">{note.content}</p>

      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <span key={tag} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">{formatDate(note.updatedAt)}</p>

      <div className="flex gap-1 flex-wrap mt-1">
        {activeSection === "trash" ? (
          <>
            <button
              onClick={() => onRestore(note.id)}
              className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              Restore
            </button>
            <button
              onClick={() => onDeletePermanently(note.id)}
              className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              Delete Forever
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEdit(note)}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onPin(note.id)}
              className="text-xs px-2 py-1 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
            >
              {note.pinned ? "Unpin" : "Pin"}
            </button>
            <button
              onClick={() => onArchive(note.id)}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {note.archived ? "Unarchive" : "Archive"}
            </button>
            <button
              onClick={() => onTrash(note.id)}
              className="text-xs px-2 py-1 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
            >
              Trash
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteCard;