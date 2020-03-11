const initialState = [
    {user:1, msg: "lol butts lol"},
    {user: 2, msg: "ugh, shut up"}
]

export default function reducer(action, state = initialState) {
    switch (action.type) {
        case ("ADDMESSAGE"): 
            //add message to db
            break;
        case ("GETMESSAGES"):
        default: {
            return state;
        }
    }
}