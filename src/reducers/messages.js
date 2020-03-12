const initialState = [
    { user: 1, msg: "lol butts lol" },
    { user: 2, msg: "ugh, shut up" }
]

export function messages(state = initialState, action) {
    switch (action.type) {
        case ("ADDMESSAGE"):
            //add message to db
            break;
        case ("GETMESSAGES"):
        default:
            {
                return state;
            }
    }
}