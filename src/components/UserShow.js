import React, { Fragment } from 'react'
import { createResource } from 'simple-cache-provider'
import RepoTile from './RepoTile'
import { cache } from '../cache'
import Api from '../api'

const api = new Api()

const fetchUserDetails = createResource(
  () => api.fetch(`/users/${username}/repos`)
)

const UserShow = (props) => {
  const member = fetchUserDetails.read(cache, props.member.login)
  return ( 
    <div>
      <button onClick={this.props.clearSelected}>Back to index</button>
      <img src={member.avatar_url} />
      <h1>{member.login}</h1>
      <div>
        {this.props.repos.length > 0 ? (
          <Fragment>
            <h2>{member.login} has {this.props.repos.length} public repos</h2>
            <div>
              {this.props.repos.map(repo => (
                <RepoTile repo={repo} key={repo.id} />
              ))}
            </div>
          </Fragment>
        ) : (
          <h2>{member.login} does not have any public repos</h2>
        )}
      </div>
    </div>
  )
}

export default UserShow
