module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.', // Directorio raíz del proyecto
  testRegex: 'test/users/.*\\.spec\\.ts$', // Busca en la carpeta test/users los archivos *.spec.ts
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
