import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [NotesService]
})
export class Dashboard implements OnInit {
  notes: { id: number; text: string; editing?: boolean }[] = [];
  newNote = '';
  loading = false;

  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.loading = true;
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes.map(n => ({ ...n, editing: false }));
      this.loading = false;
    });
  }

  addNote() {
    if (this.newNote.trim()) {
      this.notesService.createNote(this.newNote).subscribe(note => {
        this.notes.unshift({ ...note, editing: false });
        this.newNote = '';
      });
    }
  }

  editNote(index: number) {
    this.notes[index].editing = true;
  }

  saveNote(index: number) {
    const note = this.notes[index];
    this.notesService.updateNote(note.id, note.text).subscribe(updated => {
      this.notes[index] = { ...updated, editing: false };
    });
  }

  deleteNote(index: number) {
    const note = this.notes[index];
    this.notesService.deleteNote(note.id).subscribe(() => {
      this.notes.splice(index, 1);
    });
  }

  logout() {
    localStorage.removeItem('token');
    void this.router.navigate(['/login']);
  }
}
