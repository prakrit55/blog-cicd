# CI/CD Blog Applicaton


![alt text](<assets/ecr_ecs.png>)


Welcome to the complete ci/cd project, here we will delve into the CI/CD automated processes where every potential pull request will run a ci workflow, to check the code security, vulnerability scan, image scan etc.

# Introduction

It is a three tier application consists of the frontend, backend, and database.  It contains a frontend application based on react, typescript, css, html etc. and a backend application to handle the requsts from the user. The main motive of the project is to integrate CI/CD for the appplication, in order to tackle the challenges whenever there is changes in the code through pull requsts, push.

# Procedure

Let us dive into the steps to configure the whole CI/CD pipeline, keeping in mind the frontend code is present in the `my-blog-app` and the backend is in `backend-blog`.




Step 1: Let us create a directory named .github at the root, all the necessary  workflows are kept in the workflows directory in the .github.

Step 2: Now create a file named ci.yaml in the workflows directory in .github.

The pipeline is a continuous integration and continuous deployment (CI/CD) setup that encompasses different stages and jobs to manage different aspects of your application, including frontend and backend testing, security checks, and building and deploying Docker images for the backend. Let's go through each stage and job in detail:

1. **Events That Trigger the Pipeline:**
    - The pipeline is triggered when changes are pushed to the `main` branch or when a pull request is opened targeting the `main` branch.

2. **Frontend Testing (`frontend-test`):**
    - **Runs-on:** The job runs on the latest version of Ubuntu.
    - **Node Version:** Uses Node.js version 20.x on x64 architecture according to the matrix strategy.
    - **Steps:**
        - **Checkout Repository:** check out the Git repository.
        - **Setup Node.js:** Uses the `actions/setup-node` action to set up Node.js with the specified version and architecture.
        - **Install Dependencies:** Installs the project's dependencies using `npm install`, runs linting (`npm run lint`), and installs Prettier.
        - **Build:** Builds the frontend application using the build script (`npm run build`).

3. **Backend Testing (`backend-test`):**
    - Similar to the `frontend-test` job, but focuses on the backend application located in the `backend-blog` directory.
    - Steps include checking out the repository, setting up Node.js, installing project dependencies, and building the backend application.

4. **Frontend Security (`frontend-security`):**
    - **Needs:** Depends on the `frontend-test` job, meaning it waits for `frontend-test` to complete.
    - **Runs-on:** Runs on the latest version of Ubuntu.
    - **Steps:**
        - **Checkout Repository:** Checks out the repository using `actions/checkout`.
        - **Run Snyk:** Uses Snyk to scan the frontend application for vulnerabilities.
        - **Install and Authenticate Snyk:** Installs the Snyk CLI, authenticates with a provided token, and runs Snyk code tests.

5. **Backend Security (`backend-security`):**
    - **Needs:** Depends on the `backend-test` job, waiting for it to complete.
    - **Runs-on:** Runs on the latest version of Ubuntu.
    - **Steps:**
        - Similar to the `frontend-security` job, but targets the `backend-blog` directory.
        - Checks for vulnerabilities in the backend application using Snyk.

6. **Backend Image (`backend-image`):**
    - **Needs:** Depends on the `backend-security` job, waiting for it to complete.

    - **Permissions:** Requires read permissions for contents and actions, and write permissions for security events.

    - **Steps:**
        - **Checkout Repository:** check out the repository.

        - **Configure AWS Credentials:** Configures AWS credentials using AWS Actions. Since we are going to create the image of the backend part of the application and push it to the ECR a managed container registry to store the image, we have a `Dockerfile` in the backend directory.

        - **Login to ECR:** Uses an action to log in to Elastic Container Registry (ECR) using AWS credentials.

        - **Build and Push Docker Image:** Builds a Docker image for the backend application, tags it, and pushes it to ECR.

        - **Run Trivy Vulnerability Scanner:** Uses Trivy to scan the Docker image for vulnerabilities.

        - **Install and Authenticate Snyk:** Installs the Snyk CLI and authenticates with a provided token.

        - **Snyk Container Monitoring:** Monitors the container using Snyk and checks for vulnerabilities in the Docker image.


# Conclusion

The pipeline automates testing, security checks, and deployment tasks for both the frontend and backend parts of the application. The frontend and backend security jobs use Snyk to identify potential vulnerabilities, while the backend image job builds and pushes Docker images to ECR and then checks the images for vulnerabilities using both Trivy and Snyk.