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
      <img class="mascotjs-mascot" src="mascot.png" />
      <div id="mascotjs-title-wrapper" class="mascotjs-title-wrapper"></div>
    </div>
  `
  document.body.innerHTML += htmlMascot

  // Attach behaviors
  document.getElementById('mascotjs').onclick = () => {
    console.log('Mascot is clicked.')
  }

  return true
}

//
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
        const vector = getAnchorPointElementForMascot(elem)
        moveMascotToLocation(vector)
        setTooltip(elem.getAttribute('data-title'))
        // TODO: Add delay for reset.
      }

      elem.onmouseout = () => {
        // TODO: After a second delay, if there has not been a new trigger, return to starting position.
        moveMascotToStartingPosition()
        setTooltip()
      }
    }
  }
}
