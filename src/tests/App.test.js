import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Tests <App.js/> component and navigation links', () => {
  test('Checks if Home link appears on the screen and redirects to /', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /home/i });
    expect(linkToHome).toBeInTheDocument();
    userEvent.click(linkToHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Checks if About link appears on the screen and redirects to /about', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: /about/i });
    expect(linkToAbout).toBeInTheDocument();
    userEvent.click(linkToAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Checks if Favorites link appears on the screen and redirects to /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkToFave = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkToFave).toBeInTheDocument();
    userEvent.click(linkToFave);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Checks if an random url receive an 404 page', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/thisisarandomurl');
    });
    const notFound = screen.getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
