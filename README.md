# SIE - Sistema de Identificação Escolar

O SIE é um aplicativo desenvolvido em React Native pelo Expo para identificação de alunos nas extensões de ensino Etec Centro Paula Sousa. Ele permite aos usuários realizar login, gerar um QR-ID para acesso, ler QR codes através da câmera do dispositivo e realizar operações CRUD (Create, Read, Update, Delete) sobre uma lista de alunos.

## Instalação

Para utilizar o aplicativo SIE, siga os passos abaixo:

### Pré-requisitos

- Node.js e npm instalados globalmente.
- Expo CLI instalado globalmente: `npm install -g expo-cli`

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/sDavio27/sie.git
```

### Passo 2: Instalar as dependências

```bash
cd sie
npm install
```

### Passo 3: Executar o aplicativo

```bash
expo start
```

Isso abrirá uma página no seu cmd com um QR code. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR code e abrir o aplicativo.

## Como usar o Expo

O Expo é uma plataforma de código aberto para criar aplicativos nativos do iOS e Android com JavaScript e React. Ele oferece muitas facilidades, incluindo um conjunto de ferramentas de desenvolvimento, uma biblioteca de componentes UI e uma infraestrutura de hospedagem para seus aplicativos.

Para criar um projeto React Native usando o Expo, siga estes passos:

### Passo 1: Criar um novo projeto

```bash
npx create-expo-app my-app
```

### Passo 2: no "my-app" substitua pelo nome do projeto que voce quer


Siga as instruções para escolher um template de projeto e configurar as dependências.

### Passo 3: Executar o projeto

```bash
cd nome-do-projeto
expo start
```

Isso abrirá o Metro Bundler no seu cmd com um QR code. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR code e visualizar o aplicativo.

## Funcionalidades do SIE

### 1. Main

O usuário pode inserir seu nome, RM/RP e data de nascimento para a geração do QR-ID.

### 2. Geração de QR-ID

Após o login, o usuário pode gerar um QR-ID para acesso às dependências da instituição de ensino.

### 3. Login

O usuário insere seu nome, registro e data de nascimento para a altenticação. O sistema identifica se o usuário é o vigilante ou o admin e navega para tela especifica.

### 4. Leitura de QR Code

O aplicativo possui uma tela de leitura de QR code que utiliza a câmera do dispositivo para ler e interpretar os códigos.

### 5. CRUD de Alunos

O SIE permite a criação, leitura, atualização e exclusão de alunos cadastrados. Os dados dos alunos são armazenados localmente no dispositivo usando o AsyncStorage.

## Bibliotecas Utilizadas

- React Native
  ```bash
    Já vem instalado por padrão
  ```
- React Navigation/native
  ```bash
    npm install @react-navigation/native
  ```
- React Navigation/stack
  ```bash
    npm install @react-navigation/stack
  ```
- Expo Camera
  ```bash
    expo install expo-camera
  ```
- AsyncStorage
  ```bash
    npm install @react-native-async-storage/async-storage
  ```
- Link as dependências (apenas para Android):
  Se você estiver desenvolvendo para Android, será necessário linkar as dependências após       
  instalar o AsyncStorage.
  ```bash
    npx pod-install
  ```
- React Native Vector Icons
  ```bash
    expo install @expo/vector-icons
  ```
- React Native Qrcode
  ```bash
    npm install react-native-qrcode-svg
  ```
- React Native Gesture Handler
  ```bash
    npm install react-native-gesture-handler
  ```

## Autor

Este projeto esta sendo desenvolvido por [Dávio](https://github.com/seu-usuario), [Danilo](https://github.com/daniloabrantes), [Matheus](https://github.com/MatheusPaula02) e [Rafael](https://github.com/RafaNgk)

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT) e esta sobre direitos autorais de nossa equipe, sendo reconhecido e registrado em cartório. Por Favor, não plagie, copie ou use esse código sem a nossa permissão
