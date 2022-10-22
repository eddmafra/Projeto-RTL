import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Tests <NotFound /> component', () => {
  test('Tests if the page has a heading (h2) with the message: Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(notFoundText).toBeValid();
  });
  test('Tests if the page has a img with the src: https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByRole('img');
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
