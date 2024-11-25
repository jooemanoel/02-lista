## Atualizar os pacotes
sudo apt update
sudo apt upgrade

## Verificar a versão do Python
python3 --version

## Instalar o Python 3
sudo apt install python3

## Instalar o gerenciador de pacotes pip (para gerenciar pacotes Python):
sudo apt install python3-pip

## Instalar ferramentas adicionais (opcional)
sudo apt install python3-venv python3-dev

## Configurar Python como padrão (opcional)
### Para usar python ao invés de python3:
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
sudo update-alternatives --config python

## Verificar a instalação
python --version
pip3 --version