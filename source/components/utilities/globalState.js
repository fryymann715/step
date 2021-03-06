import globalStateActions from './globalStateActions'

const stateStorage = {}

const globalState = {

  subscribers: [],

  set( stateUpdates ) {
    Object.assign( stateStorage, stateUpdates )
    this.passStateToSubscribers()
  },

  get() { return stateStorage },

  reset() {
    for ( const property in stateStorage ) {
      delete stateStorage[property]
    }
    this.passStateToSubscribers()
  },

  subscribe( subscriber ) {
    this.subscribers.push( subscriber )
  },

  unsubscribe( subscriber ) {
    this.subscribers = this.subscribers
      .filter( sub => sub !== subscriber )
  },

  passStateToSubscribers() {
    if ( this.scheduledTrigger ) {
      return
    }
    this.scheduledTrigger = setTimeout( () => {
      delete this.scheduledTrigger
      this.subscribers.forEach( subscriber => {
        subscriber( stateStorage )
      })
    })
  }
}

Object.assign( globalState, globalStateActions( stateStorage ) )

export default globalState
