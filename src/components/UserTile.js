import React from 'react'

const UserTile = (props) => {
  const selectTile = () =>  (
    props.onClick(props.id)
  )

  return (
    <div className="user-tile" onClick={selectTile}>
      <img src={props.avatar_url} alt="avatar"/>
      <h1>{props.login}</h1>
    </div>
  )
}

export default UserTile
