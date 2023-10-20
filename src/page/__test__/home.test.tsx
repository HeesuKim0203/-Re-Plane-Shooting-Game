import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../home';

test('Home Component render test', () => {
  render(<Home />);
  
  // In screen text testing
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
