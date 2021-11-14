// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'
 
 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import Home from '../pages/testPage'
 
 describe('Home', () => {
   it('renders a heading', () => {
     render(<Home />)
 
     const heading = screen.getByRole('heading', {
       name: /welcome to next\.js!/i,
     })
 
     expect(heading).toBeInTheDocument()
   })
 })