const Sidebar = ({ activeSection, setActiveSection, allTags, selectedTag, setSelectedTag, noteCount, onClose }) => {
  const navItems = [
    { key: "all", label: "All Notes", icon: "📝" },
    { key: "pinned", label: "Pinned", icon: "📌" },
    { key: "archived", label: "Archived", icon: "🗂️" },
    { key: "trash", label: "Trash", icon: "🗑️" },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r border-amber-100 flex flex-col py-5 px-3 shadow-md md:shadow-sm overflow-y-auto">

      {/* Header row with close button on mobile */}
      <div className="flex items-center justify-between mb-7 px-2">
        <div>
          <h1 className="text-xl font-bold text-amber-700 tracking-tight">🗒️ NoteKeep</h1>
          <p className="text-xs text-gray-400 mt-0.5">Your personal notes</p>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeSection === item.key
                ? "bg-amber-100 text-amber-800"
                : "text-gray-600 hover:bg-amber-50"
            }`}
          >
            <span>{item.icon} {item.label}</span>
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full min-w-6 text-center">
              {noteCount[item.key]}
            </span>
          </button>
        ))}
      </nav>

      {/* Tags section */}
      {allTags.length > 0 && (
        <div className="mt-7 px-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tags</p>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setSelectedTag("")}
              className={`text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
                selectedTag === "" ? "text-amber-700 font-semibold bg-amber-50" : "text-gray-500 hover:text-amber-600 hover:bg-amber-50"
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
                  selectedTag === tag ? "text-amber-700 font-semibold bg-amber-50" : "text-gray-500 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                # {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;