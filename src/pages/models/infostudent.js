import { infostudent, searchstudent } from '@/services/user'


export default {
    namespace: 'infostudent',
    state: {
        studentInfoData: [],
        noFind: 0 //1表示查询失败
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            //console.log(payload);
            const response = yield call(infostudent, payload)

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
            const response = yield call(searchstudent, payload)
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
            state.studentInfoData = []
            state.noFind = action.payload.noFind
            action.payload.data.map(item => {
                state.studentInfoData.push(item)
            })
            return {
                studentInfoData: state.studentInfoData,
                noFind: state.noFind, //1为失败
            }
        },

    }

}