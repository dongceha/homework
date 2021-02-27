import { AppState } from './../index';
import { todoFeatureKey, State, adapter } from './../reducers/todo.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectorTodo = createFeatureSelector<AppState, State>(todoFeatureKey)

export const selectTodos = createSelector(selectorTodo, selectAll);
