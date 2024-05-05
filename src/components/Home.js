import React, { useState } from 'react'
// db.jsはexport defaltではないから 「{}」←これが要るっぽい
import { db } from "../lib/db"
import FriendList from './FriendList'
import ParamFriendList from './ParamFriendList'

const Home = () => {

  const defaultAge = 21

  const [name, setName] = useState('')
  const [age, setAge] = useState(defaultAge)
  const [status, setStatus] = useState('')

  async function addFriend() {
    try {
      // 新しいfriendを追加
      const id = await db.friends.add({
        name,
        age
      });

      setStatus(`Friend ${name} successfully added. Got id ${id}`)
      setName('')
      setAge(defaultAge)
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`)
    }
  }

  return (
    <>
      <p>{status}</p>
      Name:
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      Age:
      <input
        type="text"
        value={age}
        onChange={(ev) => setAge(Number(ev.target.value))}
      />
      <button onClick={addFriend}>Add</button>
      <hr />
      <FriendList />
      <ParamFriendList minAge={20} maxAge={60} />
    </>
  )
}

export default Home