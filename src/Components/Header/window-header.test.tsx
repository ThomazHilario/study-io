// Jest Dom
import '@testing-library/jest-dom'

// React Testing Library
import { screen, render } from '@testing-library/react'

// Vitest
import { describe, it, expect, vi } from 'vitest'

// Component
import { WindowHeader } from './window-header'

// context
import { UserData } from '@/Context/context';

describe('Show be WindowHeader component', () => {

    // Mock current window from tauri
    vi.mock('@tauri-apps/api/window', () => ({
        getCurrentWindow: () => ({
            maximize: vi.fn(),
            unmaximize: vi.fn(),
            setSize:vi.fn(),
            center:vi.fn()
        })
    }))

    it('Should be render WindowHeader', () => {
        // Arrange
        render(
            <UserData>
                <WindowHeader/>
            </UserData>
        )

        // Actual
        const component = screen.getByRole('header-app-study')

        // Expect 
        expect(component).toBeInTheDocument()
    })
})