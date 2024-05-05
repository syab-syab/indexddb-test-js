import React from 'react'
import { db } from '../lib/db'
import { useLiveQuery } from "dexie-react-hooks";

const FriendList = () => {
  const friends = useLiveQuery(() => db.friends.toArray());

  return (
    <div>
      <p>FriendList</p>
      <ul>
        {
          friends?.map((friend) => (
            <li key={friend.id}>
              {friend.name}, {friend.age}
            </li>
          ))
        }
      </ul>      
    </div>

  )
}

export default FriendList