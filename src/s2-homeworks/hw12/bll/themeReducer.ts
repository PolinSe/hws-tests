export type StateType = {
    themeId: number
}
const initState: StateType = {
    themeId: 1
}

export const themeReducer = (state: StateType = initState, action: ActionCreatorType): StateType => { // fix any
    switch (action.type) {
        case 'SET_THEME_ID': {
            return {...state, themeId: action.id}
        }

        default:
            return state
    }
}
type ActionCreatorType = {
    type: 'SET_THEME_ID',
    id: number
}
export const changeThemeId = (id: number): ActionCreatorType => ({type: 'SET_THEME_ID', id} as const) // fix any
