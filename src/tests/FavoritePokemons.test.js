import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Tests <FavoritePokemons/> component', () => {
  test('Tests if there is a message: No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoriteList = localStorage.getItem('favoritePokemonIds');
    expect(favoriteList).toBeNull();
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Tests if all favorite pokemon cards are shown', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('pokemons/25');
    });
    const isFavorite = screen.getByRole('checkbox');
    userEvent.click(isFavorite);
    act(() => {
      history.push('/favorites');
    });
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeValid();
  });
});
