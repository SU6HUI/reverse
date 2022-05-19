import { infoDetail } from '@/services/designworks'

export default {
    namespace: 'infodetail',
    state: {
        id_data: [],
        id: ''
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            yield put({
                type: 'saveparams',
                payload,
            })
            const response = yield call(infoDetail)

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
            action.payload.data.results.map(item => {
                if (item.work_id == state.id) state.id_data.push(item)
            })
            return {
                data: state.id_data[0]
            }
        },
        saveparams(state, action) {
            state.id = action.payload.id
        }
    }
}