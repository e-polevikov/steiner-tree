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
    </div>
  );
}
