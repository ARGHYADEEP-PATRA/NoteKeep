import { useState, useEffect } from "react";

const CreateNoteModal = ({ note, allTags, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setTags(note.tags || []);
    }
  }, [note]);

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    onSave({ title: title.trim(), content: content.trim(), tags });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-lg p-5 sm:p-6 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 pr-6">
          {note ? "Edit Note" : "New Note"}
        </h2>

        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full px-4 py-2 mb-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
        />

        {/* Tags */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1 font-medium">Tags</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              className="flex-1 min-w-0 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              onClick={addTag}
              className="shrink-0 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-xl text-sm hover:bg-amber-200 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Existing tag suggestions */}
          {allTags.filter((t) => !tags.includes(t)).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {allTags.filter((t) => !tags.includes(t)).map((t) => (
                <button
                  key={t}
                  onClick={() => setTags([...tags, t])}
                  className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full hover:bg-amber-100 hover:text-amber-700 transition-colors"
                >
                  +{t}
                </button>
              ))}
            </div>
          )}

          {/* Selected tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1"
                >
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-red-500 leading-none">✕</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() && !content.trim()}
            className="px-4 py-2 text-sm bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {note ? "Save Changes" : "Create Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;