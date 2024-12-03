const API_ROOT = 'https://api.github.com';

/**
 *
 * @param repoName - string, name of the repo
 * @param perPage - number, how many results per page
 * @param page - number, pagination page number
 * @returns Promise of Object that contains:
 *          error: string or null, error message
 *          repos: results
 */
export async function fetchGitHubRepo(repoName, perPage = 100, page = 1) {
  const query = encodeURIComponent(repoName);

  let result = {
    repos: [],
    error: null,
  };
  try {
    const response = await fetch(
      `${API_ROOT}/search/repositories?q=${query}&per_page=${perPage}&page=${page}`,
      {
        method: 'GET',
        mode: 'cors',
      },
    );

    result.repos = await response.json();
  } catch (e) {
    result.error = e.message;
  }

  return result;
}
