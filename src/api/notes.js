const API_URL = "https://api.example.com/notes";

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

export const createNote = async (note) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return response.json();
};

export const fetchTrashedNotes = async () => {
  const response = await fetch(`${API_URL}/trash`);
  if (!response.ok) {
    throw new Error("Failed to fetch trashed notes");
  }
  return response.json();
};

export const restoreNote = async (id) => {
  const response = await fetch(`${API_URL}/trash/${id}/restore`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to restore note");
  }
  return response.json();
};

export const permanentlyDeleteNote = async (id) => {
  const response = await fetch(`${API_URL}/trash/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to permanently delete note");
  }
  return response.json();
};