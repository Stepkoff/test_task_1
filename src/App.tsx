import React, {useMemo, useState} from 'react';
import styles from './App.module.sass';
import {BsArrowUp,  BsArrowDown} from 'react-icons/bs';

interface IData {
  id: number
  name: string
  price: number
  category: 'animals' | "tourism" | 'parfum' | 'music' | 'food'
}

const data:IData[] = [
  {
    "id": 1,
    "name": "Animals",
    "price": 245,
    "category": "animals"
  }, {
    "id": 2,
    "name": "Paris and clothes",
    "price": 345,
    "category": "tourism"
  }, {
    "id": 3,
    "name": "Chanel",
    "price": 180,
    "category": "parfum"
  }, {
    "id": 4,
    "name": "Creed",
    "price": 125,
    "category": "music"
  }, {
    "id": 5,
    "name": "Food",
    "price": 145,
    "category": "food"
  }, {
    "id": 6,
    "name": "Italy and tourism",
    "price": 156,
    "category": "tourism"
  }, {
    "id": 7,
    "name": "Jazz club",
    "price": 197,
    "category": "music"
  }
];

const sortArrByPrice = (arr: IData[], method:'byIncrease'|'byDecrease') => {
  return arr.sort((a, b) => {
      if(a.price > b.price) return method === 'byIncrease' ? -1 : 1
      if(a.price < b.price) return method === 'byIncrease' ? 1 : -1
      return 0
    })
}

const App = () => {
  let categories = Array.from(new Set(data.map(item => item.category)));
  const [increaseDecreaseSort, setIncreaseDecreaseSort] = useState<'byIncrease'|'byDecrease'>('byIncrease');
  const [sortByCategory, setSortByCategory] = useState('');
  const sortedItems = useMemo(() => {
    return sortArrByPrice(data.filter(item=> item.category === sortByCategory || sortByCategory === ''), increaseDecreaseSort);
  }, [sortByCategory, data, increaseDecreaseSort]);

  const changeSortMethod = () => {
    setIncreaseDecreaseSort(increaseDecreaseSort === 'byIncrease' ? 'byDecrease' : "byIncrease")
  }
  const changeSortValue = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSortByCategory(e.target.value)
  }
  return (
    <div className={styles.app}>
      <div className={styles.app_wrapper}>
        <div className={styles.app_container}>
          <h1>Books</h1>
          <div className={styles.price}>
            <button onClick={changeSortMethod}>
              Price {increaseDecreaseSort === 'byIncrease' ? <BsArrowUp/> : <BsArrowDown/>}
            </button>
            <select onChange={changeSortValue}>
              <option value={''}>Show all</option>
              {categories.map((cat) => <option key={`cat-key:${cat}`} value={cat}>{cat}</option>)}
            </select>
          </div>
          <ul>
            {sortedItems.map((item) => <li key={`data-item:${item.id}`}>{item.name}: {item.price}</li>)}
          </ul>
          <div className={styles.total}>
            <p>Total count:</p>
            <span>{sortedItems.reduce((accum, item) => {
              return accum + item.price
            }, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
