const NoteModal = ({ note, onClose, onEdit }) => {
  const formatDate = (ts) =>
    new Date(ts).toLocaleString("en-US", {
      month: "long", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-lg p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>

        <div className="flex items-start gap-2 mb-1 pr-6">
          {note.pinned && <span className="text-amber-500 mt-1 shrink-0">📌</span>}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 wrap-break-words">{note.title || "Untitled"}</h2>
        </div>

        <p className="text-xs text-gray-400 mb-4">Updated: {formatDate(note.updatedAt)}</p>

        <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed mb-4 wrap-break-words">
          {note.content || "No content."}
        </p>

        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.map((tag) => (
              <span key={tag} className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-semibold"
          >
            Edit Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;