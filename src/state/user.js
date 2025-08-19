import { create } from 'zustand';

const useUserStore = create((set) => ({
	user: undefined,
    value: '',
	chat: [],
	debt: [],
	expenses: [],
	inputValue: '',
	isShowDebtForm: true,
	isShowExpensesForm: true,
	isMainPrompt: false,
	isDebtLoaded: false,
	isExpensesLoaded: false,
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
	setisExpensesLoaded: (isExpensesLoaded) => set({ isExpensesLoaded }),
	setIsMainPrompt: (isMainPrompt) => set({ isMainPrompt }),
	setInputValue: (inputValue) => set({ inputValue }),
	setIsShowDebtForm: (isShowDebtForm) => set({ isShowDebtForm }),
	setIsShowExpensesForm: (isShowExpensesForm) => set({ isShowExpensesForm }),
	setIsDebtLoaded: (isDebtLoaded) => set({ isDebtLoaded }),
	setUser: (user) => set({ user }),
	resetUser: () => set({ user: undefined }),
	setChat: (newChat) =>
		set((state) => ({ chat: [...state.chat, newChat] })),
	updateChat: (id, newText, isThinking) =>
		set((state) => ({
			chat: state.chat.map((chat) =>
				chat.id === id
					? { ...chat, text: chat.text + newText, isThinking: isThinking }
					: chat
			),
		})),
    setValue: (value) => set({ value }),
}));

export default useUserStore;