import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../home'

import { 
  TITLE, 
  
  START_SCREEN, 
  START_BUTTON_TEXT,
  INFORMATION_BUTTON_TEXT,
  
  INFORMATION_SCREEN, 
  AUTOR_TEXT,
    
  GAME_SCREEN, 

  BACK_BUTTON_TEXT
} from '../../util/text'
import { USER_LIFE, USER_SCORE } from '../../util/className'

test('Home Component render test', () => {
  render(<Home />);
  
  const title = screen.getByText(TITLE);
  expect(title).toBeInTheDocument();

  const startButton = screen.getByText(START_BUTTON_TEXT) ;
  expect(startButton).toBeInTheDocument();

  const informationButton = screen.getByText(INFORMATION_BUTTON_TEXT) ;
  expect(informationButton).toBeInTheDocument();

});

test('Home Component start button click test', async () => {
  render(<Home />);

  const startButton = screen.getByText(START_BUTTON_TEXT) ;
  await userEvent.click(startButton) ;

  const canvasElement = screen.getByTestId('painter-canvas') ;
  expect(canvasElement).toBeInTheDocument();

});

test('Home Component information button click test', async () => {
  render(<Home />);

  const informationButton = screen.getByText(INFORMATION_BUTTON_TEXT) ;
  await userEvent.click(informationButton) ;

  const autorElement = screen.getByText(AUTOR_TEXT) ;
  expect(autorElement).toBeInTheDocument();

  const informationImageElement = screen.getByAltText('Game Information') ;
  expect(informationImageElement).toHaveAttribute('src', `${process.env.PUBLIC_URL}/information.png`) ;
  
  const backButton = screen.getByText(BACK_BUTTON_TEXT) ;
  expect(backButton).toBeInTheDocument();

  await userEvent.click(backButton) ;
  const startButton = screen.getByText(START_BUTTON_TEXT) ;
  expect(startButton).toBeInTheDocument();

  expect(screen.getByText(INFORMATION_BUTTON_TEXT)).toBeInTheDocument();

});

