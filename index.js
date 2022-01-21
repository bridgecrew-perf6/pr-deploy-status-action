const core = require('@actions/core');
const github = require('@actions/github');

const main = async() => {
    try {
        const repository = core.getInput('repository', {required: true});
        const sha = core.getInput('sha', {required: true});
        const ref = core.getInput('ref', {required: true});
        const token = process.env.GITHUB_TOKEN;
        const octokit = new github.getOctokit(token);

        const { data: deployments } = await octokit.rest.repos.listDeployments({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            ref
        });

        console.log(deployments);
      } catch (error) {
        core.setFailed(error.message);
      }
}

main();
