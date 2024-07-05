import { screen } from "@testing-library/react"
import { vi } from "vitest"

import App from "../App"
import { renderContainer } from "../components/utils/utilsTests"
import { mockStore } from "../test-utils/store.utils"
import { RootState } from "../redux-store"

const mockState: RootState = {
    assistantReducer: {
        chatHistory: [],
        isInErrorState: false,
        isLoading: false
    }
}

describe('App', () => {
    let store: any
    beforeEach(() => {
        store = mockStore(mockState)
        vi.clearAllMocks()
    })

    it('renders assistant title, placeholder, and chat input', () => {
        renderContainer(store, <App />)

        expect(screen.getByTestId('assistant-robot-svg')).toBeInTheDocument()
        expect(screen.getByText('Assistant Playground')).toBeInTheDocument()
        expect(screen.getByTestId('assistant-footer')).toBeInTheDocument()
    })
})