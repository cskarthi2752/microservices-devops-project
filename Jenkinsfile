pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checkout completed'
            }
        }

        stage('Validate Environment') {
            steps {
                bat 'git --version'
                bat 'docker --version'
                bat 'docker compose version'
                bat 'docker compose config --quiet'
            }
        }

        stage('Build Microservices') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy Microservices') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Verify Services') {
            steps {
                powershell '''
                    $ErrorActionPreference = "Stop"

                    $urls = @(
                        "http://localhost:3001/health",
                        "http://localhost:3004/",
                        "http://localhost:3003/"
                    )

                    foreach ($url in $urls) {
                        $success = $false

                        for ($i = 1; $i -le 15; $i++) {
                            try {
                                $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5

                                if ($response.StatusCode -eq 200) {
                                    Write-Host "SUCCESS: $url"
                                    $success = $true
                                    break
                                }
                            }
                            catch {
                                Start-Sleep -Seconds 3
                            }
                        }

                        if (-not $success) {
                            throw "Service verification failed: $url"
                        }
                    }
                '''
            }
        }
    }

    post {
        success {
            echo 'Microservices CI/CD Pipeline SUCCESS'
        }

        failure {
            echo 'Pipeline FAILED. Check console output.'
        }
    }
}