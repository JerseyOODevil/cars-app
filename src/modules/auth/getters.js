export default {
    getUserId: state => state.userId,
    getUserInfo: state => state.userInfo,
    isAuth: state => !!state.userId
}