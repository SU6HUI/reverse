import { infostudent, delstudent, updstudent, searchstudent, addstudent } from '@/services/user'

export default {
    namespace: 'infostudent',
    state: {
        originData: []
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            //console.log(payload);
            const response = yield call(infostudent, payload)
            //console.log(response);

            if (response.code === 200) {
                yield put({
                    type: 'find',
                    payload: response.data
                })
            }
        },

        *fetchDel({ payload }, { call, put }) {

            const response = yield call(delstudent, payload)
            if (response.code === 200) {
                yield put({
                    type: 'find',
                })
            }

        },

        *fetchUpd({ payload }, { call, put }) {
            //console.log(payload);
            const response = yield call(updstudent, payload)
            //console.log(response);
            if (response.code === 200) {
                yield put({
                    type: 'find',
                })
            }
        },

        *fetchSearch({ payload }, { call, put }) {
            const response = yield call(searchstudent, payload)
            //console.log(response);

            if (response.code === 200) {
                yield put({
                    type: 'find',
                    payload: response.data
                })
            }
        },

        *fetchAdd({ payload }, { call, put }) {
            //console.log(payload);
            const response = yield call(addstudent, payload)
            console.log(response);
            if (response.code === 200) {
                yield put({
                    type: 'find',
                })
            }
        },
    },
    reducers: {
        find(state, action) {
            state.originData = []
            action.payload.map(item => {
                state.originData.push(item)
            })
            return {
                originData: state.originData
            }
        },

    }

}