import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useUserStore = create(
	persist(
		(set) => ({
			user: undefined,
			value: '',
			chat: [],
			inputValue: '',
			isLoading: false,
			chatLimit: false,
			setChatLimit: (chatLimit) => set({ chatLimit }),
			setIsLoading: (isLoading) => set({ isLoading }),
			setIsMainPrompt: (isMainPrompt) => set({ isMainPrompt }),
			setInputValue: (inputValue) => set({ inputValue }),
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
			loadChatHistory: () => {
				const stored = localStorage.getItem('portfolio-chat-storage');
				if (stored) {
					const parsedData = JSON.parse(stored);
					set({ chat: parsedData.state.chat || [] });
				}
			}
		}),
		{
			name: "portfolio-chat-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ chat: state.chat })
		}
	)
)

export default useUserStore;