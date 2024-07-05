import { vi } from "vitest"
import { screen } from "@testing-library/react"

import { renderContainer } from "../../../../utils/utilsTests"
import { AssistantFooter } from ".."
import { mockStore } from "../../../../../test-utils/store.utils.ts"
import { RootState } from "../../../../../redux-store"

const mockState: RootState = {
    assistantReducer: {
        chatHistory: [],
        isInErrorState: false,
        isLoading: false
    }
}

describe('AssistantFooter', () => {
    let store: any
    beforeEach(() => {
        store = mockStore(mockState)
        vi.clearAllMocks()
    })

    it('renders text footer and submit button', () => {
        renderContainer(store, <AssistantFooter />)

        expect(screen.getByTestId('assistant-textarea')).toBeInTheDocument()
        expect(screen.getByTestId('assistant-submit-button')).toBeInTheDocument()
    })
})