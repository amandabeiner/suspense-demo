import React, { Component, Placeholder } from 'react'
import { createCache, createResource } from 'simple-cache-provider'
import { cache } from './cache'
import { hot } from 'react-hot-loader'

import Api from './api'
import UserShow from './components/UserShow'
import UsersIndex from './components/UsersIndex'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Lazy load!
const getThing = createResource(
  () => sleep(1000).then(() => import('./Thing').then(mod => mod.default)),
  thing => thing
);

const Thing = props => {
  const Comp = getThing.read(cache, props);
  return <Comp {...props} />;
};

/*<React.Fragment>
      <h1>Suspense</h1>
      <React.Placeholder delayMs={500} fallback={<div>🌀 'Loading....'</div>}>
        <Thing />
      </React.Placeholder>
    </React.Fragment>
    */

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      members: [],
      selectedMember: null,
      repos: []
    }

    this.api = new Api()
    this.fetchRepos = this.fetchRepos.bind(this)
    this.getSelectedMember = this.getSelectedMember.bind(this)
    this.setSelectedMember = this.setSelectedMember.bind(this)
    this.clearSelected     = this.clearSelected.bind(this)
  }

  fetchRepos(username) {
    this.api.fetch(`/users/${username}/repos`)
      .then((repos) => {
        this.setState({ repos })
      })
  }

  getSelectedMember() {
    return this.state.members.find(m => m.id === this.state.selectedMember) 
  }

  setSelectedMember(selectedMember) {
    this.setState({ selectedMember })
  }

  clearSelected() {
    this.setState({ selectedMember: null, repos: [] })
  }

  render() {
    return (
      <div className="App">
        {this.state.selectedMember ? (
          <React.Placeholder delayMs={500} fallback={<div>🌀 'Loading....'</div>}>
            <UserShow
              member={this.getSelectedMember()}
              clearSelected={this.clearSelected}
              fetchRepos={this.fetchRepos}
              repos={this.state.repos}
            />
          </React.Placeholder>
        ) : (
          <Placeholder delayMs={500} fallback={<div>🌀 'Loading....'</div>}>
          <UsersIndex
            selectMember={this.setSelectedMember}
          />
        </Placeholder>
        )}
      </div>
    )
  }
}

// Setup react-hot-loader for Parcel.
// This is removed in production automagically.
export default hot(module)(App);
