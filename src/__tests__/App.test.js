/**
 * @format
 */

import React from 'react';
import {
  act,
  fireEvent,
  flushMicrotasksQueue,
  render,
  waitForElement,
} from 'react-native-testing-library';
import App from '../App';
import Cell from '../components/Cell';

const mockResponse = {
  items: [
    {
      id: 1,
      name: 'repo1',
      owner: {
        login: 'login1',
      },
      stargazers_count: 666,
      created_at: 1585233294815,
      html_url: 'repo1_url',
    },
    {
      id: 2,
      name: 'repo2',
      owner: {
        login: 'login2',
      },
      stargazers_count: 10,
      created_at: 1585233224815,
      html_url: 'repo2_url',
    },
    {
      id: 3,
      name: 'repo3',
      owner: {
        login: 'login3',
      },
      stargazers_count: 0,
      created_at: 1585233294215,
      html_url: 'repo3_url',
    },
  ],
};

jest.mock('../api', () => {
  return {
    fetchGitHubRepo: jest.fn(() => ({
      error: null,
      repos: mockResponse,
    })),
  };
});

describe('Application', () => {
  test('renders repos', async () => {
    const { getByTestId } = render(<App />);

    const searchButton = getByTestId('search-button');

    await act(() => fireEvent.press(searchButton));

    await flushMicrotasksQueue();

    expect(getByTestId(`cell-1`)).toBeDefined();
    expect(getByTestId(`cell-2`)).toBeDefined();
    expect(getByTestId(`cell-3`)).toBeDefined();
  });

  test('adds repo to favorite', async () => {
    const { getByTestId } = render(<App />);

    const searchButton = getByTestId('search-button');

    await act(() => fireEvent.press(searchButton));

    const repo1 = getByTestId('cell-1');
    const repo1FavButton = getByTestId('cell-1-favorite-button');

    expect(repo1.props.isFavorite).toBe(false);

    act(() => fireEvent.press(repo1FavButton));

    expect(repo1.props.isFavorite).toBe(true);
  });

  test('removes repo from favorite', async () => {
    const { getByTestId } = render(<App />);

    const searchButton = getByTestId('search-button');

    await act(() => fireEvent.press(searchButton));

    const repo2 = getByTestId('cell-2');
    const repo2FavButton = getByTestId('cell-2-favorite-button');

    expect(repo2.props.isFavorite).toBe(false);

    act(() => fireEvent.press(repo2FavButton));

    expect(repo2.props.isFavorite).toBe(true);

    act(() => fireEvent.press(repo2FavButton));

    expect(repo2.props.isFavorite).toBe(false);
  });
});
