import React from 'react'
import PropTypes from 'prop-types'

const RepoTile = (props) => {
  console.log(props.repo)
  return ( 
    <div>
      <a href={props.repo.html_url} target="_blank">
        <h3>{props.repo.name}</h3>
      </a>
      <p>{props.repo.description}</p>
      <p>{props.repo.language}</p>
    </div>
  )
}

export default RepoTile
