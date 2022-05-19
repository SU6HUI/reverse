import { infowork } from '@/services/designworks'

export default {
    namespace: 'infowork',
    state: {

    },
    effects: {
        *fetch({ payload }, { call, put }) {
            //console.log(payload);
            const response = yield call(infowork, payload)
            //console.log(response);
            if (response.data.status == 200) {
                yield put({
                    type: 'save',
                    payload: response
                })
            } else {
                yield put({
                    type: 'savefail',
                    payload: response
                })
            }
        }
    },
    reducers: {
        save(state, action) {
            return {
                ok: 1
            }
        },
        savefail(state, action) {
            return {
                ok: 0
            }
        }
    }
}