import { updpassword } from '@/services/user'
export default {
    namespace: 'updpwd',
    state: {
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(updpassword, payload)
            //console.log(response);
            if (response.code == 200) {
                yield put({
                    type: 'find',
                    payload: response.data
                })
            } else {
                yield put({
                    type: 'find',
                    payload: response.data
                })
            }
        }
    },
    reducers: {
        find(state, action) {
            //console.log(action.payload.ok);
            return {
                ...state,
                ok: action.payload.ok,
            }
        },
    }
}