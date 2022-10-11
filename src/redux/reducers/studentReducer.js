const initialState = [
  {
    id: 1,
    name: "frandz",
    email: "frandz@gmail.com",
    phoneNumber: "123-456",
  },
  {
    id: 2,
    name: "jef",
    email: "jef@gmail.com",
    phoneNumber: "223-456",
  },
];

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_STUDENT" :
            state = [...state, action.payload];
            return state;
        case "UPDATE_STUDENT":
            const updated = state.map(student => student.id === action.payload.id ? action.payload : student);
            state = updated;
            return state;
        case "DELETE_STUDENT":
            const filterStudent = state.filter(student => student.id !== action.payload && student);
            state = filterStudent;
            return state;
        default:
            return state;
    }
};

export default studentReducer;