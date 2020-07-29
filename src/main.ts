import * as core from '@actions/core'
import * as github from '@actions/github'

import {wait} from './wait'

async function run(): Promise<void> {
  try {
    // get input values
    console.log("In action, getting github token");
    const myToken = core.getInput('githubToken');
    console.log("got token: " + myToken);
    console.log("myToken: " + myToken);

    // get reference to octokit
    const octokit = github.getOctokit(myToken);

    // get reference to current context and get info about pull request
    const context = github.context;
    const prUrl = context.payload.pull_request?.html_url;
    const prBody = context.payload.pull_request?.body;
    const prNumber: number = <number>context.payload.pull_request?.number;
    const { data: pullRequest } = await octokit.pulls.get( {
      owner: 'abelsquidhead',
      repo: 'TailwindsTraders-Website',
      pull_number: prNumber,
 
    });
    const title = pullRequest.title

    // print out the info from PR
    console.log("prUrl: " + prUrl);
    console.log("title: " + title);
    console.log("number: "+ prNumber);

    // save values as environment variables
    core.exportVariable("PR_URL", prUrl);
    core.exportVariable("PR_TITLE", title);
    core.exportVariable("PR_NUMBER", prNumber);

    // output values as output variables
    core.setOutput("url", prUrl);
    core.setOutput("title", title);
    core.setOutput("number", prNumber);
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
