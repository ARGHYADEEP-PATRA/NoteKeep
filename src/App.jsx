import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import NoteModal from "./components/NoteModal";
import CreateNoteModal from "./components/CreateNoteModal";

const STORAGE_KEY = "notes_app_data";

function App() {
  // const [notes, setNotes] = useState([]);
    const [notes, setNotes] = useState(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
});
  const [activeSection, setActiveSection] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle

  // Load from localStorage
  // useEffect(() => {
  //   const saved = localStorage.getItem(STORAGE_KEY);
  //   if (saved) setNotes(JSON.parse(saved));
  // }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(()=>{
    console.log(notes);
  },[notes])

  const saveNote = (noteData) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id ? { ...n, ...noteData, updatedAt: Date.now() } : n
        )
      );
      setEditingNote(null);
    } else {
      const newNote = {
        id: Date.now(),
        ...noteData,
        pinned: false,
        archived: false,
        trashed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    setShowCreateModal(false);
  };

  const pinNote = (id) =>
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );

  const archiveNote = (id) =>
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, archived: !n.archived, pinned: false } : n
      )
    );

  const trashNote = (id) =>
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, trashed: true, pinned: false, archived: false } : n
      )
    );

  const restoreNote = (id) =>
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, trashed: false } : n))
    );

  const deleteNotePermanently = (id) =>
    setNotes((prev) => prev.filter((n) => n.id !== id));

  const openEdit = (note) => {
    setEditingNote(note);
    setShowCreateModal(true);
    setSelectedNote(null);
  };

  const handleSectionChange = (s) => {
    setActiveSection(s);
    setSelectedTag("");
    setSearchQuery("");
    setSidebarOpen(false); // close sidebar on mobile after selection
  };

  // Get all tags
  const allTags = [...new Set(notes.flatMap((n) => n.tags || []))];

  // Filter notes based on section
  // const getFilteredNotes = () => {
  //   let filtered = notes;

  //   if (activeSection === "all") filtered = notes.filter((n) => !n.trashed && !n.archived);
  //   else if (activeSection === "pinned") filtered = notes.filter((n) => n.pinned && !n.trashed);
  //   else if (activeSection === "archived") filtered = notes.filter((n) => n.archived && !n.trashed);
  //   else if (activeSection === "trash") filtered = notes.filter((n) => n.trashed);

  //   if (searchQuery)
  //     filtered = filtered.filter(
  //       (n) =>
  //         n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         n.content.toLowerCase().includes(searchQuery.toLowerCase())||
  //         n.tags.filter(tag=>tag.toLowerCase().includes(searchQuery.toLowerCase()))
  //     );

  //   if (selectedTag)
  //     filtered = filtered.filter((n) => n.tags?.includes(selectedTag));

  //   return filtered;
  // };

    const getFilteredNotes = () => {
    let filtered = notes;
 
    if (activeSection === "all") filtered = notes.filter((n) => !n.trashed && !n.archived);
    else if (activeSection === "pinned") filtered = notes.filter((n) => n.pinned && !n.trashed);
    else if (activeSection === "archived") filtered = notes.filter((n) => n.archived && !n.trashed);
    else if (activeSection === "trash") filtered = notes.filter((n) => n.trashed);
 
    if (searchQuery)
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
 
    if (selectedTag)
      filtered = filtered.filter((n) => n.tags?.includes(selectedTag));
 
    return filtered;
  };

  const noteCount = {
    all: notes.filter((n) => !n.trashed && !n.archived).length,
    pinned: notes.filter((n) => n.pinned && !n.trashed).length,
    archived: notes.filter((n) => n.archived && !n.trashed).length,
    trash: notes.filter((n) => n.trashed).length,
  };

  return (
    <div className="flex h-screen bg-amber-50 font-sans overflow-hidden relative">

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <div
        className={`
          fixed top-0 left-0 h-full z-30 transition-transform duration-300
          md:static md:translate-x-0 md:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          allTags={allTags}
          selectedTag={selectedTag}
          setSelectedTag={(tag) => { setSelectedTag(tag); setSidebarOpen(false); }}
          noteCount={noteCount}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top Bar */}
        <div className="flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 bg-white border-b border-amber-100 shadow-sm">

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden shrink-0 p-2 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-0 px-3 sm:px-4 py-2 rounded-xl border border-amber-200 bg-amber-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
          />

          {/* New Note button */}
          {activeSection !== "trash" && (
            <button
              onClick={() => { setEditingNote(null); setShowCreateModal(true); }}
              className="shrink-0 px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">+ New Note</span>
              <span className="sm:hidden text-lg leading-none">+</span>
            </button>
          )}
        </div>

        <NoteList
          notes={getFilteredNotes()}
          activeSection={activeSection}
          onView={setSelectedNote}
          onEdit={openEdit}
          onPin={pinNote}
          onArchive={archiveNote}
          onTrash={trashNote}
          onRestore={restoreNote}
          onDeletePermanently={deleteNotePermanently}
        />
      </main>

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onEdit={() => openEdit(selectedNote)}
        />
      )}

      {showCreateModal && (
        <CreateNoteModal
          note={editingNote}
          allTags={allTags}
          onSave={saveNote}
          onClose={() => { setShowCreateModal(false); setEditingNote(null); }}
        />
      )}
    </div>
  );
}

export default App;