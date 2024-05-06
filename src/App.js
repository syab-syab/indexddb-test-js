// import logo from './logo.svg';
import './App.css';
import { Dexie } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'

// データベース名を指定する
const db = new Dexie('todoApp')
// バージョンを指定する
db.version(1).stores({
  // オブジェクトストア(todos)の設定をする
  // ++を付けることでオートインクリメントしプライマリーキーにする

  todos: '++id, task, completed '
})


const { todos } = db

function App() {
  // データベース内のすべてのtodosのデータを取得して配列にする(？)
  // useLiveQueryはindexedDBのデータが更新されたときに再レンダリングする
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

  // deleteにプライマリーキーを指定して削除できる
  const deleteTask = async (id) => todos.delete(id)

  const toggleStatus = async (id, event) => {
    // updateは更新したいデータのプライマリーキーを第一引数に指定し
    // 第二引数に変更するプロパティとその値を指定する
    await todos.update( id, {completed: !!event.target.checked })
  }

  // whereでプロパティを指定してequqalsで値を指定すれば検索できるが
  // equalsはboolean値に対応していないっぽい(null、undefined、Objectsも未対応)
  // 加えて文字列の比較では大文字と小文字が区別される
  // const completedItems = todos.where('completed').equals(true).toArray()
  // filterで代用した方が楽かもしれない
  const completedItems = allItems?.filter((item) => item.completed === true)
  console.log(completedItems)

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
          {allItems?.map(({ id, completed, task}) => (
            <div className="row" key={id}>
              <p className="col s10">
                <label>
                  <input
                    type="checkbox"
                    checked={completed}
                    className="checkbox-blue"
                    onChange={(event) => toggleStatus(id, event)}
                  />
                  {/* completedがtrueの場合のみ打ち消し線(strike-text)を付ける */}
                  <span className={`black-tex ${completed && 'strike-text'}`}>{task}</span>
                </label>
              </p>
              <i
                onClick={() => deleteTask(id)}
                className="col s2 material-icons delete-button"
              >
                delete
              </i>
            </div>            
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
