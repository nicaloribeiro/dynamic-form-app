# Dynamic form app  
- Objetivo: App que gera um formulário a partir de um JSON  
- O App contém duas páginas: A página Home possui a lista de formulários e a página Form as questões do formulário específico  
- O App utiliza AsyncStorage para persistir os dados  
- Os formulários são controlados por um context, manipulando os dados

## Requisitos  
- O projeto foi desenvolvido seguindo a documentação oficial do [React Native](https://reactnative.dev/docs/environment-setup) utilizando o React Native CLI  
- O App foi testado apenas em dispositivos Android, utilizando dispositivos virtuais do Android Studio 
- É necessário ter o Yarn ou Npm instalado
- Após clonar o projeto, instale as dependências com os comandos :  
```
yarn install OU npm install  
```  
- Inicie um dispositivo android, seja pelo emulador ou via USB
- Após certificar que o dispositivo está conectado, rode um dos comandos:  
```
yarn android OU npm run android OU npx react-native run-android  
```
