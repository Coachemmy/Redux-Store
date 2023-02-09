//ACTION CREATORS 
//action for new booking
const newBooking=(name,amount)=>{
  return{
    type:'NEW_BOOKING',
    payload:{
      name,
      amount
    }
  }
}

//action for cancel booking
const cancelBooking=(name,refundAmount)=>{
  return{
    type:'CANCEL_BOOKING',
    payload:{
      name,
      refundAmount
    }
  }
}

//REDUCERS 
//accounting
const accounting=(totalMoney=100,action)=>{
  if(action.type==='NEW_BOOKING'){
    return totalMoney + action.payload.amount
  }else if(action.type==='CANCEL_BOOKING'){
    return totalMoney - action.payload.refundAmount
  }return totalMoney;
}

//reservation-history
const reservationHistory=(oldReservation=[],action)=>{
  if(action.type==='NEW_BOOKING'){
    return [...oldReservation,action.payload]    
  }else if(action.type==='CANCEL_BOOKING'){
    return oldReservation.filter((record)=>{
      return record.name !== action.payload.name
    })
  }return oldReservation;
}

//cancellation-history
const cancellationHistory=(oldCancellation=[],action)=>{
  if(action.type==='CANCEL_BOOKING'){
    return [...oldCancellation,action.payload]
  }return oldCancellation;
} 

//REDUX STORE
console.log(Redux)
const{createStore,combineReducers}=Redux

const railwayStore=combineReducers({
  accounting:accounting,
  reservationHistory:reservationHistory,
  cancellationHistory:cancellationHistory
})

const store=createStore(railwayStore)

const action = newBooking('coachEmmy', 20)
store.dispatch(action)
store.dispatch(newBooking('angela', 30))
store.dispatch(newBooking('george', 10))
//store.dispatch(cancelBooking('angela', 20))

console.log(store.getState())


