module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv',{
      envName: 'APP_ENV',
      moduleName: '@env',
      path: '.env'
    }]
  ]



  // si uso reanimaided nos tenemos que asegurar de que sea el ultimo
};
