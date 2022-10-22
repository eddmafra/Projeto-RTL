import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../pages/About';

describe('Tests component <About />', () => {
  test('Tests if the page contains information about Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexText = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémons/i);
    expect(pokedexText).toBeValid();
  });
  test('Tests if the page has a heading (h2) with the text: About Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexHead = screen.getByRole('heading', { level: 2,
      name: /about pokédex/i,
    });
    expect(pokedexHead).toBeValid();
  });
  test('Tests if the page conténs two paragraphs with text about Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen
      .findByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémons/i);
    const p2 = screen
      .findByText(/one can filter pokémons by type, and see more details for each one of them/i);
    expect(p1).toBeDefined();
    expect(p2).toBeDefined();
  });
  test('Tests if the page contains an specific image of a pokédex', () => {
    renderWithRouter(<About />);
    const imgSrc = screen.getByRole('img');
    expect(imgSrc)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
