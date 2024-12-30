// Jest Dom
import '@testing-library/jest-dom'

// React Testing Library
import { render, screen, fireEvent } from '@testing-library/react'

// Vitest
import { describe, beforeEach, it, expect } from 'vitest'

// Component
import { DonateTabs } from './donate-tabs'

describe('Testing DonateTabs component', () => {

    beforeEach(() => {
        render(<DonateTabs/>)
    })

    it('Should be render in DonateTabs component trigger pix', () => {
        // Actual
        const btn_pix = screen.getByRole('btn-tabs-pix')

        // Expected
        expect(btn_pix).toBeInTheDocument()
    })

    it('Should be render in DonateTabs component trigger paypal', () => {
        // arrange
        const btn_paypal = screen.getByRole('btn-tabs-paypal')

        // Expected
        expect(btn_paypal).toBeInTheDocument()
    })

    it('Should be render content for pix in DonateTabs component', () => {
        // Arrange
        const content_pix = screen.getByRole('content-pix')

        // Expected
        expect(content_pix).toBeInTheDocument()
    })

    it('Should be render content for paypal in DonateTabs component', () => {
        // Arrange
        const btn_paypal = screen.getByRole('btn-tabs-paypal')
        const content_paypal = screen.getByRole('content-paypal')

        // Actual
        fireEvent.click(btn_paypal)

        // Expected
        expect(content_paypal).toBeInTheDocument()
    })
})