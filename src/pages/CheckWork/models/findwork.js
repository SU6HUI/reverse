import { findwork, delwork } from '@/services/designworks'

export default {
    namespace: 'findwork',
    state: {

    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(findwork, payload)

            if (response.data.status == 200) {
                yield put({
                    type: 'find',
                    payload: response
                })
            } else {
                yield put({
                    type: 'findfail',
                    payload: response
                })
            }
        },
        *delfetch({ payload }, { call, put }) {
            const response = yield call(delwork, payload)



            if (response.data.status == 200) {
                yield put({
                    type: 'find',
                    payload: response
                })
            } else {
                yield put({
                    type: 'findfail',
                    payload: response
                })
            }
        }
    },
    reducers: {
        find(state, action) {
            return {
                workData: action.payload.data.results
            }
        }
    }
}