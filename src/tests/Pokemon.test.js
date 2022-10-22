import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests <Pokemon /> component', () => {
  test('tests if a card is rendered with info about pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    const pkmImg = screen.getByRole('img');
    expect(pkmImg).toBeValid();
    expect(pkmImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pkmImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('tests if pokemon on pokedex has a link for more details about pokemon, checks if link is /pokemon/:id', () => {
    renderWithRouter(<App />);
    const pkmDetails = screen.getByRole('link', { name: /more details/i });
    const pkmid = pokemons[0].id;
    expect(pkmDetails).toHaveTextContent('More details');
    expect(pkmDetails).toHaveAttribute('href', `/pokemons/${pkmid}`);
  });
  test('tests if there is a nav link that redirects the user to a detailed page and the URL is /pokemon/:id', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      userEvent.click(screen.getByRole('link', { name: /more details/i }));
    });
    const pkmid = pokemons[0].id;
    expect(history.location.pathname).toBe(`/pokemons/${pkmid}`);
  });
  test('tests if there is an star icon for the favorited pokemons', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('pokemons/25');
    });
    const makeFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(makeFavorite);
    const pkmName = pokemons[0].name;
    const isFavorite = screen.getByRole('img', { name: `${pkmName} is marked as favorite` });
    expect(isFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(isFavorite).toHaveAttribute('alt', `${pkmName} is marked as favorite`);
  });
});
