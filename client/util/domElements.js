// Code from http://stackoverflow.com/questions/9496427/get-elements-by-attribute-when-queryselectorall-is-not-available-without-using-l
// This should support browsers in IE7
export function getAllElementsWithAttribute(attribute) {
  // If the browser supports querySelectorAll, then use it.
  if (document.querySelectorAll) {
    return document.querySelectorAll('[' + attribute + ']')
  }

  var matchingElements = []

  // Retrieve all elements.
  var allElements = document.getElementsByTagName('*')

  for (var i = 0, n = allElements.length; i < n; i++) {
    if (allElements[i].getAttribute(attribute) !== null) {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i])
    }
  }

  return matchingElements
}
