/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as NewTripForm} from './newTripForm'
export {default as TripPrefForm} from './trip-pref-form'
export {default as AddTravelers} from './AddTravelers'
export {default as BudgetChart} from './budgetChart'

export {default as Visual} from './visual'
export {default as Map} from './map'

export {default as LoginView} from './Login/LoginView'
export {default as SignUpView} from './SignUp/SignUpView'
