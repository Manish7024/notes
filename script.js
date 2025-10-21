const addNoteBtn = document.getElementById('addNoteBtn');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const notesContainer = document.getElementById('notesContainer');

let editIndex = null; // to track which note is being edited

function showNotes() {
  notesContainer.innerHTML = '';
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

function addOrUpdateNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title || !content) {
    alert('Please fill in both fields!');
    return;
  }

  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  if (editIndex !== null) {
    // Update existing note
    notes[editIndex] = { title, content };
    editIndex = null;
    addNoteBtn.textContent = 'Add Note';
  } else {
    // Add new note
    notes.push({ title, content });
  }

  localStorage.setItem('notes', JSON.stringify(notes));
  noteTitle.value = '';
  noteContent.value = '';
  showNotes();
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  showNotes();
}

function editNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  noteTitle.value = notes[index].title;
  noteContent.value = notes[index].content;
  editIndex = index;
  addNoteBtn.textContent = 'Update Note';
}

addNoteBtn.addEventListener('click', addOrUpdateNote);
showNotes();
