import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Todo {
  id?: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

@Injectable({ providedIn: 'root' })
export class TodoService {

  todosCollection: any;

  constructor(private firestore: Firestore) {
    // ✅ Initialize here (not as class field)
    this.todosCollection = collection(firestore, 'todos');
  }

  getTodos(): Observable<Todo[]> {
    return collectionData(this.todosCollection, { idField: 'id' }) as Observable<Todo[]>;
  }

  addTodo(todo: Omit<Todo, 'id'>) {
    return addDoc(this.todosCollection, {
      ...todo,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
  }

  updateTodo(id: string, data: Partial<Todo>) {
    const ref = doc(this.firestore, 'todos', id);
    return updateDoc(ref, {
      ...data,
      updatedAt: Timestamp.fromDate(new Date())
    });
  }

  deleteTodo(id: string) {
    const ref = doc(this.firestore, 'todos', id);
    return deleteDoc(ref);
  }
}
