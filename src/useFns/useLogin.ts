import { Router } from 'vue-router';
import { useUserStore } from '../stores/userStore';
export const useLogin = (router:Router) => {
    return {
        login: () => login(router),
        logout: () => logout(router)
    }
}

const login = (router: Router) => {
    const user = useUserStore()
    user.setUser('11111111111111')
	router.push({
		name: 'Home',
	});
};

const logout = (router: Router) => {
    const user = useUserStore()
    user.setUser('')
}