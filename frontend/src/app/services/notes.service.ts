import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class NotesService {
  private apiUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  createNote(text: string): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, { text });
  }

  updateNote(id: number, text: string): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, { text });
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 