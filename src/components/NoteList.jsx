import NoteCard from "./NoteCard";

const NoteList = ({ notes, activeSection, onView, onEdit, onPin, onArchive, onTrash, onRestore, onDeletePermanently }) => {
  const pinned = notes.filter((n) => n.pinned);
  const others = notes.filter((n) => !n.pinned);

  const sectionTitles = {
    all: "All Notes",
    pinned: "Pinned Notes",
    archived: "Archived Notes",
    trash: "Trash",
  };

  if (notes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 px-4">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-lg font-medium text-center">No notes here</p>
        <p className="text-sm text-center">
          {activeSection === "trash"
            ? "Trash is empty"
            : activeSection === "archived"
            ? "No archived notes"
            : "Create a new note to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-700 mb-3 sm:mb-4">
        {sectionTitles[activeSection]}
      </h2>

      {activeSection === "all" && pinned.length > 0 && (
        <>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">📌 Pinned</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {pinned.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                activeSection={activeSection}
                onView={onView}
                onEdit={onEdit}
                onPin={onPin}
                onArchive={onArchive}
                onTrash={onTrash}
                onRestore={onRestore}
                onDeletePermanently={onDeletePermanently}
              />
            ))}
          </div>
          {others.length > 0 && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Others</p>
          )}
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {(activeSection === "all" ? others : notes).map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            activeSection={activeSection}
            onView={onView}
            onEdit={onEdit}
            onPin={onPin}
            onArchive={onArchive}
            onTrash={onTrash}
            onRestore={onRestore}
            onDeletePermanently={onDeletePermanently}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;