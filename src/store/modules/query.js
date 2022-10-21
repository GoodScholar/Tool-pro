/**
 * 保存跳转时的所需条件
 */
const state = {
    schoolId: '',
    classId: '',
}

const mutations = {
    setSchoolId(state, params) {
        state.schoolId = params
    },
    setClassId(state, params) {
        state.classId = params
    },
}

export default {
    namespaced: true,
    state,
    mutations,
}
