import * as core from '@actions/core'
import * as github from '@actions/github'

import {wait} from './wait'

async function run(): Promise<void> {
  try {
    // get input values
    const myToken = core.getInput('myToken');
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
    console.log("prBody: " + prBody);
    console.log("title: " + title);


  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
