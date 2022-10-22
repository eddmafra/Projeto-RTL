import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Tests component <Pokedex />', () => {
  test('Tests if page has a heading (h2) with the text: Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headText = screen.getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(headText).toBeValid();
  });
  test('Tests if next pokemon is shown after button Próximo pokémon is clicked', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((e) => {
      expect(screen.getByText(e.name)).toBeDefined();
      userEvent.click(nextBtn);
    });
  });
  test('Tests if is shown only one pokemon at a time', () => {
    renderWithRouter(<App />);
    const pkm = screen.getAllByTestId('pokemon-name');
    expect(pkm).toHaveLength(1);
  });
  test('Tests if pokedex has filter buttons', () => {
    renderWithRouter(<App />);
    const typeFilter = screen.getAllByTestId('pokemon-type-button');
    expect(typeFilter).toHaveLength(7);
    const typeFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(typeFire);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeEnabled(/all/i);
  });
  test('Tests a reset filter button', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    expect(screen.getByTestId('pokemon-name', { name: /pikachu/i })).toBeValid();
  });
});
