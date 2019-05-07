import axios from 'axios'

const GETTING_ANSWERS = 'GETTING_ANSWERS'
const GOT_ANSWERS = 'GOT_ANSWERS'
const GETTING_ANSWER = 'GETTING_ANSWER'
const GOT_ANSWER = 'GOT_ANSWER'
const ADD_ANSWER = 'ADD_ANSWER'

const gettingAnswers = () => ({
  type: GETTING_ANSWERS
})

const gotAnswers = answers => ({
  type: GOT_ANSWERS,
  answers
})

const gettingAnswer = () => ({
  type: GETTING_ANSWER
})

const gotAnswer = answer => ({
  type: GOT_ANSWER,
  answer
})

let nextId = 0
const addAnswer = data => ({
  type: ADD_ANSWER,
  data,
  id: nextId++
})

export const fetchAnswers = () => {
  return async dispatch => {
    try {
      dispatch(gettingAnswers())
      const {data} = await axios.get('/api/tripPrefAnswers')
      dispatch(gotAnswers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchAnswer = id => {
  return async dispatch => {
    try {
      dispatch(gettingAnswer())
      const {data} = await axios.get(`/api/tripPrefAnswers/${id}`)
      dispatch(gotAnswer(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchAddAnswer = answer => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/tripPrefAnswers', answer)
      dispatch(addAnswer(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  all: [],
  selectedAnswer: {},
  answerLoading: true,
  answersLoading: true
}

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_ANSWERS:
      return {...state, answersLoading: true}
    case GOT_ANSWERS:
      return {
        ...state,
        answersLoading: false,
        all: action.answers
      }
    case GETTING_ANSWER:
      return {...state, answerLoading: true}
    case GOT_ANSWER:
      return {
        ...state,
        answerLoading: false,
        selectedAnswer: {...action.answer}
      }
    case ADD_ANSWER:
      const newAnswer = {
        id: action.id,
        firstChoiceDestination: action.firstChoiceDestination,
        secondChoiceDestination: action.secondChoiceDestination,
        thirdChoiceDestination: action.thirdChoiceDestination,
        firstChoiceDateRange: action.firstChoiceDateRange,
        secondChoiceDateRange: action.secondChoiceDateRange,
        thirdChoiceDateRange: action.thirdChoiceDateRange,
        budget: action.budget
      }
      return {...state, all: [...state.all, newAnswer]}
    default:
      return state
  }
}

export default answerReducer
