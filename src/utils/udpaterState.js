export const updaterState = (oldState,newState) => {
    return{
        ...oldState,
        ...newState
    }
}