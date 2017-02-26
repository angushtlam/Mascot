export function setTooltip(title) {
  const tw = document.getElementById('mascotjs-title-wrapper')
  // If there is no title, remove the entire thing.
  if (!title || title.trim() === '') {
    tw.innerHTML = ''
  } else {
    tw.innerHTML = '<div class="mascotjs-title">' + title + '</div>'
  }
}
