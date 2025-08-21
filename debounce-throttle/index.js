const inputEl = document.getElementById('input__text')
const defaultEl = document.querySelector('.default__text')
const debounceEl = document.querySelector('.debounce__text')
const throttleEl = document.querySelector('.throttle__text')

function debounce(fn, delay = 300) {
  let timeoutId = null

  return function (...args) {
    const ctx = this;

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn.apply(ctx, args)
    }, delay)
  }
}

function throttle(fn, delay = 1000) {
  let timeoutId = null
  let lastCallTime = 0

  return function (...args) {
    const ctx = this

    const now = Date.now()

    if (now - lastCallTime < delay) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now()
        fn.apply(ctx, args)
      }, delay - now - lastCallTime)
    }
    else {
      lastCallTime = now;
      fn.apply(ctx, args)
    }
  }
}

const debounceText = debounce((value) => {
  debounceEl.innerHTML = `${value}`
})

const throttleText = throttle((value) => {
  throttleEl.innerHTML = `${value}`
})

inputEl.addEventListener('input', (e) => {
  const value = e.target.value
  defaultEl.innerHTML = `${value}`
  debounceText(value)
  throttleText(value)
})