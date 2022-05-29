import { infoteacher, searchteacher } from '@/services/user'

export default {
    namespace: 'infoteacher',
    state: {
        teacherInfoData: []
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(infoteacher, payload)
            //console.log(response);
            if (response.code == 200) {
                yield put({
                    type: 'find',
                    payload: {
                        data: response.data
                    }
                })
            }
        },
        *fetchSearch({ payload }, { call, put }) {
            const response = yield call(searchteacher, payload)
            //console.log(response);

            if (response.code === 200) {
                yield put({
                    type: 'find',
                    payload: {
                        data: response.data,
                        noFind: 0
                    }
                })
            } else if (response.code == 300) {
                yield put({
                    type: 'find',
                    payload: {
                        noFind: 1 //1查询失败
                    }
                })
            }
        },

    },
    reducers: {
        find(state, action) {
            state.teacherInfoData = []
            action.payload.data.map(item => {
                state.teacherInfoData.push(item)
            })
            return {
                teacherInfoData: state.teacherInfoData,
                noFind: state.noFind, //1为失败
            }
        },

    }
}