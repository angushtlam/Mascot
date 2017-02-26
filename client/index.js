import { injectMascotHTML, addMascotBehaviorToElements } from './Mascot'

function init() {
  if (!injectMascotHTML()) {
    console.log('FATAL: Could not inject Mascot into page.')
    return
  }

  addMascotBehaviorToElements()
}

// When the page loaded, run initialization functions.
window.onload = () => {
  init()
}
