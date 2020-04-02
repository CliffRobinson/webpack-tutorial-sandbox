const initialState = [
    { user_id: 1, room_id: 0, time: 1585802165899, msg: "redux: lol butts lol" },
    { user_id: 2, room_id: 0, time: 1585802165950, msg: "redux: ugh, shut up" }
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