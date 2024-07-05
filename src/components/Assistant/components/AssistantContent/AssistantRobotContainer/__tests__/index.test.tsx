import { screen } from "@testing-library/react"
import { AssistantRobotContainer } from ".."
import { renderComponent } from "../../../../../utils/utilsTests"

describe('AssistantRobotContainer', () => {
    it('renders placeholder', () => {
        renderComponent(<AssistantRobotContainer />)

        expect(screen.getByTestId('assistant-robot-svg')).toBeInTheDocument()
    })
})