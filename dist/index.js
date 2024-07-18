import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
const token = process.env.GITHUB_TOKEN;
const organization = process.env.GITHUB_ORGANIZATION;
const giteaUrl = process.env.GITEA_URL;
const giteaToken = process.env.GITEA_TOKEN;
const giteaOrganization = process.env.GITEA_ORGANIZATION;
if (!token) {
    throw new Error('Could not find GITHUB_TOKEN in .env file');
}
if (!organization) {
    throw new Error('Could not find GITHUB_ORGANIZATION in .env file');
}
if (!giteaUrl) {
    throw new Error('Could not find GITEA_URL in .env file');
}
if (!giteaToken) {
    throw new Error('Could not find GITEA_TOKEN in .env file');
}
if (!giteaOrganization) {
    throw new Error('Could not find GITEA_ORGANIZATION in .env file');
}
async function getRepositories(org) {
    const url = `https://api.github.com/orgs/${org}/repos`;
    const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
    };
    let repos = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
        try {
            const response = await axios.get(url, {
                headers,
                params: { per_page: 100, page },
            });
            const data = response.data;
            repos = repos.concat(data.map((repo) => repo.clone_url));
            page++;
            hasMore = data.length === 100;
        }
        catch (error) {
            console.error('Error fetching repositories:', error);
            throw error;
        }
    }
    return repos;
}
// Function to add mirrors to repositories
const addMirrors = async (repos) => {
    for (const repo of repos) {
        try {
            const regex = /\/([^\/]+)\.git$/;
            const match = repo.match(regex);
            const repositoryName = match?.[1];
            if (!repositoryName)
                continue;
            const response = await axios.post(`${giteaUrl}/api/v1/repos/migrate/`, {
                url: `${giteaUrl}/${giteaOrganization}`,
                clone_addr: repo,
                repo_name: repositoryName,
                repo_owner: giteaOrganization,
                mirror: true,
                mirror_interval: '1h' // Mirror synchronization interval, adjustable
            }, {
                headers: {
                    Authorization: `token ${giteaToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Mirror added for repo: ${repo}`);
        }
        catch (error) {
            if (error.response.data.message === 'The repository with the same name already exists.') {
                console.log(`Mirror already exists for repo: ${repo}`);
            }
            else {
                console.error(`Failed to add mirror for repo: ${repo}`, error);
            }
        }
    }
};
export const main = async () => {
    try {
        if (organization) {
            const repositories = await getRepositories(organization);
            console.log('List of clone_url repositories:', JSON.stringify(repositories));
            console.log('Adding mirrors to gitea');
            addMirrors(repositories);
        }
        else {
            console.error('ORGANIZATION variable is not defined.');
        }
    }
    catch (error) {
        console.error('Failed to fetch repository list:', error);
    }
};
main();
