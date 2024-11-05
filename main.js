let dropdowns = document.querySelector('.dropdowns')
let selects = document.querySelectorAll('select')
let image = document.querySelector(".foggy")
let memories = document.querySelectorAll(".memory")
let thumbs = document.querySelectorAll(".thumb")
let reset = document.querySelector(".reset")

let first = document.querySelector('#first-word')
let second = document.querySelector('#second-word')
let third = document.querySelector('#third-word')
let fourth = document.querySelector('#fourth-word')
let fifth = document.querySelector('#fifth-word')
let sixth = document.querySelector('#sixth-word')
let seventh = document.querySelector('#seventh-word')
let eighth = document.querySelector('#eighth-word')

const isDefault = (selectedValue) => selectedValue == 'default'
const isLineOne = (selectedValue) => selectedValue == 'line-1'
const isLineTwo = (selectedValue) => selectedValue == 'line-2'
const isLineThree = (selectedValue) => selectedValue == 'line-3'
const isLineFour = (selectedValue) => selectedValue == 'line-4'
const isLineFive = (selectedValue) => selectedValue == 'line-5'
const isLineSix = (selectedValue) => selectedValue == 'line-6'
const isLineSeven = (selectedValue) => selectedValue == 'line-7'
const isLineEight = (selectedValue) => selectedValue == 'line-8'


// TODO:
// custom dropdowns that mark words that were already picked; reset marks when verses are reset
// smaller images for thumbnails

initDropdowns()
initThumbnails()
initResetButton()

function initDropdowns() {
  selects.forEach(word => {
    word.onchange = verseChanged
  })
}

function initThumbnails() {
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      if (!thumb.classList.contains("unknown")) {
        setVerse(thumb.dataset.index)
      }
    })
  })
}

function initResetButton() {
  reset.addEventListener("click", () => {
    resetVerse()
  })
}
 
function setVerse(index, delay = 800) {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      selects[i].value = `line-${index}`
      verseChanged()
    }, i*delay)
  }

  //// For no delay, use this instead:
  // selects.forEach(word => {
  //   word.value = `line-${index}`
  // })
  // verseChanged()       
}

function resetVerse() {
  selects.forEach(word => {
    word.value = "default"
  })
  verseChanged()
}


function handleImageClarity() {
  let alignment = []

  selects.forEach(word => {
    alignment.push(word.value)
  })

  memories.forEach(memory => {
    memory.className = "memory"
    memory.classList.add(`opacity-${countInArray(alignment, `line-${memory.dataset.index}`)}`)
  })
}

function countInArray(array, value) {
  return array.reduce((n, x) => n + (x === value), 0);
}

function verseChanged() {
  let verse = ""
  let alignment = []

  selects.forEach(word => {
    verse += " " + word.options[word.selectedIndex].text
    alignment.push(word.value)
  })

  handleImageClarity();
  reset.className = "reset hidden"

  if (alignment.every(isLineOne) || 
      alignment.every(isLineTwo) || 
      alignment.every(isLineThree) || 
      alignment.every(isLineFour) ||
      alignment.every(isLineFive) ||
      alignment.every(isLineSix) || 
      alignment.every(isLineSeven) || 
      alignment.every(isLineEight)) {
    verseAligned();

  } else {
    verseHidden();
  }
}

function verseAligned() {
  let alignment = []

  selects.forEach(word => {
    alignment.push(word.value)
  })

  image.classList.add('exposed')
  thumbs.forEach(thumb => {
    // TODO: OPTIMIZE THIS
    if ((alignment.every(isLineOne) && thumb.dataset.index == 1) ||
        (alignment.every(isLineTwo) && thumb.dataset.index == 2) ||
        (alignment.every(isLineThree) && thumb.dataset.index == 3) ||
        (alignment.every(isLineFour) && thumb.dataset.index == 4) ||
        (alignment.every(isLineFive) && thumb.dataset.index == 5) ||
        (alignment.every(isLineSix) && thumb.dataset.index == 6) ||
        (alignment.every(isLineSeven) && thumb.dataset.index == 7) ||
        (alignment.every(isLineEight) && thumb.dataset.index == 8)
    ) {
      thumb.classList.remove("unknown")
    }
  })

  reset.classList.remove('hidden')
}

function verseHidden() {
  image.classList.remove("exposed")
}