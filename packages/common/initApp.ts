import smoothScroll from 'smoothscroll-polyfill'
import 'flag-icons/css/flag-icons.min.css'

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
}
