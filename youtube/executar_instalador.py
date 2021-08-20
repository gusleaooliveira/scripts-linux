import os
from os.path import basename
from zipfile import ZipFile

def compilar(tipo):
    if tipo == 'a':
        os.system('pyinstaller main.py --onefile -n PyGusYoutube')
    elif tipo == 'p':
        os.system('pyinstaller main.py --onedir -n PyGusYoutubeFolder')

def copiar():
    os.system('cat .password | sudo -S cp dist/PyGusYoutube /bin/PyGusYoutube')
    
def compactar():
    os.system('tar -cpzf dist/PyGusYoutube.tar.gz dist/PyGusYoutubeFolder/')
    
if __name__ == '__main__':
    compilar('a')
    compilar('p')
    copiar()
    compactar()
    