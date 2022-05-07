import { infostudent, delstudent } from '@/services/user'

export default {
    namespace: 'infostudent',
    state: {
        originData: []
    },
    effects: {
        *fetch({ payload }, { call, put }) {

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

        }
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