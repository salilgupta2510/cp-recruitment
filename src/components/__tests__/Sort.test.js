import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import Sort from '../Sort';

test('should sort repos by NAME asc -> desc -> asc', () => {
  const updateRepos = jest.fn();
  const { getByText } = render(<Sort onSort={updateRepos} currentRepos={unsortedRepos} />);
  const button = getByText('Name ');
  fireEvent.press(button);
  expect(updateRepos).toHaveBeenLastCalledWith(ascNameRepos);
  fireEvent.press(button);
  expect(updateRepos).toHaveBeenLastCalledWith(descNameRepos);
  fireEvent.press(button);
  expect(updateRepos).toHaveBeenLastCalledWith(ascNameRepos);
});

test('should sort repos by STARS asc -> desc -> asc', () => {
  const updateRepos = jest.fn();
  const { getByText } = render(<Sort onSort={updateRepos} currentRepos={unsortedRepos} />);
  const button = getByText('Stars ');
  fireEvent.press(button);
  expect(updateRepos).toHaveBeenLastCalledWith(ascStarsRepos);
  fireEvent.press(button);
  expect(updateRepos).toHaveBeenLastCalledWith(descStarsRepos);
  fireEvent.press(button);
  expect(updateRepos).toHaveBeenLastCalledWith(ascStarsRepos);
});

test('should sort repos by STARS asc and by NAME asc', () => {
  const updateRepos = jest.fn();
  const { getByText } = render(<Sort onSort={updateRepos} currentRepos={unsortedRepos} />);
  const starsButton = getByText('Stars ');
  const nameButton = getByText('Name ');

  fireEvent.press(starsButton);
  expect(updateRepos).toHaveBeenLastCalledWith(ascStarsRepos);
  fireEvent.press(nameButton);
  expect(updateRepos).toHaveBeenLastCalledWith(ascNameRepos);
});

const unsortedRepos = [{
  name: 'is',
  stargazers_count: 2222,
}, {
  name: 'awesome',
  stargazers_count: 1,
}, {
  name: 'callstack',
  stargazers_count: 9999,
}, {
  name: '-callstack',
  stargazers_count: 0,
}]

const ascNameRepos = [{
  name: '-callstack',
  stargazers_count: 0,
}, {
  name: 'awesome',
  stargazers_count: 1,
}, {
  name: 'callstack',
  stargazers_count: 9999,
}, {
  name: 'is',
  stargazers_count: 2222,
}]

const descNameRepos = [{
  name: 'is',
  stargazers_count: 2222,
}, {
  name: 'callstack',
  stargazers_count: 9999,
}, {
  name: 'awesome',
  stargazers_count: 1,
},{
  name: '-callstack',
  stargazers_count: 0,
}]

const ascStarsRepos = [{
  name: '-callstack',
  stargazers_count: 0,
}, {
  name: 'awesome',
  stargazers_count: 1,
}, {
  name: 'is',
  stargazers_count: 2222,
}, {
  name: 'callstack',
  stargazers_count: 9999,
}]

const descStarsRepos = [{
  name: 'callstack',
  stargazers_count: 9999,
}, {
  name: 'is',
  stargazers_count: 2222,
}, {
  name: 'awesome',
  stargazers_count: 1,
}, {
  name: '-callstack',
  stargazers_count: 0,
}]
