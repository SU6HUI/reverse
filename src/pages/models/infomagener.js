import { infomanager, searchmanager } from '@/services/user'


export default {
    namespace: 'infomanager',
    state: {
        managerInfoData: [],
        noFind: 0 //1表示查询失败
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            //console.log(payload);
            const response = yield call(infomanager, payload)

            if (response.code === 200) {
                yield put({
                    type: 'find',
                    payload: {
                        data: response.data
                    }
                })
            }
        },

        *fetchSearch({ payload }, { call, put }) {
            const response = yield call(searchmanager, payload)
            console.log(response);

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
            state.managerInfoData = []
            state.noFind = action.payload.noFind
            action.payload.data.map(item => {
                state.managerInfoData.push(item)
            })
            return {
                managerInfoData: state.managerInfoData,
                noFind: state.noFind, //1为失败
            }
        },

    }

}