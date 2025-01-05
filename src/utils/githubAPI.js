const fetchGitHubData = async (repoUrl) => {
  try {
    // GitHub Personal Access Token
    const token = "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";

    // Extract the repo owner and name from the GitHub URL
    const [, owner, repo] = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);

    // Fetch the README file
    const readmeApiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const readmeResponse = await fetch(readmeApiUrl, {
      headers: {
        Accept: "application/vnd.github.v3.raw", // Fetch raw content
        Authorization: `token ${token}`, // Authenticate the request
      },
    });

    let readmeContent = null;
    if (readmeResponse.ok) {
      readmeContent = await readmeResponse.text();
    } else {
      console.warn("README file not found");
    }

    // Fetch the repository details to get the owner's avatar URL
    const repoApiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const repoResponse = await fetch(repoApiUrl, {
      headers: {
        Authorization: `token ${token}`, // Authenticate the request
      },
    });

    let avatarUrl = null;
    if (repoResponse.ok) {
      const repoData = await repoResponse.json();
      avatarUrl = repoData.owner?.avatar_url || null;
    } else {
      console.warn("Failed to fetch repository details");
    }

    return { readmeContent, avatarUrl };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return { readmeContent: null, avatarUrl: null };
  }
};

export default fetchGitHubData;
