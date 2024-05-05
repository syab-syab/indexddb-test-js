import React from 'react'
import { db } from '../lib/db'
import { useLiveQuery } from 'dexie-react-hooks'

const ParamFriendList = ({ minAge, maxAge }) => {
  const friends = useLiveQuery(
    async () => {
      // Query Dexie's API
      const friends = await db.friends
        .where('age')
        .between(minAge, maxAge)
        .toArray();

      // return result
      return friends;
    },
    // specify vars that affect query:
    [minAge, maxAge]
  )

  return (
    <div>
      <p>ParamFriendList</p>
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

export default ParamFriendList