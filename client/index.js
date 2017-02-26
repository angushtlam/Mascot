import { injectMascotHTML, addMascotBehaviorToElements } from './Mascot'

function init() {
  if (!injectMascotHTML()) {
    console.log('FATAL: Could not inject Mascot into page.')
    return
  }

  addMascotBehaviorToElements()
  console.log('Mascot loaded.')
}

// When the page loaded, run initialization functions.
window.onload = () => {
  init()
}
