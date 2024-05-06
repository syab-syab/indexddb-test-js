// import logo from './logo.svg';
import './App.css';
import { Dexie } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'

// データベース名を指定する
const db = new Dexie('todoApp')
// バージョンを指定する
db.version(1).stores({
  // オブジェクトストア(todos)の設定をする
  // ++を付けることでオートインクリメントする

  todos: '++id, task, completed '
})


const { todos } = db

function App() {
  // データベース内のすべてのtodosのデータを取得して配列にする(？)

  const allItems = useLiveQuery(() => todos.toArray(), [])

  console.log('=====>', allItems)

  const addTask = async (event) => {
    // デフォルトのリロードを防ぐ(？)
    event.preventDefault()
    const taskField = document.querySelector('#taskInput')
    // console.log('=====>', taskField.value)

    // addでデータの追加
    await todos.add({
      task: taskField['value'],
      completed: false,
    })

    // あとでuseStateに直す
    taskField['value'] = ''
  }

  return (
    <div className="container">
      <h3 className="teal-text center-align">Todo App</h3>
      <form className="add-item-form" onSubmit={addTask}>
        <input
          type="text"
          className="itemField"
          placeholder="What do you want to do today?"
          id="taskInput"
          required
        />
        <button type="submit" className="waves-effect btn teal right">
          Add
        </button>
      </form>

      <div className="card white darken-1">
        <div className="card-content">
          <div className="row">
            <p className="col s10">
              <label>
                <input type="checkbox" checked className="checkbox-blue" />
                <span className="black-tex strike-text">Call John Legend</span>
              </label>
            </p>
            <i className="col s2 material-icons delete-button">delete</i>
          </div>

          <div className="row">
            <p className="col s10">
              <label>
                <input type="checkbox" className="checkbox-blue" />
                <span className="black-tex">Do my laundry</span>
              </label>
            </p>
            <i className="col s2 material-icons delete-button">delete</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
