import { Link } from 'react-router-dom';

import styles from './Home.module.css'

export function Home() {
  return (
    <div className={styles['homepage']}>
      <h1 style={{textAlign: "center"}}>Задача «Дерево Штейнера»</h1>

      <ul>
        <li><Link to="/steiner-tree/level-1">Уровень 1</Link></li>
        <li><Link to="/steiner-tree/level-2">Уровень 2</Link></li>
        <li><Link to="/steiner-tree/level-3">Уровень 3</Link></li>
      </ul>

      <h2>Описание</h2>
      <p>Участникам предлагается решить частный случай <a href='https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B4%D0%B0%D1%87%D0%B0_%D0%A8%D1%82%D0%B5%D0%B9%D0%BD%D0%B5%D1%80%D0%B0_%D0%BE_%D0%BC%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%B5'>задачи Штейнера</a>, в которой точки можно соединять только горизонтальными и вертикальными отрезками.</p>

      <p>Для добавления отрезка кликните на одну из точек, доступных на плоскости. Выбранная точка станет начальной точкой отрезка. Затем установите конечную точку отрезка. Чтобы добавить на плоскость точку, кликните в произвольное место плоскости. Точки и отрезки можно удалять двойным кликом.</p>
    </div>
  );
}
