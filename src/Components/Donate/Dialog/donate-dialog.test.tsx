// Jest dom
import '@testing-library/jest-dom'

// Testing library
import { render, screen, fireEvent } from '@testing-library/react'

// vitest
import { describe, expect, it, beforeEach } from 'vitest'

// Components
import { DonateDialog } from './donate-dialog'

describe('Testing render dialog component', () => {

    // Construct component before test
    beforeEach(() => {
        render(<DonateDialog color='white' size={10}/>)
    })

    it('Should be render dialog trigger', () => {
        // Actual
        const trigger = screen.getByRole('donate_dialog_trigger')

        // Expect
        expect(trigger).toBeInTheDocument()
    })

    it('Should be render content in Dialog', () =>{
        // Arrange
        const trigger = screen.getByRole('donate_dialog_trigger')

        // Actual
        fireEvent.click(trigger)
        const content = screen.getByRole('donate_content_trigger')

        // Expect
        expect(content).toBeInTheDocument()
    })
})