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
        // includes the deployment ID - the array will have only one record during 
        // PR action run. There is a possibility for the fetch to have multiple
        // records when the same deployment goes through more events when the
        // associated environment becomes inactive or deactivated by the PaaS
        // provider
        console.log(`deployment id : ${deploymentStatuses[0].id} - deploy state : ${deploymentStatuses[0].state}`)
        core.setOutput('state', deploymentStatuses[0].state);
      } catch (error) {
        core.setFailed(error.message);
      }
}

main();
