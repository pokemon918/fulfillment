import smoothScroll from 'smoothscroll-polyfill'
import 'flag-icons/css/flag-icons.min.css'
import 'react-toastify/dist/ReactToastify.css';

if (typeof window !== 'undefined') {
  smoothScroll.polyfill()
}
