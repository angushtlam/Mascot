import config from '../config'

import {
  getAnchorPointElementForMascot,
  moveMascotToLocation,
  moveMascotToStartingPosition
 } from './position'
import { setTooltip } from './tooltip'
import { getAllElementsWithAttribute } from '../util/domElements'

export function injectMascotHTML() {
  const htmlMascot = `
    <div class="mascotjs" id="mascotjs">
      <img class="mascotjs-mascot" src="` + (config.mascotURL || 'mascot.png') + `" />
      <div id="mascotjs-title-wrapper" class="mascotjs-title-wrapper"></div>
    </div>
  `
  document.body.innerHTML += htmlMascot

  // Attach click behaviors
  document.getElementById('mascotjs').onclick = () => {
    // TODO: Mascot should maybe give a self explanation?
    console.log('Mascot is clicked.')
  }

  return true
}

// Keeps track of the Mascot's activity
let inactiveTimeout = null
const inactiveDelayInMs = config.mascotInactiveInMs || 1500
const travelDelayInMs = config.mascotMoveDelayInMs || 500
let moveDelayTimeout = null // A delay that users can set to wait x seconds for the mascot to move.
export function addMascotBehaviorToElements() {
  // Grabs all the elements from the page with a title tag.
  // Calls the function with IE7 fallback.
  const elems = getAllElementsWithAttribute('title')

  // Does all the actual converting.
  for (const elem of elems) {
    // Ignore elements with the attribute data-mascot with a value of false.
    if (elem.getAttribute('data-mascot') !== 'false') {
      // Convert the title tags to data-title tags to remove default browser behavior
      elem.setAttribute('data-title', elem.getAttribute('title'))
      elem.removeAttribute('title')

      // Add behaviors to the elements when they are hovered over.
      elem.onmouseover = () => {
        // If Mascot is active, remove inactiveTimeout
        if (inactiveTimeout) {
          clearTimeout(inactiveTimeout)
          inactiveTimeout = null
        }

        if (moveDelayTimeout) {
          clearTimeout(moveDelayTimeout)
          moveDelayTimeout = null
        }

        moveDelayTimeout = setTimeout(() => {
          const vector = getAnchorPointElementForMascot(elem)
          moveMascotToLocation(vector)
          setTooltip(elem.getAttribute('data-title'))
        }, travelDelayInMs)
      }

      elem.onmouseout = () => {
        // TODO: After a second delay, if there has not been a new trigger, return to starting position.
        // Set a new inactiveTimeout
        if (inactiveTimeout) clearTimeout(inactiveTimeout)
        if (moveDelayTimeout) clearTimeout(moveDelayTimeout)

        inactiveTimeout = setTimeout(() => {
          // If the mascot has been inactive for longer than the delay, reset it.
          moveMascotToStartingPosition()
          setTooltip() // Remove text
        }, inactiveDelayInMs)
      }
    }
  }
}
