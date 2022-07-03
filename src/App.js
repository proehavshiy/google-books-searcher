import React, { useEffect } from 'react';
// styles
import styles from './App.module.css';
import classNames from 'classnames/bind';
// components
import Header from './components/Header/Header';
import TodoListView from './components/TodoListView/TodoListView';
import Footer from './components/Footer/Footer';
// redux
import { changeEditingMode } from './redux/slices/toDoSlice/toDoSlice';
import { useDispatch } from 'react-redux';
// constants
import { EDIT_INPUT_ID } from './constants/constants';

const cn = classNames.bind(styles);

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const closeToDoEditingMode = (e) => {
      // if click event is out of the ToDo editing input change isEditing status to false in all ToDos
      if (e.target.id !== EDIT_INPUT_ID) {
        dispatch(changeEditingMode({ changeAll: true }))
      }
    }
    window.addEventListener('click', closeToDoEditingMode)
    return () => { window.removeEventListener('click', closeToDoEditingMode) }
  }, [])

  return (
    <div className={cn('app')} data-testid='app'>
      <Header />
      <main>
        <TodoListView />
      </main>
      <Footer />
    </div>
  );
}



export default App;
