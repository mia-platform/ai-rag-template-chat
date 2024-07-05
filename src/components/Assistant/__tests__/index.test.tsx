import { Mock, vi } from "vitest"
import { screen, within, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import axios from '../../../lib/axios'

import { Assistant } from ".."
import { mockStore } from "../../../test-utils/store.utils"
import { renderContainer } from "../../utils/utilsTests"
import { RootState } from "../../../redux-store"

vi.mock('../../../lib/axios')

const mockState: RootState = {
    assistantReducer: {
        chatHistory: [],
        isInErrorState: false,
        isLoading: false
    }
}

const mockChatCompletionResponse = ({ message }: { message: string }) => {
    return (axios.post as Mock).mockImplementationOnce(() => new Promise((resolve) =>
        resolve({
            data: {
                message
            },
        }),
    ))
}

const mockChatCompletionErrorResponse = ({ message, status }: { message: string, status: number }) => {
    return (axios.post as Mock).mockImplementationOnce(() => new Promise((resolve, reject) =>
        reject({
            response: {
                status,
                data: {
                    message: message,
                },
            },
        }),
    ))
}

describe('Assistant', () => {
    let store: any
    beforeEach(() => {
        store = mockStore(mockState)
        vi.clearAllMocks()
    })

    it('renders initial state correctly', () => {
        renderContainer(store, <Assistant />)

        expect(screen.getByRole('heading', { name: /assistant playground/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
        expect(screen.getByTestId('assistant-robot-svg')).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/type a message/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /arrow-up/i })).toBeInTheDocument()
    })

    it('handles message exchange correctly', async () => {
        mockChatCompletionResponse(
            {
                message: 'some answer',
            },
        )

        renderContainer(store, <Assistant />)

        const textarea = screen.getByPlaceholderText(/type a message/i)
        const submitButton = screen.getByRole('button', { name: /arrow-up/i })

        expect(submitButton).toBeDisabled()
        userEvent.type(textarea, "some message")

        expect(submitButton).toBeEnabled()
        expect(screen.getByDisplayValue(/some message/i)).toBeInTheDocument()
        userEvent.click(submitButton)

        expect(submitButton).toBeDisabled()
        expect(within(textarea).queryByDisplayValue(/some message/i)).not.toBeInTheDocument()
        expect(screen.getByRole('img', { name: /user/i })).toBeInTheDocument()
        expect(screen.getByText(/you/i)).toBeInTheDocument()
        expect(screen.getByText(/some message/i)).toBeInTheDocument()

        expect(axios.post).toHaveBeenCalledWith(
            '/api/chat/completions',
            {
                "chat_history": [],
                "chat_query": "some message",
            },
        )

        await waitFor(() => expect(screen.getByText(/some answer/i)).toBeInTheDocument())
        expect(screen.getByTestId('assistant-avatar-svg')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
    })

    it('handles response error correctly with retry button', async () => {
        mockChatCompletionErrorResponse({ message: 'error', status: 500 })

        renderContainer(store, <Assistant />)

        const textarea = screen.getByPlaceholderText(/type a message/i)
        const submitButton = screen.getByRole('button', { name: /arrow-up/i })

        userEvent.type(textarea, "some message")
        userEvent.click(submitButton)

        expect(screen.getByRole('img', { name: /user/i })).toBeInTheDocument()
        expect(screen.getByText(/you/i)).toBeInTheDocument()
        expect(screen.getByText(/some message/i)).toBeInTheDocument()

        expect(axios.post).toHaveBeenCalledWith(
            '/api/chat/completions',
            {
                "chat_history": [],
                "chat_query": "some message",
            },
        )

        await waitFor(() => expect(screen.getByText(/something went wrong processing the answer/i)).toBeInTheDocument())
        expect(screen.getByRole('button', { name: /redo try again/i })).toBeInTheDocument()
    })
})