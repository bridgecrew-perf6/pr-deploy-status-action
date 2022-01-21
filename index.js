const core = require('@actions/core');
const github = require('@actions/github');

const main = async() => {
    try {
        const repository = core.getInput('repository', {required: true});
        const sha = core.getInput('sha', {required: true});
        const token = process.env.GITHUB_TOKEN;
        const octokit = new github.getOctokit(token);

        const { data: deployments } = await octokit.rest.repos.listDeployments({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            sha,
        });

        console.log(deployments);
        const deploymentID = deployments[0].id
        console.log(deploymentID);
        console.log(deployments[0].created_at);
        console.log(deployments[0].updated_at);

        const { data: deploymentStatuses } = await octokit.rest.repos.listDeploymentStatuses({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            deployment_id: deploymentID,
        });

        console.log(deploymentStatuses);
      } catch (error) {
        core.setFailed(error.message);
      }
}

main();
