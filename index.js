const core = require('@actions/core');
const github = require('@actions/github');

const main = async() => {
    try {
        const repository = core.getInput('repository', {required: true});
        const environment = core.getInput('environment', {required: true});
        const token = process.env.GITHUB_TOKEN;
        const octokit = new github.getOctokit(token);

        const { data: deployments } = await octokit.rest.repos.listDeployments({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            environment,
        });

        // picking the top record in the deployments list - the first entry
        // in the list will have most recent deployment data
        const deploymentID = deployments[0].id

        const { data: deploymentStatuses } = await octokit.rest.repos.listDeploymentStatuses({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            deployment_id: deploymentID,
        });

        // even though the above fetch gives an array of data, since the input
        // includes the deployment ID - the array will have only one record in it.
        core.setOutput('status', deploymentStatuses[0].state);
      } catch (error) {
        core.setFailed(error.message);
      }
}

main();
