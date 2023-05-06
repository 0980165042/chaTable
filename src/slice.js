import { createSlice } from "@reduxjs/toolkit";
export const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: [],
        editStatus: false,
        noCount: 0
    },
    reducers: {
        setData: (state, { payload: { name, mat, how, milk, sweet } }) => {
            state.data = [...state.data, {
                no: state.noCount,
                name: name,
                mat: mat,
                how: how,
                milk: milk,
                sweet: sweet,
            }]
            console.log(state.data);
        },
        setNull: (state) => {
            state.data = []
            state.noCount = 0
            console.log(state.noCount);
        },
        setDelete: (state, { payload: { no } }) => {
            let index = state.data.findIndex((e) => e.no == no);
            state.data.splice([index], 1)
            state.noCount -= 1
            for (let i = 0; i < state.data.length; i++) {
                state.data[i].no = i + 1
                console.log("Walking east one step");
            }
        },
        setDisplayEdit: (state, { payload: { displayEdit } }) => {
            state.editStatus = displayEdit
        },
        setNoCount: (state) => {
            state.noCount += 1
            console.log(state.noCount);
        },
        setEdit: (state, { payload: { no, name, mat, how, milk, sweet } }) => {
            let index = state.data.findIndex((e) => e.no == no);
            console.log(index);
            state.data[index].name = name
            state.data[index].mat = mat
            state.data[index].how = how
            state.data[index].milk = milk
            state.data[index].sweet = sweet
        }
    }
})
export const { setData, setNull, setDelete, setDisplayEdit, setNoCount, setEdit } = dataSlice.actions
export default dataSlice.reducer