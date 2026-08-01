const { Octokit } = require("@octokit/rest");

const TOKEN = process.env.GITHUB_TOKEN;

if (!TOKEN) {
  throw new Error("GitHub token not found in environment variables.");
}

const octokit = new Octokit({ auth: TOKEN });

const owner = "suu-b";  
//is private
const repo = "Preface";     

//not being used anywhere: part of the 2 commit pipeline
const pushToGitHub = async (path, message, content) => {
    const contentEncoded = Buffer.from(content).toString("base64");
    try{
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,   
            path,
            message,
            content: contentEncoded,    
        });
        console.log("File pushed to GitHub successfully.");
        return true;
    }
    catch(error){  
        console.error("Error pushing file to GitHub:", error);
        throw error;
    }
}

//being used to read the initial content as to not overwrite but append
const readFileFromGitHub = async (path) => {
    try{
        const { data } = await octokit.repos.getContent({
            owner, repo, path
        });
        
        if (data.content) {
            const decodedContent = Buffer.from(data.content, 'base64').toString('utf-8');
            return decodedContent;
        }
        return data;
    }
    catch(error){
        if (error.status === 404) {
            console.log(`File ${path} not found, returning empty string`);
            return "";
        }
        console.error("Some error occurred:", error);
        return "";
    }
}

const readDirFromGitHub = async (path) => {
    try {
        const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path
        });
        return data;
    } catch (error) {
        console.error("Error reading directory from GitHub:", error);
        return [];
    }
} 

//not being used anywhere: part of the 2 commit pipeline
const updateOnGitHub = async (path, message, content) => {
    const contentEncoded = Buffer.from(content).toString("base64");
    try {
        let sha = null;
        
        try {
            const { data: currentFile } = await octokit.repos.getContent({
                owner,
                repo,
                path
            });
            sha = currentFile.sha;
        } catch (error) {
            if (error.status === 404) {
                console.log(`File ${path} doesn't exist, will create new one with headers`);
                sha = null;
            } else {
                throw error;
            }
        }
        
        let finalContent = content;
        if (!sha) {
            const headers = "date,title,description,thumbnail,credits\n";
            finalContent = headers + content;
            const finalContentEncoded = Buffer.from(finalContent).toString("base64");
            
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message,
                content: finalContentEncoded
            });
        } else {
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message,
                content: contentEncoded,
                sha: sha
            });
        }
        
        console.log("File updated on GitHub successfully.");
        return true;
    }
    catch (error){
        console.error("Error updating on github", error);
        throw error;
    }
}

const deployToGitHub = async (contentPath, content, message) => {
    try {
        const { data: repoData } = await octokit.repos.get({ owner, repo });
        const defaultBranch = repoData.default_branch;
        
        const { data: latestCommit } = await octokit.repos.getCommit({
            owner,
            repo,
            ref: defaultBranch
        });
        
        const baseCommitSha = latestCommit.sha;
        
        const treeItems = [];
        if (Array.isArray(contentPath)) {
            contentPath.forEach(file => {
                if (file.delete) {
                    treeItems.push({
                        path: file.path,
                        mode: '100644',
                        type: 'blob',
                        sha: null
                    });
                } else {
                    treeItems.push({
                        path: file.path,
                        mode: '100644',
                        type: 'blob',
                        content: file.content 
                    });
                }
            });
        } else {
            treeItems.push({
                path: contentPath,
                mode: '100644',
                type: 'blob',
                content: content 
            });
        }
        
        const { data: newTree } = await octokit.git.createTree({
            owner,
            repo,
            base_tree: latestCommit.commit.tree.sha,
            tree: treeItems
        });        
        const { data: commit } = await octokit.git.createCommit({
            owner,
            repo,
            message: message,
            tree: newTree.sha,
            parents: [baseCommitSha]
        });
        await octokit.git.updateRef({
            owner,
            repo,
            ref: `heads/${defaultBranch}`,
            sha: commit.sha
        });
        
        console.log("File deployed to GitHub successfully in single commit.");
        return true;
    } catch (error) {
        console.error("Error deploying file to GitHub:", error);
        throw error;
    }
}

module.exports = { pushToGitHub, updateOnGitHub, readFileFromGitHub, deployToGitHub, readDirFromGitHub };
