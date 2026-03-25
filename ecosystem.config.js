module.exports = {
  apps: [
    {
      name: 'ifc60anos', // Nome do processo no PM2
      script: 'npm',    // Executável a ser rodado
      args: 'start',    // Argumentos do comando (npm start)
      instances: 'max', // Usa o máximo de núcleos da CPU disponíveis (modo cluster)
      exec_mode: 'cluster', // Habilita o modo cluster para alta disponibilidade
      env: {
        NODE_ENV: 'production', // Define o ambiente como produção
      },
    },
  ],
}
