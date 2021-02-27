import { createAction, props } from '@ngrx/store';

// 添加任务
export const addTodo = createAction('addTodo', props<{ title: string }>());  
// 删除任务
export const deleteTodo = createAction('deleteTodo', props<{ id: string }>());

export const deleteTodos = createAction('deleteTodos', props<{ ids: string[] }>());
