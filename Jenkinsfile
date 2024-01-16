pipeline {
    agent any
    
    stages {
  
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'npm test'
            }
        }

        stage('Build and Deploy') {
            steps {
                echo 'npm run build'
                
            }
        }
    }
}
