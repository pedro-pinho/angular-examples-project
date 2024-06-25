import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  todoName: string = '';
  todos: WritableSignal<string[]> = signal([]);

  addTodo(todo: HTMLInputElement) {
    const item = todo.value;
    this.todos.update(todos => [...todos, item]);
    todo.value = '';
    todo.focus();
  }

  removeTodo(index: number) {
    this.todos.update(todos => todos.filter((_, i) => i !== index));
  }
}
