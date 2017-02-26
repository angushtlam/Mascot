import config from '../config'

// Finds the anchor point of the Mascot.
// By default it anchors above the bottom left corner of the specified element.
// Stretch goal: Customizable anchor location/modes. (Hover location, etc.)
// Returns a vector. The vector is an array with 2 elements, x and y.
// TODO: Make sure the mascot will not leave the screen.
export function getAnchorPointElementForMascot(elem) {
  const rect = elem.getBoundingClientRect()
  const locX = rect.left
  const locY = rect.bottom

  return [locX, locY]
}

// Used to store the mascot's intended end location.
let targetX = 0
let targetY = 0
let startX = 0
let startY = 0
let magnitude = 0
const travelRate = 0.025 // Works pretty well, not gonna bother making it travel
const travelTimeInMs = config.mascotMoveTimeInMs || 600
// The interval thread that is ran by the moveMascotToLocation function.
let moveInterval = null
export function moveMascotToLocation(vector) {
  // Cancel any previous threads moving the mascot.
  if (moveInterval !== null) clearInterval(moveInterval)

  // Change target locations. Do not allow them to go off the screen.
  targetX = Math.min(vector[0], window.innerWidth - 200 - 90)
  targetY = Math.min(vector[1], window.innerHeight - 90)

  magnitude = 0 // Reset magnitude

  const mascot = document.getElementById('mascotjs')
  const rect = mascot.getBoundingClientRect() // Get the mascot's current location
  startX = rect.left
  startY = rect.top

  // On ms determined by travel rate, move the mascot with lerp formula.
  moveInterval = setInterval(() => {
    let currentX = startX + magnitude * (targetX - startX)
    let currentY = startY + magnitude * (targetY - startY)

    mascot.style.top = currentY + 'px'
    mascot.style.right = 'inherit'
    mascot.style.bottom = 'inherit'
    mascot.style.left = currentX + 'px'

    magnitude += travelRate

    if (magnitude >= 1) clearInterval(moveInterval)
  }, travelRate / 1 * travelTimeInMs)
}

export function moveMascotToStartingPosition() {
  // TODO: Programmatically calculate the offset.
  moveMascotToLocation([window.innerWidth - 90, window.innerHeight - 90])
}
