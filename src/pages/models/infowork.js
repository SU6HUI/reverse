import { infowork, findwork, delwork } from '@/services/designworks'

export default {
    namespace: 'infowork',
    state: {
        id_data: [],
        id: ''
    },
    effects: {
        //查看所有作业
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
        //删除作业
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
        },
        *detailfetch({ payload }, { call, put }) {
            yield put({
                type: 'saveparams',
                payload,
            })
            const response = yield call(findwork)

            if (response.data.status == 200) {
                yield put({
                    type: 'finddetail',
                    payload: response
                })
            }
        },
        //上传作业
        *uploadfetch({ payload }, { call, put }) {
            //console.log(payload);
            const response = yield call(infowork, payload)
            //console.log(response);
            if (response.data.status == 200) {
                yield put({
                    type: 'uploadsave',
                    payload: response
                })
            } else {
                yield put({
                    type: 'uploadsavefail',
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
        },
        finddetail(state, action) {
            action.payload.data.results.map(item => {
                if (item.work_id == state.id) state.id_data.push(item)
            })
            return {
                data: state.id_data[0]
            }
        },
        saveparams(state, action) {
            state.id = action.payload.id
        },
        uploadsave(state, action) {
            return {
                ok: 1
            }
        },
        uploadsavefail(state, action) {
            return {
                ok: 0
            }
        }
    }
}